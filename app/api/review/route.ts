import prisma from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import { ReviewStatus } from "@prisma/client";

export const runtime = "nodejs";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

const REWARD: Record<"TRIVIAL" | "MINOR" | "MAJOR" | "CRITICAL", number> = {
  TRIVIAL: 5,
  MINOR: 15,
  MAJOR: 40,
  CRITICAL: 80,
};

const BugVerdictSchema = z.object({
  isBug: z.boolean(),
  severity: z.enum(["TRIVIAL", "MINOR", "MAJOR", "CRITICAL"]),
  confidence: z.number().min(0).max(100),
  reason: z.string().max(300).optional(),
});

async function geminiValidateBug(input: {
  description: string;
  screenshotUrl?: string | null;
  websiteUrl?: string | null;
}) {
  const prompt = `
You are a strict QA triage system.
Decide whether the report is a real software bug (not a feature request).
If it is a bug, assign severity:
- TRIVIAL: cosmetic/text
- MINOR: small UI/UX issue, workaround exists
- MAJOR: breaks core flow, frequent
- CRITICAL: security/payment/data loss/login broken

Return JSON ONLY.
The "reason" field must be at most 2 short sentences (max 200 characters).

Website: ${input.websiteUrl ?? "unknown"}
Description: ${input.description}
Screenshot: ${input.screenshotUrl ?? "none"}
`;

  const res = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseJsonSchema: {
        type: "object",
        properties: {
          isBug: { type: "boolean" },
          severity: {
            type: "string",
            enum: ["TRIVIAL", "MINOR", "MAJOR", "CRITICAL"],
          },
          confidence: { type: "number", minimum: 0, maximum: 100 },
          reason: { type: "string" },
        },
        required: ["isBug", "severity", "confidence"],
      },
    },
  });

  const rawText = res.text ?? "{}";
  const parsed = JSON.parse(rawText);
  return BugVerdictSchema.parse(parsed);
}

export async function POST(req: NextRequest) {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const clerk = await currentUser();
    if (!clerk)
      return NextResponse.json({ message: "User not found" }, { status: 404 });

    const { websiteId, description, screenshotUrl } = (await req.json()) as {
      websiteId: string;
      description: string;
      screenshotUrl?: string | null;
    };

    if (!websiteId || !description?.trim()) {
      return NextResponse.json(
        { message: "Missing websiteId/description" },
        { status: 400 },
      );
    }

    const reviewer = await prisma.user.upsert({
      where: { clerkId },
      update: { name: clerk.fullName ?? undefined },
      create: {
        clerkId,
        email: clerk.emailAddresses?.[0]?.emailAddress,
        name: clerk.fullName ?? null,
      },
      select: { id: true, clerkId: true, points: true, email: true },
    });

    const website = await prisma.website.findUnique({
      where: { id: websiteId },
      select: {
        id: true,
        link: true,
        userId: true,
        user: {
          select: { id: true, clerkId: true, points: true, email: true },
        },
      },
    });

    if (!website)
      return NextResponse.json(
        { message: "Website not found" },
        { status: 404 },
      );

    const verdict = await geminiValidateBug({
      description,
      screenshotUrl: screenshotUrl ?? null,
      websiteUrl: website.link ?? null,
    });

    const status = verdict.isBug ? "APPROVED" : "REJECTED";
    const reward = verdict.isBug ? REWARD[verdict.severity] : 0;

    if (reward > 0 && (website.user?.points ?? 0) < reward) {
      return NextResponse.json(
        { message: "Website owner does not have enough points to reward" },
        { status: 400 },
      );
    }

    const result = await prisma.$transaction(async (tx) => {
      const review = await tx.review.create({
        data: {
          description,
          screenshotUrl: screenshotUrl ?? null,
          geminiConfidence: Math.round(verdict.confidence),
          status: status as ReviewStatus,
          websiteId: website.id,
          reviewerId: reviewer.id,
        },
      });

      let reviewerPoints = reviewer.points;

      if (reward > 0) {
        await tx.user.update({
          where: { id: website.userId },
          data: { points: { decrement: reward } },
        });

        const updatedReviewer = await tx.user.update({
          where: { id: reviewer.id },
          data: { points: { increment: reward } },
          select: { points: true },
        });

        reviewerPoints = updatedReviewer.points;

        await tx.pointTransfer.create({
          data: {
            fromUserId: website.user!.clerkId,
            fromUserEmail: website.user.email,
            toUserId: reviewer.clerkId,
            toUserEmail: reviewer.email,
            amount: reward,
            description: `Bug reward (${verdict.severity})`,
          },
        });
      }

      return { review, reward, reviewerPoints, verdict };
    });

    return NextResponse.json(
      {
        message: "success",
        review: result.review,
        reward: result.reward,
        reviewerPoints: result.reviewerPoints,
        ai: result.verdict,
      },
      { status: 201 },
    );
  } catch (err) {
    console.error("REVIEW POST ERROR:", err);
    return NextResponse.json({ message: "FAILED" }, { status: 500 });
  }
}

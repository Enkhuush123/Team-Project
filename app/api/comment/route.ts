import prisma from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const blogId = new URL(req.url).searchParams.get("blogId");
  if (!blogId) {
    return NextResponse.json({ message: "Missing blogId" }, { status: 400 });
  }
  const comments = await prisma.comment.findMany({
    where: { blogId },
    orderBy: { createdAt: "desc" },
    include: { user: { select: { name: true, email: true, imageUrl: true } } },
  });
  return NextResponse.json({ comments }, { status: 200 });
}
export async function POST(req: NextRequest) {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const clerk = await currentUser();
    if (!clerk) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const { blogId, content } = (await req.json()) as {
      blogId: string;
      content: string;
    };
    if (!blogId || !content?.trim()) {
      return NextResponse.json(
        { message: "Missing blogId/content" },
        { status: 400 }
      );
    }
    const dbUser = await prisma.user.upsert({
      where: { clerkId },
      update: {
        name: clerk.fullName ?? undefined,
        imageUrl: clerk.imageUrl ?? undefined,
      },
      create: {
        clerkId,
        email: clerk.emailAddresses?.[0]?.emailAddress,
        name: clerk.fullName ?? null,
        imageUrl: clerk.imageUrl ?? null,
      },
      select: { id: true },
    });
    const created = await prisma.comment.create({
      data: {
        content: content.trim(),
        blogId,
        userId: dbUser.id,
      },
      include: {
        user: { select: { name: true, email: true, imageUrl: true } },
      },
    });
    return NextResponse.json(
      { message: "success", comment: created },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json({ message: "FAILED" }, { status: 500 });
  }
}

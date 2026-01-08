import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title, description, link, screenshot } = body;

    if (!title || !description) {
      return NextResponse.json(
        { message: "Missing title/description" },
        { status: 400 }
      );
    }

    const dbUser = await prisma.user.upsert({
      where: { clerkId: userId },
      update: {},
      create: {
        clerkId: userId,
        email: "unknown@temp.com",
      },
    });

    const website = await prisma.website.create({
      data: {
        title,
        description,
        link: link || "",
        userId: dbUser.id,
      },
    });

    return NextResponse.json({ message: "success", website }, { status: 201 });
  } catch (err) {
    console.error("WEBSITE POST ERROR:", err);
    return NextResponse.json({ message: "FAILED" }, { status: 500 });
  }
}

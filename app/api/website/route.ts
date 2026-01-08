import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ message: "not signed in" }, { status: 401 });
    }
    const user = await currentUser();
    if (!user) {
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

    await prisma.user.upsert({
      where: { id: userId },
      update: {},
      create: {
        id: userId,
        email: user.emailAddresses[0].emailAddress,
        name: user.firstName,
        clerkId: user.id,
      },
    });

    const website = await prisma.website.create({
      data: {
        title,
        description,
        link: link || "",
        userId: user.id,
        screenshot,
      },
    });

    return NextResponse.json({ message: "success", website }, { status: 201 });
  } catch (err) {
    console.error("WEBSITE POST ERROR:", err);
    return NextResponse.json({ message: "FAILED" }, { status: 500 });
  }
}

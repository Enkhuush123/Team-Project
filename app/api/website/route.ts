import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const user = await currentUser();
    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    const body = await req.json();
    const { title, description, link, image } = body;

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
        email: user.emailAddresses[0].emailAddress,
      },
    });

    const website = await prisma.website.create({
      data: {
        title,
        description,
        link: link || "",
        userId: dbUser.id,
        imageUrl: image || null,
      },
    });

    return NextResponse.json({ message: "success", website }, { status: 201 });
  } catch (err) {
    console.error("WEBSITE POST ERROR:", err);
    return NextResponse.json({ message: "FAILED" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const websites = await prisma.website.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: { name: true, email: true },
        },
      },
    });

    const data = websites.map((w) => ({
      id: w.id,
      title: w.title,
      description: w.description,
      url: w.link || null,
      imageUrl: w.imageUrl || null,
      status: "OPEN",
      user: w.user ? { name: w.user.name, email: w.user.email } : null,
      createdAt: w.createdAt,
    }));

    return NextResponse.json({ websites: data }, { status: 200 });
  } catch (err) {
    console.error("WEBSITE GET ERROR:", err);
    return NextResponse.json({ message: "FAILED" }, { status: 500 });
  }
}

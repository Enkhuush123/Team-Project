import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    const { userId } = await auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const savedPosts = await prisma.savedBlog.findMany({
      where: {
        userId,
      },
      include: {
        blog: {
          include: {
            user: { select: { name: true, email: true, imageUrl: true } },
          },
        },
      },
    });

    return NextResponse.json(savedPosts);
  } catch (err) {
    return NextResponse.json(err, { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = await auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const { blogId } = await req.json();
    const savedPost = await prisma.savedBlog.upsert({
      where: {
        userId_blogId: {
          userId,
          blogId,
        },
      },
      create: {
        userId,
        blogId,
      },
      update: {
        userId,
        blogId,
      },
      include: {
        blog: true,
      },
    });

    return NextResponse.json(savedPost);
  } catch (err) {
    return NextResponse.json(err, { status: 500 });
  }
};

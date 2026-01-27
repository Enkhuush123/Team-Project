/* eslint-disable @typescript-eslint/no-unused-expressions */
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
<<<<<<< HEAD
    const blogs = await prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        description: true,
        link: true,
        imageUrl: true,
        createdAt: true,
      },
    });
    return new NextResponse(JSON.stringify(blogs), { status: 200 });
=======
    const { userId: clerkId } = await auth();
    const userMe = clerkId
      ? await prisma.user.findUnique({
          where: { clerkId },
          select: { id: true },
        })
      : null;

    const blogs = await prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { name: true, email: true, imageUrl: true } },
        votes: true,
      },
    });
    const shaped = blogs.map((blog) => {
      const score = (blog.votes ?? []).reduce(
        (sum, v) => sum + (v.value ?? 0),
        0,
      );
      const myVote = userMe
        ? ((blog.votes ?? []).find((v) => v.userId === userMe.id)?.value ?? 0)
        : 0;
      const { votes, ...rest } = blog as any;
      return { ...rest, score, myVote };
    });

    return new NextResponse(JSON.stringify(shaped), { status: 200 });
>>>>>>> 843b338db6b60466cf0eeccd458992e0efc045e8
  } catch (err) {
    console.log(err);
    return new NextResponse("Server error", { status: 500 });
  }
};

export const POST = async (request: NextRequest) => {
  const { userId } = await auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  try {
    const { title, description, link, image } = await request.json();

    const blogs = await prisma.blog.create({
      data: {
        title,
        description,
        link,
        imageUrl: image,
        userId,
      },
    });

    return new NextResponse(JSON.stringify(blogs), { status: 201 });
  } catch (err) {
    console.log(err);
    return new NextResponse("Server error", { status: 500 });
  }
};

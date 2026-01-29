/* eslint-disable @typescript-eslint/no-unused-expressions */
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import type { Blog, BlogVote } from "@prisma/client";

type BlogRow = Blog & {
  user: { name: string | null; email: string | null; imageUrl: string | null };
  votes: BlogVote[];
};

export const GET = async (request: NextRequest) => {
  try {
    const { userId: clerkId } = await auth();
    const userMe = clerkId
      ? await prisma.user.findUnique({
          where: { clerkId },
          select: { id: true },
        })
      : null;

    const blogs = (await prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { name: true, email: true, imageUrl: true } },
        votes: true,
      },
    })) as BlogRow[];

    const shaped = blogs.map((blog) => {
      const score = (blog.votes ?? []).reduce(
        (sum, v) => sum + (v.value ?? 0),
        0,
      );

      const myVote = userMe
        ? ((blog.votes ?? []).find((v) => v.userId === userMe.id)?.value ?? 0)
        : 0;

      const { votes, ...rest } = blog;
      return { ...rest, score, myVote };
    });

    return new NextResponse(JSON.stringify(shaped), { status: 200 });
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

    const blog = await prisma.blog.create({
      data: {
        title,
        description,
        link,
        imageUrl: image,
        userId,
      },
    });

    return new NextResponse(JSON.stringify(blog), { status: 201 });
  } catch (err) {
    console.log(err);
    return new NextResponse("Server error", { status: 500 });
  }
};

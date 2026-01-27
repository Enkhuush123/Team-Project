import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
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

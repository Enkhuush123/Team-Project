import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { blogId, value } = (await req.json()) as {
      blogId: string;
      value: 1 | -1 | 0;
    };
    if (!blogId)
      return NextResponse.json({ error: "BlogId Missing" }, { status: 400 });
    const user = await prisma.user.findUnique({
      where: { clerkId },
      select: { id: true },
    });
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    if (value === 0) {
      await prisma.blogVote.deleteMany({ where: { blogId, userId: user.id } });
    } else {
      await prisma.blogVote.upsert({
        where: { blogId_userId: { blogId, userId: user.id } },
        update: { value },
        create: { blogId, userId: user.id, value },
      });
    }
    const agg = await prisma.blogVote.aggregate({
      where: { blogId },
      _sum: { value: true },
    });
    const mine = await prisma.blogVote.findUnique({
      where: { blogId_userId: { blogId, userId: user.id } },
      select: { value: true },
    });

    return NextResponse.json({
      blogId,
      score: agg._sum.value ?? 0,
      myVote: (mine?.value ?? 0) as 1 | -1 | 0,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

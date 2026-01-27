import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { SavedBlog } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
    try {
        const { userId: clerkId } = await auth();
        const userMe = clerkId
            ? await prisma.user.findUnique({
                where: { clerkId },
                select: { id: true },
            })
            : null;
        if (!userMe) return new NextResponse("Unauthorized", { status: 401 });

        const savedPosts = await prisma.savedBlog.findMany({
            where: {
                userId: userMe.id,
            },
            include: {
                blog: {
                    include: {
                        user: { select: { name: true, email: true, imageUrl: true } },
                        votes: true
                    },
                },
            },
        });
        const shaped = savedPosts.map((saved) => {
            const score = (saved.blog.votes ?? []).reduce(
                (sum, v) => sum + (v.value ?? 0),
                0,
            );
            const myVote = userMe
                ? ((saved.blog.votes ?? []).find((v) => v.userId === userMe.id)?.value ?? 0)
                : 0;
            const { votes, ...rest } = saved.blog as any;
            return { ...rest, score, myVote };
        });


        return new NextResponse(JSON.stringify(shaped), { status: 200 });

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

export const DELETE = async (req: NextRequest) => {

    const { userId } = await auth()
    if (!userId) return new NextResponse("Unauthorized", { status: 401 })

    const { blogId } = await req.json()

    if (!blogId) return new NextResponse("Blog not found", { status: 400 })

    try {
        const deletedPost = await prisma.savedBlog.delete({
            where: {
                userId_blogId: {
                    userId,
                    blogId
                }
            }
        })

        return NextResponse.json(deletedPost, { status: 200 })
    } catch (err) {
        return NextResponse.json(err, { status: 500 })
    }
}
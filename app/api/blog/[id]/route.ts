import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {

    const resolvedParams = await params
    const blogId = resolvedParams.id

    const { userId: clerkId } = await auth();
    const userMe = clerkId
        ? await prisma.user.findUnique({
            where: { clerkId },
            select: { id: true },
        })
        : null;

    if (!blogId) {
        return new Response(JSON.stringify({ error: "Missing blog ID" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    const blog = await prisma.blog.findUnique({
        where: { id: blogId },
        include: {
            user: { select: { name: true, email: true, imageUrl: true } },
            votes: true,
        },
    });

    if (!blog) {
        return new Response(JSON.stringify({ error: "Blog not found" }), {
            status: 404,
            headers: { "Content-Type": "application/json" },
        });
    }

    const shaped = () => {
        const score = (blog.votes ?? []).reduce(
            (sum, v) => sum + (v.value ?? 0),
            0,
        );

        const myVote = userMe
            ? ((blog.votes ?? []).find((v) => v.userId === userMe.id)?.value ?? 0)
            : 0;

        const { votes, ...rest } = blog;
        return { ...rest, score, myVote };
    }

    return new NextResponse(JSON.stringify(shaped()), { status: 200 });
}

import prisma from "@/lib/prisma";
import { error } from "console";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {

        if (!params?.id) {
            return new Response(JSON.stringify({ error: "Missing blog ID" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }
        const blog = await prisma.blog.findUnique({
            where: {
                id: params.id,
            },
        });

        if (!blog) {
            return NextResponse.json({ error: "Not found" }, { status: 404 });
        }

        return NextResponse.json(blog);
    } catch (err) {
        console.error("PRISMA ERROR:", err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

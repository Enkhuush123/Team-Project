import prisma from "@/lib/prisma";

export async function GET(
    req: Request,
    { params }: { params: { id: string } }  // NOT a promise
) {
    if (!params?.id) {
        return new Response(JSON.stringify({ error: "Missing blog ID" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    const blog = await prisma.blog.findUnique({
        where: { id: params.id },
    });

    if (!blog) {
        return new Response(JSON.stringify({ error: "Blog not found" }), {
            status: 404,
            headers: { "Content-Type": "application/json" },
        });
    }

    return new Response(JSON.stringify(blog), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}

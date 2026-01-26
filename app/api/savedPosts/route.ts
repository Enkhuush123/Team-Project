import prisma from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export const GET = async () => {

    try {
        const { userId } = await auth()
        if (!userId) return new NextResponse("Unauthorized", { status: 401 })

        const savedPosts = await prisma.savedBlog.findMany({
            where: {
                userId
            },
            include: { blog: true }
        })

        return NextResponse.json(savedPosts)

    } catch (err) {
        return NextResponse.json(err, { status: 500 })
    }

}
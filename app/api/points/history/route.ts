import prisma from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export const GET = async () => {
    try {
        const user = await currentUser()
        if (!user) return new NextResponse("Unauthorized", { status: 401 })

        const history = await prisma.pointTransfer.findMany({
            where: {
                OR: [
                    { fromUserId: user.id },
                    { toUserId: user.id }
                ]
            },
            orderBy: {
                createdAt: "desc"
            }
        })

        return new NextResponse(JSON.stringify(history), { status: 200 })
    } catch (err) {
        console.log(err)
        return new NextResponse("failed", { status: 500 })
    }

}
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {

        const user = await currentUser()
        if (!user) return new NextResponse("Unauthorized", { status: 401 })

        const { email, amount, description } = await req.json()

        if (!email || !amount || amount <= 0) return new NextResponse("Invlalid transaction", { status: 400 })


        const toUser = await prisma.user.findUnique({
            where: {
                email: email,
            }

        })

        if (!toUser) return new NextResponse("cannot find reciever", { status: 400 })

        const toUserId = toUser.id

        const fromUser = await prisma.user.findUnique({
            where: {
                clerkId: user.id
            }
        })

        if (!fromUser) return new NextResponse("Sender not found", { status: 404 })

        if (fromUser.points < amount) return new NextResponse("Insufficient funds", { status: 400 })

        await prisma.$transaction(async (tx) => {
            await tx.user.update({
                where: { id: fromUser.id },
                data: {
                    points: { decrement: amount }
                }
            })
            await tx.user.update({
                where: {
                    id: toUserId
                },
                data: {
                    points: { increment: amount }
                }
            })

            await tx.pointTransfer.create({
                data: {
                    fromUserId: fromUser.id,
                    toUserId,
                    amount,
                    description
                }
            })
        })

        return NextResponse.json({ message: "Transfer successful" }, { status: 200 })


    } catch (err) {
        console.log(err)
        return new NextResponse("Failed", { status: 500 })
    }
}
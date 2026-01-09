import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {

    try {

        const user = await currentUser()
        if (!user) return new NextResponse("Unauthorized", { status: 401 })

        const {toUserId, amount} = await req.json()

        if(!toUserId || !amount || amount <= 0) return new NextResponse("Invalid Transaction", {status: 400})


        const fromUser = await prisma.user.findUnique({
            where: {clerkId: user.id}
        })

        if(!fromUser) return new NextResponse("Sender Not Found", {status: 400})

        if (fromUser.points < amount) return new NextResponse("Insufficient points", {status: 400 })

        

        await prisma.$transaction(async (tx) => {
            // 1. Take points from sender
            await tx.user.update({
                where: { id: fromUser.id },
                data: {
                    points: { decrement: amount },
                },
            });

            // 2. Give points to receiver
            await tx.user.update({
                where: { id: toUserId },
                data: {
                    points: { increment: amount },
                },
            });

            // 3. Record transaction
            await tx.pointTransaction.create({
                data: {
                    fromUserId: fromUser.id,
                    toUserId,
                    amount: 50,
                    type: "TRANSFER",
                    description: "User-to-user transfer",
                },
            });
        });

        return NextResponse.json({message: "Transfer successful"})

    } catch (err) {
        console.log(err)
        return new NextResponse("Failed", { status: 500 })
    }


}
/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 404 });
    }
    const user = await currentUser();
    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }
    const { packKey } = await req.json();
    if (!packKey) {
      return NextResponse.json({ message: "missing packKey" }, { status: 400 });
    }
    const pack = await prisma.pack.findUnique({ where: { key: packKey } });
    if (!pack || !pack.active) {
      return NextResponse.json({ message: "invalid pack" }, { status: 400 });
    }
    const bonus = Math.floor((pack.points * pack.bonusPct) / 100);
    const total = pack.points + bonus;

    const updated = await prisma.$transaction(async (tx: any) => {
      const dbUser = await tx.user.upsert({
        where: { clerkId: userId },
        update: {},
        create: {
          clerkId: userId,
          email: user.emailAddresses[0].emailAddress,
          points: 0,
        },
      });
      return tx.user.update({
        where: { id: dbUser.id },
        data: {
          points: { increment: total },
        },
        select: { points: true },
      });
    });

    await prisma.pointTransfer.create({
      data: {
        fromUserEmail: "softwarecom1234@gmail.com",
        toUserId: userId,
        toUserEmail: user.emailAddresses[0].emailAddress,
        amount: total,
        description: "Purchase confirmed",
      },
    });

    return NextResponse.json({ message: "ok", points: updated.points });
  } catch (err) {
    return NextResponse.json({ message: "Error" }, { status: 400 });
  }
}

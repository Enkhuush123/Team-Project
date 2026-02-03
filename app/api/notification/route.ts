import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      return NextResponse.json({ notifications: [] }, { status: 200 });
    }

    const notifications = await prisma.notification.findMany({
      where: { userId: clerkId },
      orderBy: { createdAt: "desc" },
      take: 50,
      include: {
        review: {
          include: {
            website: { select: { id: true, title: true, link: true } },
            reviewer: { select: { name: true, email: true, imageUrl: true } },
          },
        },
      },
    });

    return NextResponse.json({ notifications }, { status: 200 });
  } catch (e) {
    console.error("NOTIFICATION GET ERROR:", e);
    return NextResponse.json({ notifications: [] }, { status: 200 });
  }
}

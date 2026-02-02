import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId: clerkId } = await auth();
  if (!clerkId) {
    return NextResponse.json({ notifications: [] }, { status: 401 });
  }

  const me = await prisma.user.findUnique({
    where: { clerkId },
    select: { id: true },
  });

  if (!me) {
    return NextResponse.json({ notifications: [] }, { status: 200 });
  }

  const notifications = await prisma.notification.findMany({
    where: { userId: clerkId },
    orderBy: { createdAt: "desc" },
    take: 50,
    select: {
      id: true,
      title: true,
      body: true,
      link: true,
      read: true,
      createdAt: true,
    },
  });

  return NextResponse.json({ notifications }, { status: 200 });
}

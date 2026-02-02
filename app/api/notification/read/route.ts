import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userId: clerkId } = await auth();
  if (!clerkId)
    return NextResponse.json(
      {
        ok: false,
      },
      { status: 401 },
    );
  const me = await prisma.user.findUnique({
    where: { clerkId },
    select: { id: true },
  });
  if (!me)
    return NextResponse.json(
      { ok: false },
      {
        status: 401,
      },
    );
  const { id } = await req.json();

  await prisma.notification.updateMany({
    where: { id, userId: me.id },
    data: {
      read: true,
    },
  });
  return NextResponse.json({ ok: true });
}

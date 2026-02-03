import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = (await req.json()) as { id?: string };
    const id = body?.id;

    if (!id) {
      return NextResponse.json({ message: "Missing id" }, { status: 400 });
    }

    await prisma.notification.updateMany({
      where: { id, userId: clerkId },
      data: { read: true },
    });

    return NextResponse.json({ message: "ok" }, { status: 200 });
  } catch (e) {
    console.error("NOTIFICATION READ ERROR:", e);
    return NextResponse.json({ message: "FAILED" }, { status: 500 });
  }
}

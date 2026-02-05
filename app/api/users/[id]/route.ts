import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const resolvedParams = await params;

    const userId = resolvedParams.id;
    const body = await req.json();
    const { role, banned } = body as { role?: string; banned?: boolean };

    const data: Record<string, unknown> = {};
    if (role !== undefined) data.role = role;
    if (banned !== undefined) data.banned = banned;

    const updated = await prisma.user.update({
      where: { id: userId },
      data,
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error("Update user error:", err);
    return NextResponse.json(
      { message: "Cannot update user" },
      { status: 500 },
    );
  }
}

import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const userId = params.id;
    const body = await req.json();
    const { role, banned } = body;

    const data: any = {};
    if (role !== undefined) data.role = role;
    if (banned !== undefined) data.banned = banned;

    await prisma.user.update({
      where: { id: userId },
      data,
    });

    return NextResponse.json(data);
  } catch (err) {
    console.error("Update user error:", err);
    return NextResponse.json(
      { message: "Cannot update user" },
      { status: 500 },
    );
  }
}

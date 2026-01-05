import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, name, clerkId } = await req.json();

  try {
    const existingUser = await prisma.user.findFirst({
      where: { clerkId },
    });
    if (existingUser) {
      return NextResponse.json(
        { message: "User Already Exists" },
        { status: 200 }
      );
    }
    const user = await prisma.user.create({
      data: {
        email,
        name,
        clerkId,
      },
    });

    return NextResponse.json({ message: "success", user }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "cant", err }, { status: 500 });
  }
}

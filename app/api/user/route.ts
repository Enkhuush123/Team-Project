// app/api/user/route.ts
import prisma from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const user = await currentUser();
    console.log("Current user:", user);

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Бүх users-ийг авах
    const allUsers = await prisma.user.findMany();

    // Бүх users-ийн тоо
    const usersCount = await prisma.user.count();

    return NextResponse.json(
      {
        usersCount, // бүх user-ийн тоо
        allUsers, // бүх user-ийн мэдээлэл
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("API GET error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Not signed in", { status: 401 });
    }

    const user = await currentUser();
    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    await prisma.user.upsert({
      where: { id: userId },
      update: {},
      create: {
        id: userId,
        email: user.emailAddresses[0].emailAddress,
        name: user.firstName,
        clerkId: user.id,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ message: "cant", err }, { status: 500 });
  }
}

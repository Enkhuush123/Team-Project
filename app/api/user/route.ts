// app/api/user/route.ts
import prisma from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Одоогийн хэрэглэгчийн мэдээллийг авах
    const userData = await prisma.user.findUnique({
      where: { clerkId: user.id },
      select: {
        id: true,
        clerkId: true,
        email: true,
        name: true,
        points: true,
        imageUrl: true,
        role: true,
      },
    });

    // Хэрэв database-д байхгүй бол үүсгэх
    if (!userData) {
      const newUser = await prisma.user.create({
        data: {
          clerkId: user.id,
          email: user.emailAddresses[0]?.emailAddress ?? "",
          name: user.fullName ?? user.firstName ?? null,
          imageUrl: user.imageUrl ?? null,
        },
        select: {
          id: true,
          clerkId: true,
          email: true,
          name: true,
          points: true,
          imageUrl: true,
          role: true,
        },
      });

      return NextResponse.json({ userData: newUser }, { status: 200 });
    }

    return NextResponse.json({ userData }, { status: 200 });
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

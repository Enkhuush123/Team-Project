import prisma from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const user = await currentUser();
  if (!user) return new NextResponse("Unauthorized", { status: 401 });

  const userData = await prisma.user.findUnique({
    where: { clerkId: user?.id },
  });

  const usersCount = await prisma.user.count();

  return NextResponse.json(
    {
      userData,
      usersCount,
    },
    { status: 200 },
  );

  console.log(userData);
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

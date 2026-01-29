import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { title, description, email } = await req.json();

  if (!title) {
    return NextResponse.json({ message: "Reason required" }, { status: 400 });
  }

  const report = await prisma.report.create({
    data: {
      title,
      email,
      description,
      reporterId: user.id,
      userId: user.id,
    },
  });

  return NextResponse.json(report, { status: 201 });
}
export async function GET() {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const [reports, reportsCount] = await Promise.all([
    prisma.report.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        reporter: {
          select: { email: true },
        },
      },
    }),
    prisma.report.count(),
  ]);

  return NextResponse.json(
    {
      reports,
      reportsCount,
    },
    { status: 200 },
  );
}

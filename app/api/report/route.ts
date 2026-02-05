import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { title, description, email, blogId } = await req.json();

    if (!title) {
      return NextResponse.json({ message: "Reason required" }, { status: 400 });
    }

    const report = await prisma.report.create({
      data: {
        title,
        description,
        reportedBlog: {
          connect: { id: blogId },
        },
        reporter: {
          connect: { id: user.id },
        },
      },
    });


    return NextResponse.json(report, { status: 201 });

  } catch (err) {
    return NextResponse.json(err)
  }

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

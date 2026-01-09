import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const packs = await prisma.pack.findMany({
    where: { active: true },
    orderBy: [{ popular: "desc" }, { price: "asc" }],
    select: {
      key: true,
      name: true,
      points: true,
      price: true,
      popular: true,
      bonusPct: true,
    },
  });
  return NextResponse.json({ packs });
}

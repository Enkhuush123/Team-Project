import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.pack.upsert({
    where: { key: "starter" },
    update: {},
    create: {
      key: "starter",
      name: "Starter",
      points: 1000,
      price: 3000,
      popular: true,
    },
  });

  await prisma.pack.upsert({
    where: { key: "pro" },
    update: {},
    create: {
      key: "pro",
      name: "Pro",
      points: 3000,
      price: 8000,
      bonusPct: 10,
    },
  });

  await prisma.pack.upsert({
    where: { key: "elite" },
    update: {},
    create: {
      key: "elite",
      name: "Elite",
      points: 7000,
      price: 15000,
      bonusPct: 20,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });

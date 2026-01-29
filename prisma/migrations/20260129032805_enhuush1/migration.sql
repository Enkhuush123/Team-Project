-- CreateEnum
CREATE TYPE "ReportStatus" AS ENUM ('PENDING', 'RESOLVED', 'REJECTED');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "banned" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "email" TEXT,
    "userId" TEXT NOT NULL,
    "status" "ReportStatus" NOT NULL DEFAULT 'PENDING',
    "reporterId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_reporterId_fkey" FOREIGN KEY ("reporterId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

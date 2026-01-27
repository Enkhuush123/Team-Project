/*
  Warnings:

  - You are about to drop the column `uodatedAt` on the `BlogVote` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BlogVote" DROP COLUMN "uodatedAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

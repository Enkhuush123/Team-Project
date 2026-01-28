/*
  Warnings:

  - You are about to drop the column `uodatedAt` on the `BlogVote` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `BlogVote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BlogVote" DROP COLUMN "uodatedAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

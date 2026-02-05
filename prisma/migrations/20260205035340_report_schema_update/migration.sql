/*
  Warnings:

  - You are about to drop the column `userId` on the `Report` table. All the data in the column will be lost.
  - Added the required column `reportedBlogId` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Blog_id_key";

-- AlterTable
ALTER TABLE "Report" DROP COLUMN "userId",
ADD COLUMN     "reportedBlogId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_reportedBlogId_fkey" FOREIGN KEY ("reportedBlogId") REFERENCES "Blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

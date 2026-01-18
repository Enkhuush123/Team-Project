-- AlterTable
ALTER TABLE "Review" ALTER COLUMN "screenshotUrl" DROP NOT NULL,
ALTER COLUMN "geminiConfidence" SET DEFAULT 0;

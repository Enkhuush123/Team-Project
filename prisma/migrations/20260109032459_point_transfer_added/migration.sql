-- CreateTable
CREATE TABLE "PointTransfer" (
    "id" TEXT NOT NULL,
    "fromUserId" TEXT,
    "toUserId" TEXT,
    "amount" INTEGER NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PointTransfer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PointTransfer" ADD CONSTRAINT "PointTransfer_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "User"("clerkId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PointTransfer" ADD CONSTRAINT "PointTransfer_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES "User"("clerkId") ON DELETE SET NULL ON UPDATE CASCADE;

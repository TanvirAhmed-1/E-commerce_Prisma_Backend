/*
  Warnings:

  - Added the required column `userId` to the `coupon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."coupon" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "coupon_userId_idx" ON "public"."coupon"("userId");

-- AddForeignKey
ALTER TABLE "public"."coupon" ADD CONSTRAINT "coupon_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

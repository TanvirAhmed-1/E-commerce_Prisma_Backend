/*
  Warnings:

  - You are about to drop the column `sku` on the `productVariant` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."ChangeType" AS ENUM ('ORDER', 'RETURN', 'RESTOCK');

-- CreateEnum
CREATE TYPE "public"."NotificationType" AS ENUM ('ORDER', 'PAYMENT', 'PRODUCT', 'COUPON', 'SYSTEM');

-- DropIndex
DROP INDEX "public"."productVariant_sku_key";

-- AlterTable
ALTER TABLE "public"."product" ALTER COLUMN "slug" DROP NOT NULL,
ALTER COLUMN "sku" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."productVariant" DROP COLUMN "sku";

-- CreateTable
CREATE TABLE "public"."stockHistory" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "changeType" "public"."ChangeType" NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "note" TEXT,

    CONSTRAINT "stockHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."shipping_address" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "division" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "postalCode" TEXT,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "shipping_address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."notification" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "type" "public"."NotificationType" NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "relatedId" TEXT,

    CONSTRAINT "notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "stockHistory_productId_idx" ON "public"."stockHistory"("productId");

-- CreateIndex
CREATE INDEX "shipping_address_userId_idx" ON "public"."shipping_address"("userId");

-- CreateIndex
CREATE INDEX "notification_userId_idx" ON "public"."notification"("userId");

-- AddForeignKey
ALTER TABLE "public"."stockHistory" ADD CONSTRAINT "stockHistory_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."shipping_address" ADD CONSTRAINT "shipping_address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."notification" ADD CONSTRAINT "notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

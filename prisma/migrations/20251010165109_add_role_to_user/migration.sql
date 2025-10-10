-- CreateEnum
CREATE TYPE "public"."RoleType" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'USER', 'SELLER');

-- AlterTable
ALTER TABLE "public"."user" ADD COLUMN     "role" "public"."RoleType" NOT NULL DEFAULT 'USER';

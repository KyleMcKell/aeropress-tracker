/*
  Warnings:

  - You are about to drop the column `comments` on the `AeropressBrew` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AeropressBrew" DROP COLUMN "comments",
ADD COLUMN     "info" TEXT;

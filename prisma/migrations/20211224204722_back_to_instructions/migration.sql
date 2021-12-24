/*
  Warnings:

  - You are about to drop the column `stepNames` on the `AeropressBrew` table. All the data in the column will be lost.
  - You are about to drop the column `stepTimes` on the `AeropressBrew` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AeropressBrew" DROP COLUMN "stepNames",
DROP COLUMN "stepTimes",
ADD COLUMN     "instructions" TEXT;

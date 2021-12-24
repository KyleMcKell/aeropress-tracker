/*
  Warnings:

  - You are about to drop the `Steps` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Steps" DROP CONSTRAINT "Steps_brewId_fkey";

-- AlterTable
ALTER TABLE "AeropressBrew" ADD COLUMN     "stepNames" TEXT[],
ADD COLUMN     "stepTimes" INTEGER[];

-- DropTable
DROP TABLE "Steps";

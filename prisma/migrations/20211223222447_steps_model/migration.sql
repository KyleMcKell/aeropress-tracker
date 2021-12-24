/*
  Warnings:

  - You are about to drop the column `steps` on the `AeropressBrew` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AeropressBrew" DROP COLUMN "steps";

-- CreateTable
CREATE TABLE "Steps" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "time" INTEGER NOT NULL,
    "brewId" INTEGER NOT NULL,

    CONSTRAINT "Steps_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Steps" ADD CONSTRAINT "Steps_brewId_fkey" FOREIGN KEY ("brewId") REFERENCES "AeropressBrew"("id") ON DELETE CASCADE ON UPDATE CASCADE;

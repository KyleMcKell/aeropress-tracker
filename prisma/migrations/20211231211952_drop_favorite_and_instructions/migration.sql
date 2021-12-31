/*
  Warnings:

  - You are about to drop the column `favorite` on the `AeropressBrew` table. All the data in the column will be lost.
  - You are about to drop the column `instructions` on the `AeropressBrew` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "brewFavoriteIndex";

-- AlterTable
ALTER TABLE "AeropressBrew" DROP COLUMN "favorite",
DROP COLUMN "instructions";

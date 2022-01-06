-- AlterTable
ALTER TABLE "AeropressBrew" ADD COLUMN     "comments" TEXT,
ADD COLUMN     "favorite" BOOLEAN NOT NULL DEFAULT false;

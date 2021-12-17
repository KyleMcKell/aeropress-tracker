-- CreateTable
CREATE TABLE "AeropressBrew" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "brewTime" INTEGER NOT NULL,
    "waterTemp" INTEGER NOT NULL,
    "coffeeWeight" INTEGER NOT NULL,
    "waterWeight" INTEGER NOT NULL,
    "roastType" TEXT,
    "inverted" BOOLEAN NOT NULL,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "AeropressBrew_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

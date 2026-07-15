/*
  Warnings:

  - Added the required column `updatedAt` to the `Pizzaria` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pizzaria" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "accountId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "whatsapp" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Pizzaria_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Pizzaria" ("accountId", "description", "id", "name") SELECT "accountId", "description", "id", "name" FROM "Pizzaria";
DROP TABLE "Pizzaria";
ALTER TABLE "new_Pizzaria" RENAME TO "Pizzaria";
CREATE UNIQUE INDEX "Pizzaria_accountId_key" ON "Pizzaria"("accountId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `pages` on the `Book` table. All the data in the column will be lost.
  - Added the required column `pageCount` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publishedDate` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "createdAt",
DROP COLUMN "pages",
ADD COLUMN     "pageCount" INTEGER NOT NULL,
ADD COLUMN     "publishedDate" TIMESTAMP(3) NOT NULL;

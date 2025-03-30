/*
  Warnings:

  - A unique constraint covering the columns `[title,author,pageCount]` on the table `Book` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Book" ALTER COLUMN "publishedDate" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Book_title_author_pageCount_key" ON "Book"("title", "author", "pageCount");

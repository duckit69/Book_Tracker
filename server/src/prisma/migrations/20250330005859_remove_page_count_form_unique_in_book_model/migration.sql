/*
  Warnings:

  - A unique constraint covering the columns `[title,author]` on the table `Book` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Book_title_author_pageCount_key";

-- CreateIndex
CREATE UNIQUE INDEX "Book_title_author_key" ON "Book"("title", "author");

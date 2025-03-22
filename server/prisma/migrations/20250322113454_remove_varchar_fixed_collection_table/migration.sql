/*
  Warnings:

  - You are about to drop the column `status` on the `Category` table. All the data in the column will be lost.
  - The `status` column on the `Collection` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - Added the required column `birthDate` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book" ALTER COLUMN "title" SET DATA TYPE TEXT,
ALTER COLUMN "author" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "status",
ALTER COLUMN "name" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Collection" DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'NOT_STARTED';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt",
ADD COLUMN     "birthDate" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "username" SET DATA TYPE TEXT;

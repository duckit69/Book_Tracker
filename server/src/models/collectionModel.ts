import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({});

async function createCollection(userId: string, bookId: string) {
  const userID = parseInt(userId);
  const bookID = parseInt(bookId);
  const dateAdded = new Date().toISOString();
  const collection = await prisma.collection.create({
    data: {
      dateAdded,
      userId: userID,
      bookId: bookID,
    },
  });

  return collection;
}

export const Collection = {
  createCollection,
};

import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient({});

interface Book {
  title: string;
  author: string;
  pageCount: number | null;
  publishedDate: string | null;
  categoryId: number;
}

async function createManyBooks(data: Book[]) {
  try {
    const result = await prisma.book.createManyAndReturn({
      data,
    });
    return result;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) throw error;
    else throw error;
  }
}

// createBook Check if book exist or not
// i can do better
async function createBook(book: Book) {
  try {
    await prisma.book.upsert({
      where: {
        uniqueBook: {
          title: book.title,
          author: book.author,
        },
      },
      update: {},
      create: {
        title: book.title,
        author: book.author,
        pageCount: book.pageCount,
        publishedDate: book.publishedDate,
        categoryId: book.categoryId,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) throw error;
    else throw error;
  }
}

async function getBookCategory(bookId: number) {
  const book = await prisma.book.findUnique({
    where: {
      id: bookId,
    },
    include: {
      category: true,
    },
  });
  return book?.category.id;
}

async function getBooks() {
  try {
    const booksArray = await prisma.book.findMany({
      where: {},
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
    });
    return booksArray;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) throw error;
    else throw error;
  }
}
export const Book = { createBook, getBookCategory, createManyBooks, getBooks };

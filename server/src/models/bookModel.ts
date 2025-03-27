import { PrismaClient } from "@prisma/client";
import { Category } from "./categoryModel";
import { title } from "process";
import { getBooksBySubject } from "../services/googleBooksAPI";

const prisma = new PrismaClient({});

interface Book {
  title: string;
  authors?: string[];
  pageCount: number;
  publishedDate: Date;
}

async function createBook(categoryName: string, books: Book[]) {
  const category = await Category.getCategoryOrCreate(categoryName);
  const updatedBooks = books.map((book) => {
    console.log("Processing book: ", book);
    return {
      title: book.title,
      author: book.authors ? book.authors[0] : "Undefined",
      pageCount: book.pageCount,
      publishedDate: book.publishedDate
        ? new Date(book.publishedDate).toISOString()
        : "null",
      categoryId: category.id,
    };
  });
  updatedBooks.map(async (book) => {
    await prisma.book.create({
      data: book,
    });
  });
  return category.id;
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
export const Book = { createBook, getBookCategory };

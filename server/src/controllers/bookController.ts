import { Request, Response } from "express";
import { Prisma } from "@prisma/client";
import axios from "axios";
// Book Controller should talk to Category Controller not Model
import { Category } from "../models/categoryModel";
import { Book } from "../models/bookModel";
import { booksAPI } from "../services/googleBooksAPI";
import { error } from "console";

// Interfaces
interface VolumeInfo {
  categories?: string[];
  title: string;
  authors?: string[];
  pageCount: number;
  publishedDate: string;
}

interface Book {
  volumeInfo: VolumeInfo;
}

interface FilteredBook {
  title: string;
  author: string;
  pageCount: number | null;
  publishedDate: string | null;
  categoryId: number;
}
async function getBooksBySubjectFromAPI(req: Request, res: Response) {
  try {
    // query must be validated
    // const subject = validateSubjectFromQuery(req.query);
    const subject = req.query.subject as string;
    // Get Books
    const resultBooks = await booksAPI.getBooksFromAPI(subject);
    res.status(200).send(resultBooks.data.items);
  } catch (error) {
    if (error instanceof axios.AxiosError)
      res.status(400).json({ source: "Axios", message: error.message });
    // when validate query fails
    if (error instanceof Error) res.status(400).json(error.message);
    else res.status(400).json({ message: "Failed Fetching Books!" });
  }
}
async function getBooksBySubjectFromDB(req: Request, res: Response) {
  try {
    // query must be validated
    // const subject = validateSubjectFromQuery(req.query);
    const subject = req.query.subject as string;
    // Get Books from db
    const resultBooks = await Book.getBooks();
    res.status(200).send(resultBooks);
  } catch (error) {
    // when validate query fails
    if (error instanceof Error) res.status(400).json(error.message);
    else res.status(400).json({ message: "Failed Fetching Books!" });
  }
}
// every book returned is stored
// Bad i should only store books inside added to libraries
// async function getBooksBySubjectFromAPI(req: Request, res: Response) {
//   try {
//     // Get Category Id
//     const category = await Category.getCategoryOrCreate(subject);

//     // Refactor Books so it fits Model Schema
//     const refactoredFilteredBooks = refactorFilteredBooks(
//       filteredBooks,
//       category.id
//     );
//     // Create Books
//     const data = await Book.createManyBooks(refactoredFilteredBooks);
//     res.status(200).send(data);
//   } catch (error) {
//     if (error instanceof Prisma.PrismaClientKnownRequestError)
//       res.status(400).json(error);
//     else if (error instanceof Prisma.PrismaClientValidationError)
//       res.status(400).json(error.message);
//     else if (error instanceof axios.AxiosError)
//       res.status(400).json({ source: "Axios", message: error.message });
//     else if (error instanceof Error) {
//       res.status(400).json({ message: "Top level", error: error.message });
//     } else {
//       res.status(400).json({ message: "An unknown error occurred" });
//     }
//   }
// }

function refactorFilteredBooks(books: Book[], category: number) {
  try {
    const updatedBooks = books.map((book) => {
      return {
        title: book.volumeInfo.title,
        author: book.volumeInfo.authors
          ? book.volumeInfo.authors.join(", ")
          : "Unknown",
        pageCount: book.volumeInfo.pageCount ? book.volumeInfo.pageCount : null,
        publishedDate: book.volumeInfo.publishedDate
          ? new Date(book.volumeInfo.publishedDate).toISOString()
          : null,
        categoryId: category,
      };
    });
    return updatedBooks;
  } catch (error) {
    throw new Error("Error Refactoring Books");
  }
}

function filterBooksBySubject(resultArray: Book[], subject: string) {
  // return books  where subject is inside categories array
  try {
    const filteredResultArray = resultArray.filter((book) => {
      if (!book.volumeInfo.categories) return [];
      return book.volumeInfo.categories.some((category) => {
        return category.toLowerCase().includes(subject.toLowerCase());
      });
    });
    return filteredResultArray;
  } catch (error) {
    throw new Error("Error Filtering Books");
  }
}

export const bookController = {
  getBooksBySubjectFromAPI,
  getBooksBySubjectFromDB,
};

// router.post(
//   "",
//   userAuthController.authenticatedUser,
//   async (req: Request, res: Response) => {
//     // userId
//     const userId = req.body.user as string;
//     const bookId = "2";
//     //get category to avoid repetition
//     const collection = await Collection.createCollection(userId, bookId);
//     res.status(200).json(collection);
//     // iterate on each category.toUpperCase()
//     // create record for each? HEAL & ai what
//   }
// );

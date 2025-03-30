import axios, { AxiosError } from "axios";
import { Book } from "../models/bookModel";
import { Category } from "../models/categoryModel";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const URL = "https://www.googleapis.com/books/v1/volumes?q=";

// Author is returning an array of all authrs for now
// im making all array one long string
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

export async function getBooksBySubject(subject: string) {
  try {
    // Get Books
    const books = await getBooksFromAPI(subject);
    // Get Category Id
    const category = await Category.getCategoryOrCreate(subject);
    // Refactor Books so it fits Schema
    const filteredBooks = refactorFilteredBooks(books, category.id);
    // Create Book By Book
    const data = await createfilteredBooksRecords(filteredBooks);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) throw error;
    if (error instanceof PrismaClientKnownRequestError) throw error;
    throw error;
  }
}

async function getBooksFromAPI(subject: string) {
  try {
    //validate input + only logged in users can browse
    // what if search contains two words ?
    const tmpURL = `${URL}subject:${subject.toLowerCase()}`;
    const result = await axios.get(tmpURL);
    const resultFilteredBySubject = filterBooksBySubject(
      result.data.items,
      subject
    );
    return resultFilteredBySubject;
  } catch (error) {
    if (error instanceof AxiosError) throw error;
    if (error instanceof PrismaClientKnownRequestError) throw error;
    throw new Error("Error Building resultArray");
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

// Thinking about moving it to book Controller
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

async function createfilteredBooksRecords(books: FilteredBook[]) {
  try {
    return Book.createManyBooks(books);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) throw error;
    else throw new Error("Failed Creating Book Records");
  }
}

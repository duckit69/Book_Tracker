import axios, { AxiosError } from "axios";
import { Book } from "../models/bookModel";

const URL = "https://www.googleapis.com/books/v1/volumes?q=";

// Author is returning an array of all authrs for now im using the first author only
interface VolumeInfo {
  categories: string[];
  title: string;
  authors: string[];
  pageCount: number;
  publishedDate: Date;
}
// const filteredObj = filtered.map((ele) => ({
//   title: ele.volumeInfo.title,
//   authors: ele.volumeInfo.authors,
//   pageCount: ele.volumeInfo.pageCount,
//   publishedDate: ele.volumeInfo.publishedDate,
// }));

interface Book {
  volumeInfo: VolumeInfo;
}

export async function getBooksBySubject(subject: string) {
  try {
    //validate input + only logged in users can browse
    // what if search contains two words ?
    const tmpURL = `${URL}subject:${subject.toLowerCase()}`;
    const result = await axios.get(tmpURL);
    const resultArray = result.data.items as Book[];
    // return books  where subject is inside categories array
    // note: categories element can be composed of two words so we search if subject is substr
    //
    const filteredResultArray = resultArray.filter((book) => {
      if (!book.volumeInfo.categories) return [];
      return book.volumeInfo.categories.some((category) => {
        return category.toLowerCase().includes(subject.toLowerCase());
      });
    });
    const filteredBooksArray = filteredResultArray.map((ele) => ({
      title: ele.volumeInfo.title,
      authors: ele.volumeInfo.authors,
      pageCount: ele.volumeInfo.pageCount,
      publishedDate: ele.volumeInfo.publishedDate,
    }));
    await Book.createBook(subject.toLowerCase(), filteredBooksArray);
    return filteredBooksArray;
  } catch (error) {
    if (error instanceof AxiosError) throw new Error("Axios Error");
    throw new Error("Prisma Error");
  }
}

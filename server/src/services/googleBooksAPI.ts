import axios from "axios";
import { Prisma } from "@prisma/client";

const URL = "https://www.googleapis.com/books/v1/volumes?q=";

async function getBooksFromAPI(subject: string) {
  try {
    // validate input + only logged in users can browse
    // what if search contains two words ?
    const tmpURL = `${URL}subject:${subject.toLowerCase()}`;
    const result = await axios.get(tmpURL);
    return result;
  } catch (error) {
    if (error instanceof axios.AxiosError) throw error;
    if (error instanceof Prisma.PrismaClientKnownRequestError) throw error;
    throw new Error("Error Building resultArray");
  }
}

export const booksAPI = {
  getBooksFromAPI,
};

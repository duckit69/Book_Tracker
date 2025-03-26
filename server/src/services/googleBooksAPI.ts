import axios from "axios";

const URL = "https://www.googleapis.com/books/v1/volumes?q=";

interface VolumeInfo {
  categories: string[];
}

interface Book {
  volumeInfo: VolumeInfo;
}

export async function getBooksBySubject(subject: string) {
  try {
    //validate input + only logged in users can browse
    // what if search contains two words ?
    const tmpURL = URL + `subject:${subject}`;
    const result = (await axios.get(tmpURL)).data.items as Book[];
    const filtered = result.filter((book) =>
      book.volumeInfo.categories.some((category) =>
        category.toLowerCase().includes(subject)
      )
    );
    return filtered;
  } catch (error) {
    throw error;
  }
}

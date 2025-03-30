import { Request, Response } from "express";

// app.get("/books", async (req: Request, res: Response) => {
//   const query = req.query.subject as string;
//   try {
//     const result = await getBooksBySubject(query);
//     res.status(200).send(result);
//   } catch (error) {
//     if (error instanceof PrismaClientKnownRequestError)
//       res.status(400).json(error);
//     if (error instanceof PrismaClientValidationError)
//       res.status(400).json(error.message);

//     if (error instanceof AxiosError)
//       res.status(400).json({ source: "Axios", message: error.message });
//     else if (error instanceof Error) {
//       res.status(400).json({ message: "Top level", error: error.message });
//     } else {
//       res.status(400).json({ message: "An unknown error occurred" });
//     }
//   }
// });

// app.post(
//   "/books",
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

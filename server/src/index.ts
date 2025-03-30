import express, { Express, Request, Response, RequestHandler } from "express";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes/userRoutes";
import { userAuthController } from "./controllers/userController/authController";
import { validateRequests } from "./utils/validateRequests";
import { userLoginSchema } from "./utils/validators/authSchemas";
import { Collection } from "./models/collectionModel";

import { getBooksBySubject } from "./services/googleBooksAPI";
import { AxiosError } from "axios";
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/users", userRouter);
app.post(
  "/login",
  validateRequests.validateRequst(userLoginSchema),
  userAuthController.login as RequestHandler
);

app.get(
  "/",
  userAuthController.authenticatedUser,
  (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
  }
);

app.get("/books", async (req: Request, res: Response) => {
  const query = req.query.subject as string;
  try {
    const result = await getBooksBySubject(query);
    res.status(200).send(result);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError)
      res.status(400).json(error);
    if (error instanceof PrismaClientValidationError)
      res.status(400).json(error.message);

    if (error instanceof AxiosError)
      res.status(400).json({ source: "Axios", message: error.message });
    else if (error instanceof Error) {
      res.status(400).json({ message: "Top level", error: error.message });
    } else {
      res.status(400).json({ message: "An unknown error occurred" });
    }
  }
});

app.post(
  "/books",
  userAuthController.authenticatedUser,
  async (req: Request, res: Response) => {
    // userId
    const userId = req.body.user as string;
    const bookId = "2";
    //get category to avoid repetition
    const collection = await Collection.createCollection(userId, bookId);
    res.status(200).json(collection);
    // iterate on each category.toUpperCase()
    // create record for each? HEAL & ai what
  }
);
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

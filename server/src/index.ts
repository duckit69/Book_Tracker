import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes";
import bookRouter from "./routes/bookRouter";
import { userAuthController } from "./controllers/userController/authController";
import { validateRequests } from "./utils/validateRequests";
import { userLoginSchema } from "./utils/validators/authSchemas";
import { userController } from "./controllers/userController/userController";
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
app.use("books", bookRouter);
app.post(
  "/login",
  validateRequests.validateRequst(userLoginSchema),
  userAuthController.login
);

app.get(
  "/",
  userAuthController.authenticatedUser,
  // home page
  (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
  }
);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

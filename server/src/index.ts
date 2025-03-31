import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
// Routes
import userRouter from "./routes/userRoutes";
import bookRouter from "./routes/bookRouter";
// Controllers
import { userAuthController } from "./controllers/authController";
// Schemas
import { userLoginSchema } from "./utils/validators/authSchemas";
// Utils
import { validateRequests } from "./utils/validateRequests";
// Test
import { Collection } from "./models/collectionModel";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routers
app.use("/users", userRouter);
app.use("/books", bookRouter);

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

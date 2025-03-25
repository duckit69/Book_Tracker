import express, { Express, Request, Response, RequestHandler } from "express";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes/userRoutes";
import { userAuthController } from "./controllers/userController/authController";
import { validateRequests } from "./utils/validateRequests";
import { userLoginSchema } from "./utils/validators/authSchemas";

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

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

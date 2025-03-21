import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import userRouter from "../routes/userRoutes/userRoutes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.urlencoded());

app.use("/user", userRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { userSignupSchema } from "../utils/validators/authSchemas";
import { ValidationError } from "joi";
dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.urlencoded());

const validate = function (req: Request, res: Response, next: any) {
  // cant do try catch validate is sync and return error object ( does not throw error)
  const { error } = userSignupSchema.validate(req.body);
  if (error) {
    res
      .status(400)
      .send({ message: "Invalid request data", error: error.message });
  }
  next();
};
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.post("/user/signup", validate, (req: Request, res: Response) => {
  res.status(200).send(req.body);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

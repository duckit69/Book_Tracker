import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";

// Routes
import userRouter from "./routes/userRoutes";
import bookRouter from "./routes/bookRouter";
// Controllers
import { userAuthController } from "./controllers/authController";
// Schemas
import { userLoginSchema } from "./utils/validators/authSchemas";
// Utils
import { validateRequests } from "./utils/validateRequests";
import cookieParser from "cookie-parser";

import cors from "cors";
import { generateAccessToken } from "./utils/authUtils";
// HTTPS
import fs from "fs";
import https from "https";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(cookieParser());
// cors config allow access from anys origin
app.use(
  cors({
    origin: "https://localhost:5173",
    credentials: true,
  })
);

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

app.post("/refresh", (req, res) => {
  console.log(req.cookies);
  const refreshToken = req.cookies?.refreshToken;
  if (!req.cookies?.refreshToken) {
    // console.error("Missing cookies. Full headers:", req.headers);
    res.status(401).json({ error: "Cookie not received" });
  } else {
    // validate refresh token with stored refresh token for this user
    const newAccessToken = generateAccessToken("71"); // TODO: get userId from refresh token
    res.json({ accessToken: newAccessToken });
  }
});
app.get(
  "/",
  userAuthController.authenticatedUser,
  // home page
  (req: Request, res: Response) => {
    // res.send("Express + TypeScript Server");
  }
);

const httpsOptions = {
  key: fs.readFileSync(path.resolve(__dirname, "../../localhost-key.pem")),
  cert: fs.readFileSync(path.resolve(__dirname, "../../localhost.pem")),
};

https.createServer(httpsOptions, app).listen(3000, () => {
  console.log("✅ HTTPS server running on https://localhost:3000");
});

// app.listen(port, () => {
//   console.log(`[server]: Server is running at http://localhost:${port}`);
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

// User Authentication eg: signup login JWT..etc
// Jwt auth funcs can be deployed in seperate server
import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { comparePassword } from "../utils/utils";
import jwt, { JwtPayload } from "jsonwebtoken";
import "dotenv/config";
const prisma = new PrismaClient({});

async function login(req: Request, res: Response) {
  try {
    // use User Model
    const user = await prisma.user.findUniqueOrThrow({
      where: { username: req.body.username },
    });

    const isMatch = await comparePassword(req.body.password, user.password);
    if (!isMatch) res.status(400).send({ message: "Invalid credentials" });

    const accessToken = generateAccessToken(user.id.toString());
    const refreshToken = generateRefreshToken(user.id.toString());
    res
      .json({ accessToken: accessToken, refreshToken: refreshToken })
      .status(200);
  } catch (error) {
    res.status(400).json(error);
  }
}

function authenticatedUser(req: Request, res: Response, next: NextFunction) {
  // check if token is provided
  const token = getTokenFromHeaders(req, res);
  try {
    const test = verifyToken(token);
    req.body.user = test.userId;
    next();
  } catch (error) {
    res.status(401).send({ message: error });
  }
}

function getTokenFromHeaders(req: Request, res: Response) {
  const token = req.headers["authorization"]?.split(" ")[1] as string;
  if (!token) res.status(401).json({ message: "Token is required!" });
  return token;
}
function generateAccessToken(userId: string) {
  return jwt.sign(
    { userId: userId },
    process.env.ACCESS_TOKEN_SECRET as string,
    {
      expiresIn: "1h",
    }
  );
}
function generateRefreshToken(userId: string) {
  return jwt.sign(
    { userId: userId },
    process.env.REFRESH_TOKEN_SECRET as string
  );
}

function verifyToken(token: string) {
  // typeCast to JwtPayload to acess attributes
  return jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as string
  ) as JwtPayload;
}
export const userAuthController = { login, authenticatedUser, verifyToken };

// User Authentication eg: signup login JWT..etc
// Jwt auth funcs can be deployed in seperate server
import { NextFunction, Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
import { comparePassword } from "../../utils/utils";
import jwt, { JwtPayload } from "jsonwebtoken";
import "dotenv/config";
const prisma = new PrismaClient({});

async function login(req: Request, res: Response) {
  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: { username: req.body.username },
    });

    const isMatch = await comparePassword(req.body.password, user.password);
    if (!isMatch) res.status(400).send({ message: "Invalid credentials" });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    res
      .json({ accessToken: accessToken, refreshToken: refreshToken })
      .status(200);
  } catch (error) {
    console.log(error);

    res.status(400).send({ message: "User not found" });
  }
}

function authenticatedUser(req: Request, res: Response, next: NextFunction) {
  const token = req.headers["authorization"]?.split(" ")[1];
  try {
    // if you wanna access the attributes of payload (may be for role check )
    // cast it to JwtPayload first
    const decodedPayLoad = jwt.verify(
      token as string,
      process.env.ACCESS_TOKEN_SECRET as string
    );
    console.log(decodedPayLoad);
    next();
  } catch (error) {
    console.log("error:", error);
    res.status(401).send({ message: error });
  }
}
type userType = {
  username: string;
};
function generateAccessToken(user: userType) {
  return jwt.sign(
    { user: user.username },
    process.env.ACCESS_TOKEN_SECRET as string,
    {
      expiresIn: "20s",
    }
  );
}
function generateRefreshToken(user: userType) {
  return jwt.sign(
    { user: user.username },
    process.env.REFRESH_TOKEN_SECRET as string
  );
}
export const userAuthController = { login, authenticatedUser };

// Bcrypt can be moved to UserModel since it is only used there
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
const saltRound = 10;

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, saltRound);
}

export async function comparePassword(
  inputPassword: string,
  userPassword: string
) {
  return await bcrypt.compare(inputPassword, userPassword);
}

//

export function getTokenFromHeaders(req: Request, res: Response) {
  const token = req.headers["authorization"]?.split(" ")[1] as string;
  if (!token) throw new Error("Token is required!"); // 401 Unauthorized
  return token;
}

export function verifyToken(token: string) {
  return jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as string
  ) as JwtPayload;
}
export function generateAccessToken(userId: string) {
  const payLoad = {
    userId: userId,
  };
  return jwt.sign(payLoad, process.env.ACCESS_TOKEN_SECRET as string, {
    expiresIn: "15m",
  });
}
export function generateRefreshToken(userId: string) {
  const payLoad = {
    userId: userId,
  };
  return jwt.sign(payLoad, process.env.REFRESH_TOKEN_SECRET as string, {
    expiresIn: "7d",
  });
}

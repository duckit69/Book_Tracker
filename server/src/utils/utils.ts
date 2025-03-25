// Bcrypt can be moved to UserModel since it is only used there
import bcrypt from "bcrypt";
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
import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export function getTokenFromHeaders(req: Request, res: Response) {
  const token = req.headers["authorization"]?.split(" ")[1] as string;
  if (!token) res.status(401).json({ message: "Token is required!" });
  return token;
}

export function verifyToken(token: string) {
  return jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as string
  ) as JwtPayload;
}

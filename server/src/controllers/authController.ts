// User Authentication eg: signup login JWT..etc
// Jwt auth funcs can be deployed in seperate server
import { NextFunction, Request, Response } from "express";
import { comparePassword, generateRefreshToken } from "../utils/authUtils";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models/userModel";
import { generateAccessToken, getTokenFromHeaders } from "../utils/authUtils";

import "dotenv/config";

async function login(req: Request, res: Response) {
  try {
    // Validate user credentials
    const user = await User.getUserByUserNameOrThrow(req.body.username);
    const isMatch = await comparePassword(req.body.password, user.password);
    if (!isMatch)
      res.status(400).send({ status: "error", message: "Invalid credentials" });

    const accessToken = generateAccessToken(user.id.toString());
    const refreshToken = generateRefreshToken(user.id.toString());
    const userUpdatedWithRefreshToken = await User.updateOrCreateRefreshToken(
      user.id,
      refreshToken
    );

    // 4. Set refresh token as HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true, // Enable in production (HTTPS)
      sameSite: "none",
    });
    // return accessToken and user
    const userResponse = {
      id: userUpdatedWithRefreshToken.id,
      role: userUpdatedWithRefreshToken.role,
    };
    res.status(200).json({ accessToken: accessToken, user: userResponse });
  } catch (error) {
    res.status(400).json(error);
  }
}

function authenticatedUser(req: Request, res: Response, next: NextFunction) {
  // check if token is provided
  try {
    const token = getTokenFromHeaders(req, res);
    const verifiedToken = verifyToken(token);
    req.body.user = verifiedToken.userId;
    next();
  } catch (error) {
    // Invalid Token
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ message: "Invalid or malformed token" });
    }
    // Expired Token
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ message: "Token expired" });
    }
    // Fallback for other errors
    res.status(401).json({ message: "Authentication failed" });
  }
}

function verifyToken(token: string) {
  // typeCast to JwtPayload to acess attributes
  return jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as string
  ) as JwtPayload;
}
export const userAuthController = { login, authenticatedUser, verifyToken };

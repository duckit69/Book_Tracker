import { Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import { User } from "../models/userModel";
import {
  hashPassword,
  getTokenFromHeaders,
  verifyToken,
} from "../utils/authUtils";
import { generateAccessToken, generateRefreshToken } from "../utils/authUtils";

const prisma = new PrismaClient({});

async function signUp(req: Request, res: Response) {
  req.body.password = await hashPassword(req.body.password);
  req.body.birthDate = new Date(req.body.birthDate).toISOString();
  try {
    delete req.body.repeat_password;
    const user = await User.createUser(req.body);
    const accessToken = generateAccessToken(user.id.toString());
    const refreshToken = generateRefreshToken(user.id.toString());
    const hashedRefreshToken = await hashPassword(refreshToken);
    const userUpdatedWithRefreshToken = await User.updateOrCreateRefreshToken(
      user.id,
      hashedRefreshToken
    );
    //Set refresh token as HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // Enable in production (HTTPS)
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    //Send Response
    res.status(200).json({
      message: "User created successfully",
      user: {
        id: user.id,
      },
      accessToken,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError)
      res.status(400).json({ code: error.code, message: error.message });
    else if (error instanceof Error)
      res.status(400).json({
        message: error.message || "Error Signing up user",
      });
    else res.status(400).json(error);
  }
}

async function getAllUsers(req: Request, res: Response) {
  try {
    const usersArr = await User.getUsers();
    res.json(usersArr);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError)
      res.status(400).json({ code: error.code, message: error.message });
    else res.status(400).json(error);
  }
}

async function getUserById(req: Request, res: Response) {
  try {
    const userId = parseInt(req.params.id);
    const user = await User.getUserById(userId);
    res.status(200).json(user);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError)
      res.status(404).json({ message: error.meta?.cause });
    else if (error instanceof Prisma.PrismaClientInitializationError)
      res.status(404).json(error);
    else res.status(404).json(error);
  }
}

// update User needs an endpoit for each attribute you want to update
// + logic to handle if user updates password? ( token )
async function updateUserBirthDate(req: Request, res: Response) {
  try {
    const token = verifyToken(getTokenFromHeaders(req, res));
    const userId = parseInt(token.userId);
    const newBirthDate = new Date(req.body.birthDate).toISOString();
    const user = await User.updateUserBirthdate(userId, newBirthDate);
    res.status(200).json(user);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError)
      res.status(400).json(error);
    res.status(404).json(error);
  }
}

export const userController = {
  signUp,
  getAllUsers,
  getUserById,
  updateUserBirthDate,
};

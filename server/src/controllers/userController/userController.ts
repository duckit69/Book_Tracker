import { Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import {
  hashPassword,
  getTokenFromHeaders,
  verifyToken,
} from "../../utils/utils";
import { User } from "../../models/userModel";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const prisma = new PrismaClient({});

async function signUp(req: Request, res: Response) {
  req.body.password = await hashPassword(req.body.password);
  req.body.birthDate = new Date(req.body.birthDate).toISOString();
  try {
    delete req.body.repeat_password;

    const user = await User.createUser(req.body);
    res.status(200).json(user);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError)
      res.status(400).json({ code: error.code, message: error.message });
    else if (error instanceof Error)
      res.status(400).json({
        message: error.message || "Error Signing up user",
      });
    else res.status(400).json(error);
  }
}

async function getUsers(req: Request, res: Response) {
  const users = await prisma.user.findMany();
  res.json(users);
}

async function getUserById(req: Request, res: Response) {
  try {
    const user = await User.getUserById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError)
      res.status(404).json({ message: error.meta?.cause });
    res.status(404).json(error);
  }
}

// update User needs an endpoit for each attribute you want to update
// + logic to handle if user updates password? ( token )
async function updateUser(req: Request, res: Response) {
  try {
    const token = verifyToken(getTokenFromHeaders(req, res));
    const user = await prisma.user.update({
      where: {
        id: parseInt(token.userId),
      },
      data: req.body,
    });
    res.status(200).json(user);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError)
      res.status(400).json(error);
    res.status(404).json(error);
  }
}

async function addBookToLibrary(req: Request, res: Response) {
  const userId = req.body.user as string;
  const bookId = "2";
}
export const userController = {
  signUp,
  getUsers,
  getUserById,
  updateUser,
};

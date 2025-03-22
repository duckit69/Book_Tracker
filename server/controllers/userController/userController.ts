import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../../utils/utils";
const prisma = new PrismaClient({});

async function signUp(req: Request, res: Response) {
  req.body.password = await hashPassword(req.body.password);
  req.body.birthDate = new Date(req.body.birthDate).toISOString();
  try {
    delete req.body.repeat_password;
    const user = await prisma.user.create({
      data: req.body,
    });
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
}

export const userController = {
  signUp,
};

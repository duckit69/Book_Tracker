import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const prisma = new PrismaClient({});

interface User {
  id?: number;
  username: string;
  birthDate: Date;
  role?: string;
  password: string;
}

async function getUserById(id: string) {
  const userId = parseInt(id);
  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
    });
    return user;
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) throw error;
    throw error;
  }
}

async function createUser(user: User) {
  try {
    const result = await prisma.user.create({
      data: {
        username: user.username,
        birthDate: user.birthDate,
        password: user.password,
      },
    });
    return result;
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) throw error;
    throw error;
  }
}
export const User = {
  getUserById,
  createUser,
};

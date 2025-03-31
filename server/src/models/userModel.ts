import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({});

interface User {
  id?: number;
  username: string;
  birthDate: string;
  role?: string;
  password: string;
}

async function getUserById(id: number) {
  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id,
      },
    });
    return user;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) throw error;
    throw error;
  }
}
async function getUsers() {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) throw error;
    else throw error;
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
    if (error instanceof Prisma.PrismaClientKnownRequestError) throw error;
    throw error;
  }
}

async function updateUserBirthdate(id: number, birthDate: string) {
  try {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        birthDate,
      },
    });
    return user;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) throw error;
    else throw error;
  }
}

export const User = {
  getUserById,
  createUser,
  getUsers,
  updateUserBirthdate,
};

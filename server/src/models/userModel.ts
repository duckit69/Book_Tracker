import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({});

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
    // may be edit message to be more precise
    return error;
  }
}

export const User = {
  getUserById,
};

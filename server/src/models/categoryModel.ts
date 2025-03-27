import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({});

async function getCategoryOrCreate(name: string) {
  const category = await prisma.category.upsert({
    where: {
      name: name,
    },
    update: {},
    create: {
      name: name,
    },
    select: {
      id: true,
    },
  });
  return category;
}

export const Category = {
  getCategoryOrCreate,
};

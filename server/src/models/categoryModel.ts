import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({});

async function getCategoryOrCreate(name: string) {
  const categoryName = name.toUpperCase();
  const category = await prisma.category.upsert({
    where: {
      name: categoryName,
    },
    update: {},
    create: {
      name: categoryName,
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

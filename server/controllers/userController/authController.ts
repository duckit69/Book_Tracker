// User Authentication eg: signup login Oauth..etc
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../../utils/utils";
const prisma = new PrismaClient({});

export const userAuthController = {};

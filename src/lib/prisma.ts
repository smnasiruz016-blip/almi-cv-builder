import { PrismaClient } from "@prisma/client";
declare global { var __prisma_cv_: PrismaClient | undefined; }
export const prisma = global.__prisma_cv_ ?? new PrismaClient();
if (process.env.NODE_ENV !== "production") global.__prisma_cv_ = prisma;

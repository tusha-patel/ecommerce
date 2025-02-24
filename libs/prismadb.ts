import { PrismaClient } from "@prisma/client";

// Add prisma to the global type in TypeScript
const globalForPrisma = global as unknown as {
    prisma?: PrismaClient;
};

// Reuse existing Prisma client if available, else create a new one
const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
import { User } from "@prisma/client";

export type safeUser = Omit<User, "createdAt" | "updatedAt" | "emailverified"> & {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
}
import prisma from "@/libs/prismadb";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export async function getSession() {
    return await getServerSession(authOptions)
}

export async function getCurrentUser() {
    try {
        const session = await getSession();
        if (!session?.user?.email) {
            return null;
        }

        const currentUser = await prisma.user.findUnique({
            where: {
                email: session?.user?.email
            },
            include: {
                orders: true
            }
        });

        if (!currentUser) {
            return null
        }
        return {
            ...currentUser,
            createAt: currentUser.createdAt.toISOString(),
            updateAt: currentUser.updatedAt.toISOString(),
            emailVerified: currentUser.emailVerified?.toString() || null
        }

    } catch (error: unknown) {
        return error
    }
}
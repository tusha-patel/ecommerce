import bcrypt from "bcrypt";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, password } = body;

        const findUser = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (findUser) {
            return NextResponse.json("You are already register", { status: 403 });
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    hashedPassword,
                }
            });
            return NextResponse.json(user, { status: 201 });
        }

    } catch (error) {
        console.log(error, "user created error");
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }

}


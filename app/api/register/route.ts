import bcrypt from "bcrypt";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, password } = body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                hashedPassword,
            }
        });
        // console.log(user);
        return NextResponse.json(user, { status: 201 });

    } catch (error:unknown) {
        // console.log(error, "user created error");
        return NextResponse.json({ message: 'Internal server error', error: error }, { status: 500 });
    }

}


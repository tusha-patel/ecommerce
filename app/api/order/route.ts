import { getCurrentUser } from "@/actions/getCurrentUser";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";


export async function PUT(request: Request) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return NextResponse.json({ message: "Unauthorized access" }, { status: 403 })
        }

        if (!currentUser || currentUser !== "ADMIN") {
            NextResponse.json({ message: "Unauthorized access" }, { status: 403 });
        }

        const body = await request.json();
        const { id, deliveryStatus } = body;


        const order = await prisma.order.update({
            where: { id: id },
            data: { deliveryStatus }
        });


        return NextResponse.json(order);

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });

    }
}
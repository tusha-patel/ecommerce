import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/getCurrentUser";

export async function POST(request: Request) {
    try {
        const currentUser = await getCurrentUser();

        if(!currentUser){
            return NextResponse.json({ message: "Unauthorized access" }, { status: 403 })
        }

        if (!currentUser || currentUser !== "ADMIN") {
            NextResponse.json({ message: "Unauthorized access" }, { status: 403 });
        }

        const body = await request.json();

        const { name, description, price, brand, category, inStock, images } = body;
        const product = await prisma.product.create({
            data: {
                name,
                description,
                brand,
                category,
                inStock,
                images,
                price: parseFloat(price)
            }
        });
        // console.log(product);
        return NextResponse.json(product);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}


export async function PUT(request: Request) {
    try {
        const CurrentUser = await getCurrentUser();
        if (!CurrentUser || CurrentUser !== "ADMIN") {
            NextResponse.json({ message: "Unauthorized access" }, { status: 403 });
        }

        let body = await request.json();
        const { id, inStock } = body;

        const product = await prisma.product.update({
            where: { id: id },
            data: { inStock }
        });

        return NextResponse.json(product)

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}



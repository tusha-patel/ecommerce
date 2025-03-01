import { getCurrentUser } from "@/actions/getCurrentUser";
import cloudinary from "@/libs/cloudinary";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";



export async function DELETE(request: Request, context: { params: { id: string; } }) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return NextResponse.json({ message: "Unauthorized access" }, { status: 403 })
        }

        if (!currentUser || currentUser !== "ADMIN") {
            NextResponse.json({ message: "Unauthorized access" }, { status: 403 });
        }

        // images public id for delete the cloudinary
        const { publicIds } = await request.json();
        // console.log(publicIds); 

        if (publicIds && publicIds.length > 0) {
            await Promise.all(publicIds.map((publicId: string) => cloudinary.uploader.destroy(publicId)))
        }

        let product = await prisma.product.delete({
            where: {
                id: context.params.id
            }
        });

        return NextResponse.json(product);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}
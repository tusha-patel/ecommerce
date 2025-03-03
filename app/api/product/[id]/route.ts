import { getCurrentUser } from "@/actions/getCurrentUser";
import cloudinary from "@/libs/cloudinary";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return NextResponse.json({ message: "Unauthorized access" }, { status: 403 });
        }

        if (currentUser !== "ADMIN") {
            return NextResponse.json({ message: "Unauthorized access" }, { status: 403 });
        }

        // images public id for delete the cloudinary
        const { publicIds } = await request.json();

        if (publicIds && publicIds.length > 0) {
            await Promise.all(publicIds.map((publicId: string) => cloudinary.uploader.destroy(publicId)));
        }

        const product = await prisma.product.delete({
            where: {
                id: params.id
            }
        });

        return NextResponse.json(product);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}

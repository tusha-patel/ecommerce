import { getCurrentUser } from "@/actions/getCurrentUser";
import prisma from "@/libs/prismadb";
import { Review } from "@prisma/client";
import { NextResponse } from "next/server";




export async function POST(request: Request) {
    try {
        const currentUser: any = getCurrentUser();
        console.log(currentUser);

        if (!currentUser) {
            return NextResponse.json("not authorize")
        }

        const body = await request.json();
        const { comment, rating, product, userId } = body;

        const deliveredOrder = currentUser?.orders.some((order: any) => {
            order.product.find((item: any) => item.id === product.id && order.deliveryStatus === "delivered")
        });


        const userReview = product?.reviews.find((review: Review) => {
            return review.userId == currentUser.id
        });

        if (userReview || !deliveredOrder) {
            return NextResponse.error()
        }

        const review = await prisma.review.create({
            data: {
                comment,
                rating,
                productId: product.id,
                userId
            }
        });

        return NextResponse.json(review);


    } catch (error: any) {
        throw new Error(error)
    }


}
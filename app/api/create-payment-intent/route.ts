import Stripe from "stripe"
import prisma from "@/libs/prismadb"
import { NextResponse } from "next/server"
import { CartProduct } from "@/app/Types/Product";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { safeUser } from "@/types";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2025-01-27.acacia"
});


// calculate for total price
const calculateOrderAmount = (items: CartProduct[]) => {
    const totalPrice = items.reduce((acc, item) => {
        const itemTotal = item.price * item.quantity;

        return acc + itemTotal;
    }, 0)
    const price: number = Math.floor(totalPrice)
    return price;
}

export async function POST(request: Request) {
    const currentUser = await getCurrentUser() as safeUser | null;;

    // not found user
    if (!currentUser) {
        return NextResponse.json({ error: "unauthorized" }, {
            status: 401
        })
    }

    const body = await request.json();
    const { items, payment_intent_id } = body;
    const total = calculateOrderAmount(items) * 100;
    if (total < 50) {  // $0.50 in cents
        return NextResponse.json({ error: "Amount is too low" }, {
            status: 400
        });
    }
    const orderData = {
        user: { connect: { id: currentUser.id } },
        amount: total,
        currency: 'usd',
        status: "pending",
        deliveryStatus: "pending",
        paymentIntentId: payment_intent_id,
        products: items
    }


    if (payment_intent_id) {
        // update the order

        const current_intent = await stripe.paymentIntents.retrieve(payment_intent_id);

        if (current_intent) {
            const updated_intent = await stripe.paymentIntents.update(
                payment_intent_id,
                { amount: total }
            )

            // update the order
            const [existing_order, update_order] = await Promise.all([
                prisma.order.findFirst({
                    where: { paymentIntentId: payment_intent_id },
                }),
                prisma.order.update({
                    where: { paymentIntentId: payment_intent_id },
                    data: {
                        amount: total,
                        products: items
                    }
                })

            ])

            if (!existing_order) {
                return NextResponse.json(
                    { error: "invalid payment intent" },
                    { status: 400 }
                )
            }

            return NextResponse.json({ paymentIntent: updated_intent })
        }
    } else {
        // create the intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: total,
            currency: "usd",
            automatic_payment_methods: { enabled: true }
        })

        // create the order
        orderData.paymentIntentId = paymentIntent.id

        await prisma.order.create({
            data: orderData,
        });
        return NextResponse.json({ paymentIntent })
    }
}











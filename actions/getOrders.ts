import prisma from "@/libs/prismadb";


export default async function getOrders() {
    try {

        const orders = await prisma.order.findMany({
            include: {
                user: true
            },
            orderBy: {
                createData: "desc"
            }
        });
        // console.log(orders);
        return orders;

    } catch (error: any) {
        throw new Error(error)
    }
}
"use client"

import { FormatPrice } from "@/app/Utils/FormatPrice";
import { TruncateText } from "@/app/Utils/TruncateText";
import { CartProduct } from "@prisma/client"
import Image from "next/image";



interface OrderItemProps {
    item: CartProduct;
}

const OrderItem = ({ item }: OrderItemProps) => {
    return (
        <div className="grid grid-cols-5 text-xs md:text-sm
            gap-4 border-t-[1.5px] border-slate-200 py-4 items-center " >
            <div className="col-span-2 justify-self-start flex gap-2 md:gap-4 " >
                <div className="relative w-[70px] aspect-square ">
                    <Image src={item.selectedImg.image} fill alt={item.name} className="object-contain" />
                </div>
                <div className=" flex flex-col gap-1">
                    <div>{TruncateText(item.name)}</div>
                    <div>{item.selectedImg.color}</div>
                </div>
            </div>
            <div className="justify-self-center">
                {FormatPrice(item.price)}
            </div>
            <div className="justify-self-center">
                {item.quantity}
            </div>
            <div className="justify-self-end font-semibold " >
                ${(item.price * item.quantity).toFixed(2)}
            </div>
        </div>
    )
}

export default OrderItem
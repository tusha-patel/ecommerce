import Link from "next/link";
import { CartProduct } from "../Types/Product"
import { FormatPrice } from "../Utils/FormatPrice";
import { TruncateText } from "../Utils/TruncateText";
import Image from "next/image";
import SetQuantity from "../component/product/SetQuantity";
import { UseCart } from "@/hooks/UseCart";


interface ItemContentProps {
    item: CartProduct;
}

const ItemContent = ({ item }: ItemContentProps) => {
    const { handleRemoveProductFromCart, handleQtyIncrement, handleQtyDecrement } = UseCart();


    return (
        <div className="grid grid-cols-5 text-xs md:text-sm gap-4 border-t-[1.5px] border-slate-200 py-4 items-center " >
            <div className="col-span-2 justify-self-start flex gap-2 md:gap-4  " >
                <Link href={`/product/${item.id}`} >
                    <div className="relative w-[70px] aspect-square  ">
                        <Image src={item.selectedImg.image} alt={item.name} fill className="object-contain" sizes="100"  />
                    </div>
                </Link>
                <div className="flex flex-col gap-1 justify-between ">
                    <Link href={`/product/${item.id}`} >
                        {TruncateText(item.name)}
                    </Link>
                    <div>{item.selectedImg.color}</div>
                    <button className="text-slate-500 underline text-start " onClick={() => handleRemoveProductFromCart(item)} >
                        Remove
                    </button>
                </div>
            </div>
            <div className="justify-self-center " >{FormatPrice(item.price)}</div>
            <div className="justify-self-center " >{
                <SetQuantity cartProduct={item} handleQtyIncrement={() => { handleQtyIncrement(item) }} handleQtyDecrement={() => { handleQtyDecrement(item) }} cartCounter={true} />
            }</div>
            <div className="justify-self-end font-semibold " >{FormatPrice(item.price * item.quantity)}</div>
        </div>
    )
}

export default ItemContent
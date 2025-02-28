"use client"
import { UseCart } from "@/hooks/UseCart"
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import Heading from "../component/Heading";
import Button from "../component/Button";
import ItemContent from "./ItemContent";
import { FormatPrice } from "../Utils/FormatPrice";
import { useRouter } from "next/navigation";
import { safeUser } from "@/types";


interface CardClientProps {
    currentUser: safeUser | null;
}

const CardClient = ({ currentUser }: CardClientProps) => {
    const { cartProducts, clearCart, cartTotalAmount } = UseCart();
    const router = useRouter();
    // console.log(cartProducts);

    if (!cartProducts || cartProducts.length == 0) {
        return (
            <div className="flex flex-col items-center" >
                <div className="text-2xl" >Your cart is empty</div>
                <div>
                    <Link href={"/"} className="text-slate-500 flex items-center gap-1 mt-2 " >
                        <MdArrowBack />
                        <span>Start Shopping</span>
                    </Link>
                </div>
            </div>
        )
    }


    return (
        <div>
            <Heading title="Shopping Cart" center />
            <div className="grid grid-cols-5 mt-8 text-xs g4 pb-2 items-center ">
                <div className="col-span-2 justify-self-start" >PRODUCT</div>
                <div className="justify-self-center" >PRICE</div>
                <div className="justify-self-center" >QUANTITY</div>
                <div className="justify-self-end" >TOTAL</div>
            </div>
            <div>
                {cartProducts.map((item) => {
                    return (
                        <ItemContent key={item.id} item={item} />
                    )
                })}
            </div>
            <div className="border-t-[1.5px] border-slate-200 py-4 flex justify-between gap-4 " >
                <div className="w-[90px]" >
                    <Button label="Clear Cart" onClick={() => { clearCart() }} small outline />
                </div>
                <div className="text-sm flex flex-col gap-1 items-center " >
                    <div>
                        <div className="flex justify-between w-full text-base font-semibold " >
                            <span>SubTotal</span>
                            <span>{FormatPrice(cartTotalAmount)}</span>
                        </div>
                        <p className="text-slate-500 mb-1 " >Taxes and shipping calculate & checkout </p>
                        <Button label={currentUser ? "Checkout" : "login to checkout"}
                            outline={currentUser ? false : true}
                            onClick={() => {
                                if (currentUser) {
                                    router.push("/checkout");
                                } else {
                                    router.push("/login");
                                }
                            }} />
                        <Link href={"/checkout"} className="text-slate-500 flex items-center gap-1 mt-2" >
                            <MdArrowBack />
                            <span>Continue shopping</span>
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CardClient
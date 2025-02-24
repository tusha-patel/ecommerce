"use client"

import { CartProduct } from "@/app/Types/Product";

interface SetQuantityProps {
    cartCounter?: boolean;
    cartProduct: CartProduct;
    handleQtyIncrement: () => void;
    handleQtyDecrement: () => void;
}

// using for button style
const btnStyle = `border-[1.2px] border-slate-300 px-2 rounded`




const SetQuantity = ({ cartCounter, cartProduct, handleQtyIncrement, handleQtyDecrement }: SetQuantityProps) => {
    return (
        <div className="flex gap-6 items-center " >
            {cartCounter ? null :
                <div className="font-semibold" >
                    QUANTITY:
                </div>
            }
            <div className="flex gap-2 items-center" >
                <button onClick={handleQtyDecrement} className={btnStyle} >-</button>
                <div>{cartProduct.quantity}</div>
                <button onClick={handleQtyIncrement} className={btnStyle}>+</button>
            </div>
        </div>
    )
}

export default SetQuantity
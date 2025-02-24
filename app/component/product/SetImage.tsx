"use client"

import { CartProduct, ProductImage } from "@/app/Types/Product";
import Image from "next/image";

interface SetImageProps {
    images: ProductImage[];
    cartProduct: CartProduct;
    handleColorSelect: (value: ProductImage) => void;

}

const SetImage = ({ images, cartProduct, handleColorSelect }: SetImageProps) => {
    // console.log(cartProduct.selectedImg.image);

    return (
        <>
            <div className="grid grid-cols-6 gap-2 h-full max-h-[500px] min-h-[300px] sm:min-h-[400px] ">
                <div className="flex flex-col items-center justify-center gap-2 cursor-pointer h-full max-h-[500px] min-h-[300px] sm:min-h-[400px] border border-slate-300 ">
                    {images.map((image) => {
                        // console.log(image)
                        return (
                            <div key={image.image} className={`p-2 relative w-[80%] aspect-square rounded border-teal-300 ${cartProduct?.selectedImg?.color == image.color ? "border-[1.5px]" : "border-none"}  `} onClick={() => handleColorSelect(image)} >
                                <Image src={image.image} fill alt="image" className={`object-contain  `} sizes="100"  />
                            </div>
                        )
                    })}
                </div>
                <div className="col-span-5" >
                    <div className="relative h-full w-full mx-auto" >
                        <Image src={cartProduct.selectedImg?.image} fill alt={cartProduct?.selectedImg?.color} className="object-contain" sizes="100"  />
                    </div>
                </div>
            </div>
        </>
    )
}

export default SetImage; 
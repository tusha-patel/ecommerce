import { ProductImage, CartProduct } from "@/app/Types/Product";


interface SetColorProps {
    images: ProductImage[];
    cartProduct: CartProduct;
    handleColorSelect: (value: ProductImage) => void;
}



function SetColor({ images, cartProduct, handleColorSelect }: SetColorProps) {
    return (
        <div className="flex gap-4 items-center " >
            <span className="font-semibold" >COLOR: </span>
            <div className="flex items-center gap-1 " >
                {images?.map((image) => {
                    return (
                        <div key={image.color} onClick={() => handleColorSelect(image)}
                            className={`h-7 w-7 rounded-full border-teal-300 flex items-center justify-center
                            ${cartProduct.selectedImg?.color == image.color ? "border-[1.5px]" : "border-none"}`
                            } >
                        
                            <div style={{ background: image.colorCode }} className="h-5 w-5  rounded-full cursor-pointer border-slate-300 border-[1.2px] " ></div>
                        </div>
                    )
                })}</div>
        </div >
    )
}

export default SetColor
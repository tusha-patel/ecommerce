"use client"
import { Product } from "@/app/Types/Product";
import { FormatPrice } from "@/app/Utils/FormatPrice";
import { TruncateText } from "@/app/Utils/TruncateText";
import { Rating } from "@mui/material";
import Image from "next/image"
import { useRouter } from "next/navigation";

interface ProductCadProps {
    data: Product;
}
interface Items {
    id: string;
    userId: string;
    rating?: number;
}



const ProductCard = ({ data }: ProductCadProps) => {
    const productRating = data.reviews.reduce((acc: number, item: Items) => acc + (item.rating || 0), 0) / data.reviews.length
    // console.log(productRating);
    const routes = useRouter();

    return (
        <div className="col-span-1 cursor-pointer border-[1.2px] border-slate-200 bg-slate-50 rounded-sm p-2 transition hover:scale-105 text-center text-sm "
            onClick={() => routes.push(`/product/${data.id}`)} >
            <div className="flex flex-col items-center w-full gap-1 ">
                <div className="aspect-square overflow-hidden relative w-full h-full " >
                    <Image fill src={data.images[0].image} className="object-contain" alt={data.name} priority sizes="100"  />
                </div>
                <div className="mt-4">
                    {TruncateText(data.name)}
                </div>
                <div>
                    <Rating value={productRating} readOnly />
                </div>
                <div>{data.reviews.length}Reviews</div>
                <div className="font-semibold" >{FormatPrice(data.price)}</div>
            </div>
        </div>
    )
}

export default ProductCard
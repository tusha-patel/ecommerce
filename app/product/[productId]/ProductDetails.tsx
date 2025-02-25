/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import Button from "@/app/component/Button";
import SetColor from "@/app/component/product/SetColor";
import SetImage from "@/app/component/product/SetImage";
import SetQuantity from "@/app/component/product/SetQuantity";
import { CartProduct, Product, ProductImage } from "@/app/Types/Product";
import { UseCart } from "@/hooks/UseCart";
import { Rating } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { MdCheckCircle } from "react-icons/md";

// product type define
interface ProductDetailsProps {
    product: Product;
}

const Horizontal = () => {
    return <hr className="w-[30%] my-2" />
}

export const ProductDetails = ({ product }: ProductDetailsProps) => {
    const router = useRouter();
    const { handleAddProductToCart, cartProducts } = UseCart()
    const qty: number = 1;
    const [isProductInCart, setIsProductInCart] = useState<boolean>(false)

    const [cartProduct, setCartProduct] = useState<CartProduct>(
        {
            id: product.id,
            name: product.name,
            description: product.description,
            category: product.category,
            brand: product.brand,
            selectedImg: { ...product.images[0] },
            quantity: qty,
            price: product.price,
        });

    // find product is include the cart
    useEffect(() => {
        setIsProductInCart(false);

        if (cartProducts) {
            const existingIndex = cartProducts.findIndex((item) => item.id == product.id);
            if (existingIndex > -1) {
                setIsProductInCart(true)
            }
        }
    }, [cartProducts]);


    // handle color select
    const handleColorSelect = useCallback((value: ProductImage) => {
        setCartProduct((prev) => {
            // console.log(value);
            return { ...prev, selectedImg: value }
        })
    }, [cartProduct?.selectedImg]);

    // handle quantity increment
    const handleQtyIncrement = useCallback(() => {
        setCartProduct((prev) => {
            if (prev.quantity == 99) {
                return prev
            }
            return { ...prev, quantity: prev.quantity + 1 }
        })
    }, [cartProduct?.selectedImg]);

    // handle quantity decrement
    const handleQtyDecrement = useCallback(() => {
        setCartProduct((prev) => {
            if (prev.quantity == 1) {
                return prev
            } else {
                return { ...prev, quantity: prev.quantity - 1 }
            }

        })
    }, [])

    const ProductRating = product.reviews.reduce((acc, items) => acc + (items.rating || 0), 0) / product.reviews.length;
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12  ">
            <div>
                <SetImage images={product.images} cartProduct={cartProduct} handleColorSelect={handleColorSelect} />
            </div>
            <div className="flex flex-col gap-1 text-slate-500 text-sm " >
                <h2 className="text-3xl font-medium text-slate-700" >{product.name}</h2>
                <div className="flex items-center gap-2 ">
                    <Rating value={ProductRating} readOnly />
                    <div>{[product.reviews.length]} reviews</div>
                </div>
                <Horizontal />
                <div className="text-justify" >
                    {product.description}
                </div>
                <Horizontal />
                <div>
                    <span className="font-semibold" >CATEGORY : {product.category} </span>
                </div>
                <div>
                    <span className="font-semibold" >BRAND : {product.brand} </span>
                </div>
                <div>
                    <span className={product.inStock ? "text-teal-500" : "text-rose-500"} > {product.inStock ? "in stock" : "out of stock"} </span>
                </div>
                <Horizontal />
                {isProductInCart ? <>
                    <p className="mb-2 flex items-center gap-1" >
                        <MdCheckCircle className="text-teal-500" size={20} />
                        <span>Product added to cart</span>
                    </p>

                    <div className="max-w-[300px]">
                        <Button label="View cart" outline onClick={() => router.push("/cart")} />
                    </div>                </> : <>
                    <SetColor cartProduct={cartProduct} images={product.images} handleColorSelect={handleColorSelect} />
                    <Horizontal />
                    <SetQuantity cartProduct={cartProduct} handleQtyIncrement={handleQtyIncrement} handleQtyDecrement={handleQtyDecrement} />
                    <Horizontal />
                    <div className="max-w-[300px]" >
                        <Button
                            label="Add to cart"
                            onClick={() => {handleAddProductToCart(cartProduct)}}
                        />
                    </div>
                </>}
            </div>
        </div>
    );
};
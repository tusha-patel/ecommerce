"use client"

import Button from "@/app/component/Button";
import Heading from "@/app/component/Heading";
import Input from "@/app/component/inputs/Input";
import { safeUser } from "@/types";
import { Rating } from "@mui/material";
import { Order, Product, Review } from "@prisma/client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";



interface AddRatingProps {
    product: Product & {
        reviews: Review[]
    };
    user: (safeUser & {
        orders: Order[];
    }) | null | any;
}

const AddRating = ({ product, user }: AddRatingProps) => {

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            comment: "",
            rating: 0
        }
    });

    // set for custom value
    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldTouch: true,
            shouldDirty: true,
            shouldValidate: true
        })
    }


    // submit data

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log(data);
        setIsLoading(true);

        if (data.rating == 0) {
            setIsLoading(false);
            return toast.error("No rating selected");
        }

        const ratingData = { ...data, userId: user?.id, product: product }
        axios.post("/api/rating", ratingData).then(() => {
            toast.success("Rating submited");
            router.refresh();
            setCustomValue('rating', 0)
            reset();
        }).catch((error) => {
            console.log(error, "error from rating");

            toast.error("Something went wrong ");
        }).finally(() => {
            setIsLoading(false);
        })
    }

    if (!user || !product) {
        return null
    }


    const deliveredOrder = user?.order?.some((order: any) =>
        order.products.find((item: any) => item.id === product.id) && order?.deliveryStatus == "delivered")

    const userReviews = product?.reviews.find((review: Review) => {
        return review.userId === user.id
    });

    if (!deliveredOrder || !userReviews) return null


 
    return (
        <div className="flex flex-col gap-2 max-w-[500px] mt-10 " >
            <Heading title="Rate this product" />
            <Rating onChange={(event, newvalue) => {
                setCustomValue('rating', newvalue)
            }} />
            <Input id="comment" label="comment"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Button label={isLoading ? "Loading.." : "Rate product"} onClick={handleSubmit(onSubmit)} />
        </div>
    )
}

export default AddRating
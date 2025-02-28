"use client"

import Button from "@/app/component/Button"
import Heading from "@/app/component/Heading"
import CategoryInput from "@/app/component/inputs/CategoryInput"
import CustomCheckBox from "@/app/component/inputs/CustomCheckBox"
import Input from "@/app/component/inputs/Input"
import SelectColor from "@/app/component/inputs/SelectColor"
import TextArea from "@/app/component/inputs/TextArea"
import { categories } from "@/app/Utils/Categories"
import { colors } from "@/app/Utils/Colors"
import axios from "axios"
import { useRouter } from "next/navigation"
import React, { useCallback, useEffect, useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"

export type ImageType = {
    color: string;
    colorCode: string;
    image: File | null;
    publicId?: string;
}

export type UploadedImageType = {
    color: string;
    colorCode: string;
    image: string;
    publicId?: string;
}

const AddProductForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [images, setImages] = useState<ImageType[] | null>();
    const [isProductCreated, setIsProductCreated] = useState(false);
    const router = useRouter();
    // console.log(images);

    const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            description: "",
            brand: "",
            category: "",
            inStock: false,
            images: [],
            price: "",
        }
    });

    useEffect(() => {
        setCustomValue("images", images);
    }, [images]);

    useEffect(() => {
        if (isProductCreated) {
            reset();
            setImages(null);
            setIsProductCreated(false)
        }
    }, [isProductCreated]);

    const category = watch('category');

    // for set category value 
    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
        });
    }

    // add images
    const addImageToState = useCallback((value: ImageType) => {
        setImages((prev) => {
            if (!prev) {
                return [value]
            }
            return [...prev, value];
        });
    }, []);

    // remove images
    const removeImageFromState = useCallback((value: ImageType) => {
        setImages((prev) => {
            if (prev) {
                const filterImages = prev.filter((item) => item.color !== value.color)
                return filterImages;
            }
            return prev;
        })
    }, []);

    // upload image to cloudinary
    const uploadImageToCloudinary = async (image: File): Promise<{ url: string; public_id: string } | null> => {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);
        formData.append("folder", "ecommerce");

        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            return { url: data.secure_url, public_id: data.public_id }; // include public_id
        } catch (error) {
            console.error("Error uploading image to Cloudinary", error);
            toast.error("Image upload failed");
            return null;
        }
    };

    // submit the product data
    const onsubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);

        let uploadedImages: UploadedImageType[] = [];

        if (!data.category) {
            setIsLoading(false);
            return toast.error("Category is not selected!")
        }

        if (!data.images || data.images.length == 0) {
            setIsLoading(false);
            return toast.error("No selected image!");
        }

        for (const image of data.images) {
            if (image.image) {
                const uploadedImage = await uploadImageToCloudinary(image.image);
                if (uploadedImage) {
                    uploadedImages.push({
                        color: image.color,
                        colorCode: image.colorCode,
                        image: uploadedImage.url,       // the image URL
                        publicId: uploadedImage.public_id // the Cloudinary public_id
                    });
                }
                // console.log(uploadedImage);

            }
        }

        const productData = { ...data, images: uploadedImages };

        // create the product
        axios.post('/api/product', productData).then((res) => {
            // console.log(res);

            toast.success('product created');
            setIsProductCreated(true);
            uploadedImages = [];
            setImages(null)
            router.refresh();
        }).catch((error) => {
            console.log(error);
            toast.error("Something went wrong");
        }).finally(() => {
            setIsLoading(false);
        })

    }


    return (
        <>
            <Heading title="Add a product" center />
            <Input id="name" label="Name"
                disabled={isLoading}
                register={register}
                errors={errors}
                type="text"
                required
            />
            <Input id="price" label="Price"
                disabled={isLoading}
                register={register}
                errors={errors}
                type="number"
                required
            />
            <Input id="brand" label="Brand"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <TextArea id="description"
                label="Description"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <CustomCheckBox id="inStock" register={register} label="this product is in stock" />
            <div className="w-full font-medium " >
                <div className="mb-2 font-semibold ">Select category</div>
                <div className="grid grid-cols-2 md:grid-cols-3 max-h-[50vh] gap-3 overflow-y-auto " >
                    {categories?.map((item) => {
                        if (item.label == "All") {
                            return null
                        }
                        return <div key={item.label} className="col-span" >
                            <CategoryInput onClick={(category) => setCustomValue('category', category)}
                                selected={category === item.label}
                                label={item.label}
                                icon={item.icon}
                            />
                        </div>
                    })}
                </div>
            </div>
            <div className="w-full flex flex-col flex-wrap gap-4 " >
                <div className="font-bold" >
                    Select the available product colors and upload their images.
                </div>
                <div className="text-sm" >
                    You must  upload an image for each of the color selected otherwise your color selection will be ignored
                </div>
            </div>
            <div className="grid grid-cols-2 gap-3 " >
                {colors.map((item, index) => {
                    return <SelectColor key={index} item={item}
                        addImageToState={addImageToState}
                        removeImageFromState={removeImageFromState}
                        isProductCreated={false}
                    />
                })}
            </div>

            <Button label={isLoading ? "loading" : "Add product"} onClick={handleSubmit(onsubmit)} />
        </>
    )
}

export default AddProductForm
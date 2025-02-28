"use client"

import { useRouter } from "next/navigation";
import queryString from "query-string";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"

const SeacrchBar = () => {

    const router = useRouter();

    const { register, reset,
        handleSubmit,
        formState: { errors } } = useForm<FieldValues>({
            defaultValues: {
                searchTerm: ""
            }
        });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log(data);
        if (!data.searchTerm) return router.push('/');

        const url = queryString.stringifyUrl({
            url: "/",
            query: {
                searchTerm: data.searchTerm
            }
        }, { skipNull: true });

        router.push(url);
        reset();
    }



    return (
        <div className="flex items-center " >
            <input autoComplete="off" type="text" {...register("searchTerm")} placeholder="Expore E-shop" className=" px-3 py-2 border-[0.5px] border-gray-300 rounded-s-md focus:outline-none 
                focus:border-[0.5px] focus:border-slate-500 w-80
            "/>
            <button className="bg-slate-700 hover:opacity-80 text-white p-2 rounded-e-md" onClick={handleSubmit(onSubmit)} >Search</button>
        </div>
    )
}

export default SeacrchBar
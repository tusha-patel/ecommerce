"use client"

import { AiOutlineGoogle } from "react-icons/ai"
import Heading from "../component/Heading"
import Button from "../component/Button"
import Input from "../component/inputs/Input"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import Link from "next/link"
import { useEffect, useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { safeUser } from "@/types"


interface loginFormProps {
    currentUser: safeUser | null
}

const LoginForm = ({ currentUser }: loginFormProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();


    useEffect(() => {
        if (currentUser) {
            router.push("/cart");
            router.refresh();
        }
    }, []);



    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            email: "",
            password: "",
        }
    });


    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        // console.log(data);


        signIn("credentials", {
            ...data,
            redirect: false,
        }).then((callback) => {
            setIsLoading(false);

            if (callback?.ok) {
                router.push("/cart");
                router.refresh();
                toast.success("logged in");
            }
            if (callback?.error) {
                toast.error(callback.error);
            }
        })

    }


    if (currentUser) {
        return <p className="text-center">Logged in . Redirecting...</p>
    }


    return (
        <div className="flex flex-col gap-5" >
            <Heading title="Sing in to E-shop" />
            <Button outline label="Sing In With Google" icon={AiOutlineGoogle}
                onClick={() => { signIn('google') }}
            />
            <hr className="bg-slate-300 w-full h-px " />
            <Input id="email" label="Email" disabled={isLoading} register={register}
                errors={errors} required type="email"
            />
            <Input id="password" label="Password" disabled={isLoading} register={register}
                errors={errors} required type="password"
            />
            <Button label={isLoading ? "Loading" : "Sing In"} onClick={handleSubmit(onSubmit)} ></Button>
            <p className="text-sm text-center" >Do not Have an account ? <Link href={"/register"} className="underline" >
                Sing Up
            </Link> </p>
        </div>
    )
}

export default LoginForm
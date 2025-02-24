"use client"

import { useEffect, useState } from "react"
import Heading from "../component/Heading"
import Input from "../component/inputs/Input"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import Button from "../component/Button"
import Link from "next/link"
import { AiOutlineGoogle } from "react-icons/ai"
import axios from "axios"
import toast from "react-hot-toast"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { safeUser } from "@/types"
interface RegisterFormProps {
    currentUser: safeUser | null;
}

const RegisterForm = ({ currentUser }: RegisterFormProps) => {


    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (currentUser) {
            router.push("/cart");
            router.refresh();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        // console.log(data);

        axios.post("/api/register", data).then((res) => {
            console.log(res);

            if (res.data.response.status === 403) {
                toast.error(res.data.response.data)
            }


            toast.success("Account created");

            signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false
            }).then((callback) => {
                if (callback?.ok) {
                    router.push("/cart")
                    router.refresh()
                    toast.success('Logged In')
                }

                if (callback?.error) {
                    toast.error(callback.error)
                }
            }).catch((error) => {
                console.log(error);

                toast.error("something went wrong", error.message);
            }).finally(() => {
                setIsLoading(false);
            })
        });

    }

    if (currentUser) {
        return <p className="text-center">logged in. Redirecting...</p>
    }

    return (
        <div className=" flex flex-col gap-5" >
            <Heading title="Sing up for E-shop" />
            <Button label="Sing up with Google " outline icon={AiOutlineGoogle} onClick={() => { signIn('google') }} />
            <hr className="bg-slate-300 w-full h-px " />
            <Input id="name" label="Name" disabled={isLoading} register={register}
                errors={errors} required type="text"
            />
            <Input id="email" label="Email" disabled={isLoading} register={register}
                errors={errors} required type="email"
            />
            <Input id="password" label="Password" disabled={isLoading} register={register}
                errors={errors} required type="password"
            />
            <Button label={isLoading ? "Loading" : "Sing Up"} onClick={handleSubmit(onSubmit)} ></Button>
            <p className="text-sm text-center" >Already Have an account ? <Link href={"/login"} className="underline" >
                Log in
            </Link> </p>

        </div >
    )
}

export default RegisterForm
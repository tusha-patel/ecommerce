"use client"

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
    id: string;
    label: string;
    type?: string;
    disabled?: boolean;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;

}



const Input = ({ id, label, type, disabled, required, register, errors }: InputProps) => {
    return (
        <div className="w-[100%] relative " >
            <input type={type} id={id} autoComplete="off" style={{ width: "100%" }}
                className={`peer w-[100%] p-3 pt-5 outline-none
                bg-white font-light border-2 rounded-md transition 
                disabled:opacity-70 disabled:cursor-not-allowed
                ${errors[id] ? "border-rose-400" : "border-slate-300"}
                `} disabled={disabled} placeholder="" {...register(id, { required: required })} />
            {errors.label && <span>This field is required</span>}
            <label htmlFor={id} className={`absolute cursor-text duration-150 
            transform -translate-y-3 top-5 z-10 origin-[0] text-md
            left-4 peer-placeholder-shown:scale-100
            peer-placeholder-shown:translate-y-0
            peer-focus:scale-75
            peer-focus:-translate-y-4
            ${errors[id] ? "text-rose-500" : "text-slate-400"}`
            } >{label}</label>
        </div>
    )
}

export default Input
"use client"

import { UseCart } from "@/hooks/UseCart";
import { AddressElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { FormatPrice } from "../Utils/FormatPrice";
import toast from "react-hot-toast";
import Heading from "../component/Heading";
import Button from "../component/Button";

interface CheckoutFormProps {
    clientSecret: string;
    handleSetPaymentSuccess: (value: boolean) => void;
}


const CheckoutForm = ({ clientSecret, handleSetPaymentSuccess }: CheckoutFormProps) => {
    const { cartTotalAmount, clearCart, handleSetPaymentIntent } = UseCart();
    const [loading, setLoading] = useState(false);
    // console.log(handleSetPaymentSuccess);

    const stripe = useStripe()
    const elements = useElements();
    const formattedPrice = FormatPrice(cartTotalAmount);

    useEffect(() => {
        if (!stripe || !clientSecret) return;

        handleSetPaymentSuccess(false);
    }, [clientSecret]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        if (!stripe || !elements) {
            return
        }

        stripe.confirmPayment({
            elements,
            redirect: "if_required"
        }).then((result: any) => {
            console.log(result);

            if (!result.error) {
                toast.success("Checkout Success");

                handleSetPaymentSuccess(true);
                handleSetPaymentIntent(null);
                clearCart();
            } else {
                toast.error(result.error.message); // <-- Add error message
            }
            setLoading(false);
        })



    }


    return (
        <div>
            <form onSubmit={handleSubmit} id="payment-form"  >
                <div className="mb-6" >
                    <Heading title="Enter Your Details to complete checkout" />
                </div>
                <h2 className="font-semibold mb-2 mt-4 " >Address Information</h2>
                <AddressElement options={{
                    mode: "shipping",
                    allowedCountries: ["US", "KE"]

                }} />
                <h2 className="font-semibold mt-4 mb-2"> Payment information</h2>
                <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
                <div className="py-4 text-center text-slate-700 text-xl font-bold " >
                    Total:{formattedPrice}
                </div>
                <Button label={loading ? "Processing" : "Pay Now"}
                    disabled={loading || !stripe || !elements}
                    onClick={() => { }} />
            </form>
        </div>
    )
}

export default CheckoutForm
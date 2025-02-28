"use client"
import React, { useCallback } from 'react'

import { UseCart } from '@/hooks/UseCart'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import CheckoutForm from './CheckoutForm';
import Button from '../component/Button';



const CheckoutClients = () => {
    const { cartProducts, paymentIntent, handleSetPaymentIntent } = UseCart();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [clientSecret, setClientSecret] = useState<string>("")
    const router = useRouter();
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    console.log(paymentSuccess);

    // console.log(loading, error, clientSecret);

    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);



    useEffect(() => {
        // create a paymentIntent as soon as the page  toads
        if (cartProducts) {
            setLoading(true);
            setError(false);

            fetch("/api/create-payment-intent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    items: cartProducts,
                    payment_intent_id: paymentIntent
                })
            }).then((res) => {
                setLoading(false);
                if (res.status == 401) {
                    return router.push("/login");
                }

                return res.json();
            }).then((data) => {
                console.log(data);
                setClientSecret(data.paymentIntent.client_secret);
                handleSetPaymentIntent(data.paymentIntent.id)
                setLoading(false);
                setError(false);

            }).catch((error) => {
                console.log(error);
                setError(true)
                toast.error("something went wrong ", error.message)
            });
        }
    }, [cartProducts, paymentIntent])

    const options: StripeElementsOptions = {
        clientSecret,
        appearance: {
            theme: 'stripe',
            labels: "floating"
        }
    }


    const handleSetPaymentSuccess = useCallback((value: boolean) => {
        setPaymentSuccess(value)
    }, [])

    return (
        <div className="w-full">
            {clientSecret && cartProducts && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm clientSecret={clientSecret}
                        handleSetPaymentSuccess={handleSetPaymentSuccess} />
                </Elements>
            )}
            {loading && !paymentSuccess && <div className='text-center'>Loading checkout...</div>}
            {error && !paymentSuccess && <div className='text-center text-rose-500'>Something went wrong</div>}
            {paymentSuccess && (
                <div className='flex flex-col items-center gap-4'>
                    <div className='text-teal-500 text-center'>Payment Success</div>
                    <div className='max-w-[220px] w-full'>
                        <Button label='View your order' onClick={() => router.push("/orders")} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default CheckoutClients
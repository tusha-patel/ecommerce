import { CartProduct } from "@/app/Types/Product";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

type CartContextType = {
    cartTotalQty: number;
    cartProducts: CartProduct[] | null;
    cartTotalAmount: number;
    handleAddProductToCart: (product: CartProduct) => void;
    handleRemoveProductFromCart: (product: CartProduct) => void;
    handleQtyIncrement: (product: CartProduct) => void;
    handleQtyDecrement: (product: CartProduct) => void;
    clearCart: () => void;
    paymentIntent: string | null;
    handleSetPaymentIntent: (val: string | null) => void;
}

// create context
const CartContext = createContext<CartContextType | null>(null)

// context provider interface
interface Props {
    [propName: string]: unknown;
}

// context provider
export const CartContextProvider = (props: Props) => {
    const [cartTotalQty, setCartTotalQty] = useState(0);
    const [cartTotalAmount, setCartTotalAmount] = useState(0);
    const [cartProducts, setCartProducts] = useState<CartProduct[] | null>(null);
    const [paymentIntent, setPaymentIntent] = useState<string | null>(null)




    // find cart items in localStorage
    useEffect(() => {
        const getCartItems: string | null = localStorage.getItem("CartItems");
        const CartItems: CartProduct[] = getCartItems ? JSON.parse(getCartItems) : [];
        setCartProducts(CartItems);

        // payment data get
        const eShopPaymentIntent: any = localStorage.getItem("eShopPaymentIntent")
        const paymentIntent: string | null = JSON.parse(eShopPaymentIntent)
        setPaymentIntent(paymentIntent);
    }, []);


    // set the payment in localstorage
    const handleSetPaymentIntent = useCallback((val: string | null) => {
        setPaymentIntent(val);
        localStorage.setItem("eShopPaymentIntent", JSON.stringify(val))
    }, [paymentIntent])

    const handleAddProductToCart = useCallback((product: CartProduct) => {
        // console.log(product);
        setCartProducts((prev) => {
            let updatedCart;
            if (prev) {
                updatedCart = [...prev, product]
            } else {
                updatedCart = [product]
            }
            localStorage.setItem("CartItems", JSON.stringify(updatedCart));
            return updatedCart;
        })
        toast.success("product added to cart")
    }, [])


    // remove cart items
    const handleRemoveProductFromCart = useCallback((product: CartProduct) => {

        if (cartProducts) {
            const filterCartProduct = cartProducts?.filter((item) => {
                return item.id !== product.id
            });
            setCartProducts(filterCartProduct)
            localStorage.setItem("CartItems", JSON.stringify(filterCartProduct));
        }
        toast.success("product remove to cart");
    }, [cartProducts])


    // for quantity increase
    const handleQtyIncrement = useCallback((product: CartProduct) => {
        let updateCart;
        if (product.quantity === 99) {
            return toast.error("Oops ! maximum reached  ")
        }

        if (cartProducts) {
            updateCart = [...cartProducts]
            const existingIndex = cartProducts.findIndex((item) => item.id == product.id)
            if (existingIndex > -1) {
                updateCart[existingIndex].quantity = ++updateCart[existingIndex].quantity
            }
            setCartProducts(updateCart);
            localStorage.setItem("CartItems", JSON.stringify(updateCart));
        }

    }, [cartProducts]);

    const handleQtyDecrement = useCallback((product: CartProduct) => {
        let updateCart;
        if (product.quantity == 1) {
            return toast.error("OOps ! minimum reached ")
        }

        if (cartProducts) {
            updateCart = [...cartProducts];

            const existingIndex = cartProducts.findIndex((item) => item.id == product.id);

            if (existingIndex > -1) {
                updateCart[existingIndex].quantity = --updateCart[existingIndex].quantity
            }
            setCartProducts(updateCart);
            localStorage.setItem("CartItems", JSON.stringify(updateCart));
        }




    }, [cartProducts]);

    // all product clear to cart
    const clearCart = useCallback(() => {
        setCartProducts([]);
        setCartTotalQty(0)
        toast.success("All product remove to cart")
        localStorage.setItem("CartItems", JSON.stringify(null));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cartProducts]);

    // total price to cart
    useEffect(() => {
        const getTotals = () => {
            if (cartProducts) {
                const { total, qty } = cartProducts?.reduce((acc, item) => {
                    const itemTotal = item.price * item.quantity;
                    acc.total += itemTotal
                    acc.qty += item.quantity

                    return acc
                }, {
                    total: 0,
                    qty: 0,
                });
                setCartTotalQty(qty);
                setCartTotalAmount(total);
            }
        }
        getTotals()
    }, [cartProducts])


    const value = {
        cartTotalQty,
        cartProducts,
        handleAddProductToCart,
        handleRemoveProductFromCart,
        handleQtyIncrement,
        handleQtyDecrement,
        clearCart,
        cartTotalAmount,
        paymentIntent,
        handleSetPaymentIntent,
    }

    return <CartContext.Provider value={value} {...props} />
}

// use context created
export const UseCart = () => {
    const context = useContext(CartContext);

    if (context === null) {
        throw new Error("useCart must be used within a cartContext Provider")
    }
    return context
}
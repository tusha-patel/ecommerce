"use client"

import { Order, Product, User } from "@prisma/client"
import { useEffect, useState } from "react";
import Heading from "../component/Heading";
import { FormatPrice } from "../Utils/FormatPrice";
import { formatNumber } from "../Utils/formatNumber";

interface SummaryProps {
    orders: Order[];
    products: Product[];
    users: User[] | null;
}

type SummaryDataType = {
    [key: string]: {
        label: string;
        digit: number;
    }
}

const Summary = ({ products, orders, users }: SummaryProps) => {
    const [summaryData, setSummaryData] = useState<SummaryDataType>({
        sale: {
            label: "Total Sale",
            digit: 0
        },
        products: {
            label: "Total products",
            digit: 0
        },
        orders: {
            label: "Total orders",
            digit: 0
        },
        paidOrders: {
            label: "Total paidOrders",
            digit: 0
        },
        unpaidOrders: {
            label: "Total unpaidOrders",
            digit: 0
        },
        users: {
            label: "Total users",
            digit: 0
        },
    });


    useEffect(() => {
        setSummaryData((prev) => {
            let tempData = { ...prev }
            const totalSale = orders.reduce((acc, item) => {
                if (item.status == "complete") {
                    return acc + item.amount;
                } else return acc
            }, 0);

            const paidOrders = orders.filter((order) => {
                return order.status == "complete"
            });

            const unpaidOrders = orders.filter((order) => {
                return order.status == "pending"
            });

            tempData.sale.digit = totalSale;
            tempData.orders.digit = orders.length;
            tempData.paidOrders.digit = paidOrders.length;
            tempData.unpaidOrders.digit = unpaidOrders.length;
            tempData.products.digit = products.length;
            tempData.users.digit = users?.length || 0;
            return tempData
        })
    }, [orders, products, users]);


    // convert object to array
    const summaryKeys = Object.keys(summaryData);
    // console.log(summaryKeys);
     
    return (
        <div className="max-w-[1150px] m-auto " >
            <div className="mb-4 mt-8 ">
                <Heading title="Status" center />
            </div>
            <div className="grid grid-cols-2 gap-3 max-h-50vh overflow-y-auto ">
                {
                    summaryData && summaryKeys?.map((key) => {
                        return <div key={key} className="rounded-xl border-2 p-4
                        flex flex-col items-center gap-2 transition
                        " >
                            <div className="text-xl md:text-4xl font-bold ">
                                {summaryData[key].label == "Total Sale" ?
                                    <>{FormatPrice(summaryData[key].digit)}</> :
                                    <>{formatNumber(summaryData[key].digit)}</>
                                }
                            </div>
                            <div>{summaryData[key].label}</div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default Summary;
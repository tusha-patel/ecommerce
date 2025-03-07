"use client"

import ActionBtn from "@/app/component/ActionBtn";
import Heading from "@/app/component/Heading";
import Status from "@/app/component/Status";
import { FormatPrice } from "@/app/Utils/FormatPrice";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Order, User } from "@prisma/client"
import moment from "moment";
import { useRouter } from "next/navigation";
import { MdAccessTimeFilled, MdDeliveryDining, MdDone, MdRemoveRedEye } from "react-icons/md";


interface ManageOrderClientProps {
    orders: ExtendedOrders[];
}

type ExtendedOrders = Order & {
    user: User
}

const OrderClient = ({ orders }: ManageOrderClientProps) => {
    // console.log(orders);

    const router = useRouter();
    let rows: any = [];

    if (orders) {
        rows = orders?.map((order) => {
            // console.log(order.deliveryStatus);
            return {
                id: order.id,
                customer: order.user.name,
                amount: FormatPrice(order.amount / 100),
                deliveryStatus: order.deliveryStatus,
                paymentStatus: order.status,
                date: moment(order.createData).fromNow(),
            }
        })
    }

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 220 },
        { field: "customer", headerName: "Customer Name", width: 130 },
        {
            field: "Amount", headerName: "Amount", width: 130,
            renderCell: (params) => {
                return (
                    <div className="font-bold text-slate-800 " >{params.row.amount} </div>
                )
            }
        },
        {
            field: "deliveryStatus", headerName: "DeliveryStatus", width: 170,
            renderCell: (params) => {
                return (
                    <div className="flex justify-between gap-4 items-center h-full w-full ">
                        {params.row.deliveryStatus == "pending" ? (
                            <Status text="pending" icon={MdAccessTimeFilled}
                                bg="bg-slate-200"
                                color="text-slate-700"
                            />
                        ) : params.row.deliveryStatus == "dispatched" ? (
                            <Status text="dispatched" icon={MdDeliveryDining} bg="bg-purple-200" color="text-purple-700" />
                        ) : params.row.deliveryStatus == "delivered" ? (
                            <Status text="delivered" icon={MdDone} bg="bg-green-200" color="text-green-700" />
                        ) :
                            <>
                            
                            </>
                        }
                    </div>
                )
            }
        },
        {
            field: "paymentStatus", headerName: "PaymentStatus", width: 170,
            renderCell: (params) => {
                return (
                    <div className="flex justify-between gap-4 items-center h-full w-full ">
                        {params.row.paymentStatus == "pending" ? (
                            <Status text="pending" icon={MdAccessTimeFilled}
                                bg="bg-slate-200"
                                color="text-slate-700"
                            />
                        ) : params.row.paymentStatus == "complete" ? (
                            <Status text="completed" icon={MdDeliveryDining} bg="bg-green-200" color="text-green-700" />
                        ) :
                            <>
                            </>
                        }
                    </div>
                )
            }
        },
        { field: "date", headerName: "date", width: 150 },

        {
            field: "actions", headerName: "Actions", width: 200, renderCell: (params) => {
                return (
                    <>
                        <div className="flex justify-between gap-4 items-center h-full w-full " >
                            <ActionBtn icon={MdRemoveRedEye} onClick={() => { router.push(`/order/${params.row.id}`) }} />
                        </div>
                    </>
                )
            }
        }

    ]

    return (
        <div className="max-w-[1150px] m-auto text-xl " >
            <div className="mb-4 mt-8 ">
                <Heading title="Your order" center />
            </div>
            <div style={{ height: 600, width: "100%" }} >
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{ pagination: { paginationModel: { page: 0, pageSize: 9 } } }}
                    pageSizeOptions={[9, 20]}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </div>
        </div>
    )
}

export default OrderClient
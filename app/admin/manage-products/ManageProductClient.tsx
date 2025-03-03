"use client"

import { Product } from "@prisma/client"
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Paper } from "@mui/material";
import { FormatPrice } from "@/app/Utils/FormatPrice";
import Heading from "@/app/component/Heading";
import Status from "@/app/component/Status";
import { MdCached, MdClose, MdDelete, MdDone, MdRemoveRedEye } from "react-icons/md";
import ActionBtn from "@/app/component/ActionBtn";
import { useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
interface ManageProductClientProps {
    products: Product[]
}

const ManageProductClient = ({ products }: ManageProductClientProps) => {
    // console.log(products);
    const router = useRouter();
    let rows: any = []

    if (products) {
        rows = products.map((product) => {
            return {
                id: product.id,
                name: product.name,
                price: FormatPrice(product.price),
                category: product.category,
                brand: product.brand,
                inStock: product.inStock,
                images: product.images,
            }
        })
    }


    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 220 },
        { field: "name", headerName: "Name", width: 220 },
        {
            field: "price", headerName: "Price(USD)", width: 100,
            renderCell: (params) => {
                return (
                    <div className="font-bold text-slate-800  " >{params.row.price}</div>
                )
            }
        },
        { field: "category", headerName: "Category", width: 100 },
        { field: "brand", headerName: "Brand", width: 100 },
        {
            field: "inStock", headerName: "inStock", width: 120,
            renderCell: (params) => {
                return (
                    <div className="flex items-center gap-4 h-full w-full">
                        {params.row.inStock == true ? <Status text="in stock"
                            bg="bg-teal-200"
                            color="text-teal-700"
                            icon={MdDone} /> : <Status text="out of stock"
                                bg="bg-rose-200"
                                color="text-rose-700"
                                icon={MdClose} />}
                    </div>
                )
            }
        },
        {
            field: "actions", headerName: "Actions", width: 200, renderCell: (params) => {
                return (
                    <>
                        <div className="flex justify-between gap-4 items-center h-full w-full " >
                            <ActionBtn icon={MdCached} onClick={() => { handleToggleStock(params.row.id, params.row.inStock) }} />
                            <ActionBtn icon={MdDelete} onClick={() => {
                                const publicIds = params.row.images.map((image: { publicId: string }) => image.publicId);
                                handleProductDelete(params.row.id, publicIds);
                            }} />
                            <ActionBtn icon={MdRemoveRedEye} onClick={() => {router.push(`/product/${params.row.id}`) }} />
                        </div>
                    </>
                )
            }
        }

    ]

    // for stock functionality 
    const handleToggleStock = useCallback((id: string, inStock: boolean) => {
        axios.put("/api/product", {
            id,
            inStock: !inStock,
        }).then((res) => {
            toast.success("product status changed");
            router.refresh();
        }).catch((error: any) => {
            console.log(error);

            toast.error(" Oops ! something went wrong")
        })


    }, []);

    const handleProductDelete = useCallback((id: string, publicIds: string[]) => {
        axios.delete(`/api/product/${id}`, { data: { publicIds } }) // send the Cloudinary image ids
            .then(() => {
                toast.success("Product deleted successfully");
                router.refresh();
            }).catch((error: any) => {
                console.log(error);
                toast.error("Oops! Something went wrong");
            });
    }, [])


    return (
        <div className="max-w-[1150px] m-auto text-xl  " >
            <div className="mb-4 pt-8" >
                <Heading title="Manage Products" center />
            </div>

            <Paper>
                <div style={{ height: 600, width: "100%" }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 10 }
                            }
                        }}
                        disableRowSelectionOnClick
                        pageSizeOptions={[9, 20]}
                        checkboxSelection
                    />
                </div>
            </Paper>
        </div>
    )
}

export default ManageProductClient
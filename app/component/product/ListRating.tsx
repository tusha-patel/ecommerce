// import {   } from "@/app/Types/Product"
import Heading from "../Heading";
import moment from "moment";
import { Rating } from "@mui/material";
import Avatar from "../Avatar";



interface ListRatingProps {
    product: any;
}

const ListRating = ({ product }: ListRatingProps) => {
    // console.log(product);
    if (product.reviews.length == 0) return null;
    return (
        <div className="mt-4">
            <Heading title="Product review" />
            <div className="text-sm mt-2 " >
                {product.reviews && product.reviews?.map((review: any) => {
                    return (
                        <div key={review.id} className="max-w-[400px]" >
                            <div className="flex gap-3 items-center " >
                                <Avatar src={review.user?.image} />
                                <div className="font-semibold" >{review.user?.name}</div>
                                <div>{moment(review.createdDate).fromNow()}</div>
                            </div>
                            <div className="mt-2">
                                <Rating value={review.rating} readOnly />
                                <div className="mt-2">
                                    {review.comment}
                                </div>
                                <hr className="my-4" />
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}


export default ListRating;
import Container from "@/app/component/Container";
import { ProductDetails } from "./ProductDetails";
// import { Product as ProductDetail } from "@/app/Utils/Product";
import ListRating from "@/app/component/product/ListRating";
// import { products } from "@/app/Utils/Products";
import getProductById from "@/actions/getProductById";
import NullData from "@/app/component/NullData";
import AddRating from "./AddRating";
import { getCurrentUser } from "@/actions/getCurrentUser";


interface IParams {
    productId?: string;
}

const Product = async ({ params }: { params: IParams }) => {
    // const { productId } = params;
    // const product = products.find((item) => item.id === productId);
    const product = await getProductById(params);
    const user = await getCurrentUser();

    if (!product) {
        return <NullData title="Oops ! product with the given id does not exsit" />
    }

    return (
        <div className="p-3 sm:p-8">
            <Container>
                {product ? (
                    <>
                        <ProductDetails product={product} />
                        <div className="flex flex-col gap-3  " >
                            <AddRating product={product} user={user} />
                            <ListRating product={product} />
                        </div>
                    </>
                ) : (
                    <p>Product not found</p>
                )}
            </Container>
        </div>
    );
};

export default Product;

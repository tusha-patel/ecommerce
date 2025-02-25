import Container from "@/app/component/Container";
import { ProductDetails } from "./ProductDetails";
// import { Product as ProductDetail } from "@/app/Utils/Product";
import ListRating from "@/app/component/product/ListRating";
import { products } from "@/app/Utils/Products";


interface IParams {
    productId?: string;
}

const Product = async ({ params }: { params: IParams }) => {
    const { productId } = params;
    const product = products.find((item) => item.id === productId);

    return (
        <div className="p-3 sm:p-8">
            <Container>
                {product ? (
                    <>
                        <ProductDetails product={product} />
                        <div>
                            <div>Add rating</div>
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

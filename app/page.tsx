import Container from "./component/Container";
import HomeBanner from "./component/HomeBanner";
import ProductCard from "./component/product/ProductCard";
import { products } from "./Utils/Products";
import { Product as ProductType } from "@/app/Types/Product";


export default function Home() {
  return (
    <div className="p-4 sm:p-8 ">
      <Container>
        <HomeBanner />
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 ">
          {products?.map((product: ProductType) => {
            return (
              <ProductCard data={product} key={product.id} />
            )
          })}
        </div>
      </Container>
    </div>
  );
}

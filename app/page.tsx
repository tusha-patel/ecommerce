export const revalidate = 0;

import getProducts, { ProductPrisma } from "@/actions/getProducts";
import Container from "./component/Container";
import HomeBanner from "./component/HomeBanner";
import ProductCard from "./component/product/ProductCard";
import NullData from "./component/NullData";
// import { products } from "./Utils/Products";
// import { Product as ProductType } from "@/app/Types/Product";


interface HomeProps {
  searchParams: ProductPrisma;
}

export default async function Home({ searchParams }: HomeProps) {

  const products = await getProducts(searchParams);
  // console.log(products);

  if (products.length == 0) {
    return <NullData title="Oops ! No product found . click 'All' to clear filters " />
  }

  // fisher-yates shuffle algorithm


  function shuffleArray(array: any) {
    for (let i = array.lenght - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], [array[i]]];
    }
    return array;
  }

  const shuffleProduct = shuffleArray(products)



  return (
    <div className="p-4 sm:p-8 ">
      <Container>
        <HomeBanner />
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 ">
          {shuffleProduct?.map((product: any) => {
            return (
              <ProductCard data={product} key={product.id} />
            )
          })}
        </div>
      </Container>
    </div>
  );
}

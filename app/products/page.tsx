import { getProducts } from "../../services/products.service";

import ProductsClient from "./ProductsClient";

export default async function Page() {
  const products = await getProducts();

  return <ProductsClient products={products} />;
}

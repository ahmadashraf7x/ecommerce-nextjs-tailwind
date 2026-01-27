import { getCategories, getProducts } from "../../services/products.service";

import ProductsClient from "./ProductsClient";

export default async function Page() {
  const products = await getProducts();
  const categories = await getCategories();


  return <ProductsClient products={products} categories={categories} />;
}

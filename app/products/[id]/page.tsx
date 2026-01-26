import { getProductById } from "../../../services/products.service";
import ProductDetailsClient from "./ProductDetailsClient";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const product = await getProductById(Number(id));

  return <ProductDetailsClient product={product} />;
}

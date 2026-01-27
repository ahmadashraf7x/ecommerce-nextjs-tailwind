import { getProductById } from "../../../services/products.service";
import { notFound } from "next/navigation";

import ProductDetailsClient from "./ProductDetailsClient";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const product = await getProductById(Number(id));

   if (!product) {
    notFound();
  }

  return <ProductDetailsClient product={product} />;
}

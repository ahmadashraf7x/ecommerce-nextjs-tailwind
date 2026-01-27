import { getProductById } from "../../../services/products.service";
import { notFound } from "next/navigation";

import ProductDetailsClient from "./ProductDetailsClient";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;


  const numericId = Number(id);

  if (Number.isNaN(numericId)) {
    notFound();
  }

  const product = await getProductById(numericId);
  if (!product) {
    notFound();
  }

  return <ProductDetailsClient product={product} />

}

import { Product } from "../types/product";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export async function getProductById(id: number): Promise<Product | null> {
  const res = await fetch(`${BASE_URL}/products/${id}`, { cache: "no-store" });

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error("API error");
  }

  const text = await res.text();

  // API غبي: رجّع 200 بس body فاضي
  if (!text || text === "null" || text === "{}") {
    return null;
  }

  return JSON.parse(text);
}

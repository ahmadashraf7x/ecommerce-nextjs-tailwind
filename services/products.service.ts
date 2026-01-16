import { Product } from "../types/product";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products`);

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export async function getProductById(id: string | number): Promise<Product | null> {
  const res = await fetch(`${BASE_URL}/products/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  const text = await res.text();

  if (!text) {
    return null;
  }

  return JSON.parse(text);
}
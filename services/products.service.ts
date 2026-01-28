import { Product } from "../types/product";

// const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const BASE_URL = "https://dummyjson.com";

function mapDummyProductToProduct(p: any): Product {
  return {
    id: p.id,
    title: p.title,
    description: p.description,
    price: p.price,
    category: p.category,
    image: p.thumbnail,
  };
}

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();


  return data.products.map(mapDummyProductToProduct);
}

export async function getProductById(id: number): Promise<Product | null> {
  const res = await fetch(`${BASE_URL}/products/${id}`, { cache: "no-store" });

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  const data = await res.json();

  if (!data || !data.id) {
    return null;
  }

  return mapDummyProductToProduct(data);
}

export async function getCategories(): Promise<{ slug: string; name: string }[]> {
  const res = await fetch(`${BASE_URL}/products/categories`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  const data: { slug: string; name: string; url: string }[] = await res.json();

  return data.map((cat) => ({
    slug: cat.slug,
    name: cat.name,
  }));
}
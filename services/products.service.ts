// import { Product } from "../types/product";

// const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// if (!BASE_URL) {
//   throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
// }

// function mapDummyProductToProduct(p: any): Product {
//   return {
//     id: p.id,
//     title: p.title,
//     description: p.description,
//     price: p.price,
//     category: p.category,
//     image: p.thumbnail,
//   };
// }

// export async function getProducts(): Promise<Product[]> {
//   const res = await fetch(`${BASE_URL}/products`, { cache: "no-store" });

//   if (!res.ok) {
//     throw new Error("Failed to fetch products");
//   }

//   const data = await res.json();


//   return data.products.map(mapDummyProductToProduct);
// }

// export async function getProductById(id: number): Promise<Product | null> {
//   const res = await fetch(`${BASE_URL}/products/${id}`, { cache: "no-store" });

//   if (res.status === 404) {
//     return null;
//   }

//   if (!res.ok) {
//     throw new Error("Failed to fetch product");
//   }

//   const data = await res.json();

//   if (!data || !data.id) {
//     return null;
//   }

//   return mapDummyProductToProduct(data);
// }

// export async function getCategories(): Promise<{ slug: string; name: string }[]> {
//   const res = await fetch(`${BASE_URL}/products/categories`, { cache: "no-store" });

//   if (!res.ok) {
//     throw new Error("Failed to fetch categories");
//   }

//   const data: { slug: string; name: string; url: string }[] = await res.json();

//   return data.map((cat) => ({
//     slug: cat.slug,
//     name: cat.name,
//   }));
// }

import { Product } from "../types/product";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://dummyjson.com";

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
  try {
    const res = await fetch(`${BASE_URL}/products`, {
      cache: "no-store",
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error("Failed to fetch products:", res.status);
      return [];
    }

    const data = await res.json();

    if (!data || !data.products) {
      return [];
    }

    return data.products.map(mapDummyProductToProduct);
  } catch (error) {
    console.error("getProducts error:", error);
    return [];
  }
}

export async function getProductById(id: number): Promise<Product | null> {
  try {
    const res = await fetch(`${BASE_URL}/products/${id}`, {
      cache: "no-store",
      next: { revalidate: 60 },
    });

    if (res.status === 404) {
      return null;
    }

    if (!res.ok) {
      console.error("Failed to fetch product:", res.status);
      return null;
    }

    const data = await res.json();

    if (!data || !data.id) {
      return null;
    }

    return mapDummyProductToProduct(data);
  } catch (error) {
    console.error("getProductById error:", error);
    return null;
  }
}

export async function getCategories(): Promise<{ slug: string; name: string }[]> {
  try {
    const res = await fetch(`${BASE_URL}/products/categories`, {
      cache: "no-store",
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error("Failed to fetch categories:", res.status);
      return [];
    }

    const data: { slug: string; name: string; url: string }[] = await res.json();

    if (!Array.isArray(data)) {
      return [];
    }

    return data.map((cat) => ({
      slug: cat.slug,
      name: cat.name,
    }));
  } catch (error) {
    console.error("getCategories error:", error);
    return [];
  }
}

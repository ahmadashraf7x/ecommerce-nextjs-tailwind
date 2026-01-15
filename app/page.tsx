"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import React from "react";
import LoadingState from "../components/ui/LoadingState";
import ErrorState from "../components/ui/ErrorState";
import EmptyState from "../components/ui/EmptyState";


type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
};

type ProductCardProps = {
  product: Product;
};

const ProductCard = React.memo(function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="
  bg-white dark:bg-gray-800
  text-gray-800 dark:text-gray-100
  rounded-xl
  shadow-sm hover:shadow-md
  border border-gray-200 dark:border-gray-700
  transition-all
  p-4 flex flex-col items-center
">

      <h3 className="font-semibold text-sm md:text-base text-gray-800 dark:text-gray-100 mb-2 line-clamp-2 min-h-12">
        {product.title}
      </h3>

      <p className="text-blue-600 dark:text-blue-400 font-bold mb-1">
        Price: ${product.price}
      </p>

      <Link className="flex justify-center mb-3" href={`/products/${product.id}`}>
        <img
          className="h-32 object-contain"
          src={product.image}
          width="100"
          alt={product.title}
        />
      </Link>

      <Link
        href={`/products/${product.id}`}
        className="mt-auto text-sm text-blue-600 dark:text-blue-400 hover:underline"
      >
        View details
      </Link>
    </div>
  );
})


export default function Products() {

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  async function fetchProducts() {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products`);
      if (!res.ok) {
        throw new Error("Failed to fetch");
      }
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setError("Something went wrong");
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((item) => {
    const matchesTitle = item.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "all" || item.category === category;

    return matchesTitle && matchesCategory;
  });

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} onRetry={fetchProducts} />;

  return (
    <>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">Products</h1>

      <section className="flex flex-col md:flex-row gap-3 md:gap-4 mb-6">
        <select
          className="
    w-full md:w-52
    bg-white dark:bg-gray-900
    text-gray-900 dark:text-gray-100
    border border-gray-300 dark:border-gray-700
    rounded-md px-3 py-2
    text-sm md:text-base
    focus:outline-none focus:ring-2 focus:ring-blue-500
    transition-colors
  "          value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="all">All</option>
          <option value="men's clothing">Men's</option>
          <option value="women's clothing">Women</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelery</option>
        </select>
        <input
          className="
    flex-1
    bg-white dark:bg-gray-900
    text-gray-900 dark:text-gray-100
    border border-gray-300 dark:border-gray-700
    placeholder-gray-400 dark:placeholder-gray-500
    rounded-md px-3 py-2
    text-sm md:text-base
    focus:outline-none focus:ring-2 focus:ring-blue-500
    transition-colors
  "          onChange={(e) => setSearch(e.target.value)} type="text" placeholder="search by title"
          value={search} />
      </section>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 ">
        {filteredProducts.length === 0 ? (
          <div className="col-span-full">
            <EmptyState
              title="No products found"
              description="Try changing search or category"
            />
          </div>
        ) : (
          filteredProducts.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))
        )}
      </div>

    </>

  );
}

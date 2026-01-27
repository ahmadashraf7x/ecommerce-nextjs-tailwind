"use client";
import { useState } from "react";
import EmptyState from "../../components/ui/EmptyState";
import ProductCard from "./ProductCard";
import { Product } from "types/product";

export default function ProductsClient({ products }: { products: Product[] }){
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");



  const filteredProducts = products.filter((item) => {
    const matchesTitle = item.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "all" || item.category === category;

    return matchesTitle && matchesCategory;
  });

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

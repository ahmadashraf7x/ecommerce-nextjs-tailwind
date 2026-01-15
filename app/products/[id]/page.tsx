"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addItem } from "@/store-redux/cartSlice";
import type { AppDispatch } from "@/store-redux";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError("Something went wrong");
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchProduct();
  }, [id]);

  const dispatch = useDispatch<AppDispatch>();

  const handleAddToCart = () => {
    if (!product) return;
    dispatch(addItem(product));
    toast.success("Added to cart");
  }
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Product not found</p>;
  return (
    <>
      <header className="mb-6">
        <Link className="
  text-sm md:text-base
  text-gray-600 dark:text-gray-300
  hover:text-gray-800 dark:hover:text-white
  flex items-center gap-1 mb-2
"
          href="/"
        >
          <span className="text-lg">⬅</span>
          Back to products
        </Link>
        <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100">

          Product Details
        </h1>
      </header>
      <div className="
  bg-white dark:bg-gray-800
  text-gray-800 dark:text-gray-100
  rounded-2xl
  shadow-sm
  border border-gray-200 dark:border-gray-700
  p-4 md:p-6
  flex flex-col md:flex-row gap-6
  transition-colors
">
        <div className="flex-1 flex items-center justify-center">
          <img src={product.image} alt={product.title} width={200} />
        </div>
        <div className="flex-1 flex flex-col" >
          <h2 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
            {product.title}</h2>
          <p className="
  inline-block px-3 py-1 mb-3 rounded-full
  bg-gray-100 dark:bg-gray-700
  text-xs uppercase tracking-wide
  text-gray-600 dark:text-gray-300
">
            Category: {product.category}</p>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-3" >Price: ${product.price}</p>
          <p className="text-sm text-gray-700 dark:text-gray-300  mb-4 leading-relaxed">{product.description}</p>
          <button className="inline-flex items-center justify-center rounded-md bg-blue-600 text-white px-4 py-2 text-sm md:text-base font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
            onClick={handleAddToCart}>Add to cart</button>
        </div>
      </div>

    </>
  );
}


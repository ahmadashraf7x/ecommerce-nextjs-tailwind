"use client";
import Link from "next/link";
import React from "react";
import { Product } from "types/product";


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

export default ProductCard;
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { clear } from "store-redux/cartSlice";
import type { AppDispatch, RootState } from "store-redux";
import CartItemRow from "./CartItemRow";


export default function CartPage() {
  const items = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch<AppDispatch>();


  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div
          className="
    bg-white dark:bg-gray-800
    rounded-2xl shadow-sm
    border border-gray-200 dark:border-gray-700
    p-6 md:p-8
    max-w-md w-full text-center
    transition-colors
  "
        >
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">
            Your Cart</h1>
          <p className="text-gray-600  dark:text-gray-300 mb-4">Cart is empty</p>

          <Link className="inline-flex items-center justify-center rounded-md bg-blue-600 text-white px-4 py-2 text-sm md:text-base font-semibold hover:bg-blue-700 transition-colors" href="/">⬅ Back to products</Link>

        </div>
      </div>
    );
  }

  return (
    <>

      <header className="flex items-center justify-between mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100">
          Your Cart
        </h1>

        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-sm md:text-base text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
          >
            ⬅ Back to products
          </Link>

          <button
            onClick={() => dispatch(clear())}
            className="text-xs md:text-sm text-red-600 hover:text-red-700 font-semibold"
          >
            Empty cart
          </button>
        </div>
      </header>

      <div className="space-y-4">
        {items.map((item) => (
          <CartItemRow
            key={item.id}
            item={item}
          />
        ))}
      </div>
      <div className="
  bg-white dark:bg-gray-800
  rounded-2xl shadow-sm
  border border-gray-200 dark:border-gray-700
  p-4 md:p-6
  flex flex-col md:flex-row items-center justify-between gap-4
  transition-colors
">

        <p className="text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-100">
          Total:{" "}
          <span className="text-blue-600 dark:text-blue-400">
            ${totalPrice.toFixed(2)}
          </span>
        </p>
        <div className="flex gap-3">
          <Link
            href="/"
            className="
    inline-flex items-center justify-center rounded-md
    border border-gray-300 dark:border-gray-700
    text-gray-700 dark:text-gray-200
    px-4 py-2 text-sm md:text-base
    hover:bg-gray-50 dark:hover:bg-gray-700
    transition-colors
  "          >
            ⬅ Continue shopping
          </Link>

          <button
            className="inline-flex items-center justify-center rounded-md bg-green-600 text-white px-4 py-2 text-sm md:text-base font-semibold hover:bg-green-700 transition-colors cursor-not-allowed"
            disabled
          >
            Checkout
          </button>
        </div>

      </div>
    </>

  );

}







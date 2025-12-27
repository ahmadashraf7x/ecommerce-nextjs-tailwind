"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { clearCart, decreaseQty, getCart, increaseQty, removeFromCart } from "../lib/cart";

type CartItem = {
  id: number;
  title: string;
  price: number;
  image: string;
  qty: number;
};

type CartItemRowProps = {
  item: CartItem;
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  onRemove: (id: number) => void;
};

function CartItemRow({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemRowProps) {
  return (
    <div className="
  flex flex-col sm:flex-row items-center gap-4
  border-b border-gray-300 dark:border-gray-700
  pb-4 last:border-b-0 last:pb-0
  transition-colors
">
      <div className="w-20 h-20 flex items-center justify-center">
        <img className="max-h-20 object-contain" src={item.image} alt={item.title} width={80} />
      </div>
      <div className="flex-1 w-full">
        <h3 className="text-sm md:text-base font-semibold text-gray-800 dark:text-gray-100">
          {item.title}</h3>

        <p className="text-sm text-gray-600  dark:text-gray-300">
          Price:{" "}
          <span className="font-semibold text-blue-600 dark:text-blue-400">
            ${item.price}
          </span>
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Subtotal:{" "}
          <span className="font-semibold text-gray-800 dark:text-gray-100">
            ${(item.price * item.qty).toFixed(2)}
          </span>
        </p>

      </div>
      <div className="flex items-center gap-3" >
        <button className="
    w-8 h-8 flex items-center justify-center
    rounded-md border
    border-gray-300 dark:border-gray-700
    text-gray-700 dark:text-gray-200
    hover:bg-gray-100 dark:hover:bg-gray-700
    transition-colors
  "   onClick={() => onDecrease(item.id)}>-</button>
        <span >Qty: {item.qty}</span>
        <button className="
    w-8 h-8 flex items-center justify-center
    rounded-md border
    border-gray-300 dark:border-gray-700
    text-gray-700 dark:text-gray-200
    hover:bg-gray-100 dark:hover:bg-gray-700
    transition-colors
  "  onClick={() => onIncrease(item.id)}>+</button>
        <button className="text-xs md:text-sm text-red-600 hover:text-red-700 font-semibold" onClick={() => onRemove(item.id)}>
          Remove
        </button>
      </div>
      <hr />

    </div>
  );
}


export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  useEffect(() => {
    setCartItems(getCart());
  }, []);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  function handleRemove(id: number) {
    setCartItems(removeFromCart(id));
  }


  if (cartItems.length === 0) {
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
  function handleIncrease(id: number) {
    setCartItems(increaseQty(id));
  }

  function handleDecrease(id: number) {
    setCartItems(decreaseQty(id));
  }



  const handleClearCart = () => {
    setCartItems(clearCart);
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
            onClick={handleClearCart}
            className="text-xs md:text-sm text-red-600 hover:text-red-700 font-semibold"
          >
            Empty cart
          </button>
        </div>
      </header>

      <div className="space-y-4">
        {cartItems.map((item) => (
          <CartItemRow
            key={item.id}
            item={item}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
            onRemove={handleRemove}
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


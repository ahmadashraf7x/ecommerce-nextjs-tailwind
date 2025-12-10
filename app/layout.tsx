"use client";

import "./globals.css";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cartCount, setCartCount] = useState(0);
  function updateCartCountFromStorage() {
    const storedCart = localStorage.getItem("cart");
    if (!storedCart) {
      setCartCount(0);
      return;
    }

    const cart = JSON.parse(storedCart);
    const totalQty = cart.reduce(
      (sum: number, item: any) => sum + item.qty,
      0
    );
    setCartCount(totalQty);
  }

  useEffect(() => {
  updateCartCountFromStorage();

    window.addEventListener("cart-updated", updateCartCountFromStorage);

    return () => {
      window.removeEventListener("cart-updated", updateCartCountFromStorage);
    };

    
   
  }, []);

  return (
    <html lang="en">
      <body className="bg-gray-100">
        <header className="bg-white shadow-sm py-4 mb-6">
          <div className="max-w-5xl mx-auto px-4 flex items-center justify-between">
            
            <Link href="/" className="text-xl font-bold text-gray-800">
              E-Store
            </Link>

            <Link
              href="/cart"
              className="inline-flex items-center gap-2 text-sm md:text-base text-gray-700 hover:text-gray-900"
            >
              <span className="text-xl">🛒</span>
              <span className="hidden sm:inline">Cart</span>
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-500 text-white text-xs font-semibold">
                {cartCount}
              </span>
            </Link>

          </div>
        </header>
        <main className="min-h-screen">
          <div className="max-w-5xl mx-auto p-4 md:p-8">
          {children}
            </div>
        </main>

      </body>
    </html>
  );
}

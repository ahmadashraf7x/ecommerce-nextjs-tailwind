"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getCartCount } from "@/lib/cart";


export default function Header() {
  const [cartCount, setCartCount] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  function updateCartCountFromStorage() {
    setCartCount(getCartCount());
  }

  function toggleDarkMode() {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setDarkMode(!darkMode);
  }

  useEffect(() => {
    setMounted(true);

    updateCartCountFromStorage();

    window.addEventListener("cart-updated", updateCartCountFromStorage);

    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }

    return () => {
      window.removeEventListener("cart-updated", updateCartCountFromStorage);
    };
  }, []);

  if (!mounted) return null;

  return (
    <header className="
  bg-white dark:bg-gray-800
  border-b border-gray-200 dark:border-gray-700
  shadow-sm py-4 sticky top-0 z-50
  transition-colors
">
      <div className="max-w-5xl mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          E-Store
        </Link>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleDarkMode}
            className={`
    w-10 h-6 flex items-center rounded-full p-1 transition-colors
    ${darkMode ? "bg-blue-600" : "bg-gray-300"}
  `}
            aria-label="Toggle dark mode"
          >
            <div
              className={`
      w-4 h-4 rounded-full shadow transition-transform
      ${darkMode ? "translate-x-4 bg-white" : "bg-gray-400 border border-gray-400"}
    `}
            />
          </button>

          <Link
            href="/cart"
            className="
  inline-flex items-center gap-2
  text-sm md:text-base
  text-gray-700 dark:text-gray-200
  hover:text-gray-900 dark:hover:text-white
  font-medium relative
"
          >
            <span className="text-xl">🛒</span>
            <span className="hidden sm:inline">Cart</span>

            {cartCount > 0 && (
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-500 text-white text-xs font-semibold">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}

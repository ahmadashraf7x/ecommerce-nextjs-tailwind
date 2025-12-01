"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

type CartItem = {
  id: number;
  title: string;
  price: number;
  image: string;
  qty: number;
};

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();

  const [product, setProduct]   = useState<Product | null>(null);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState("");

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

   const handleAddToCart= () =>{
    if (!product) return;
  const storedCart = localStorage.getItem("cart");
  let cart: CartItem[] = storedCart ? JSON.parse(storedCart) : [];
    const existingItem = cart.find((item) => item.id === product.id);
   if (existingItem) {
      existingItem.qty += 1;
    } else {
      const newItem: CartItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        qty: 1,
      };
          cart.push(newItem)
  }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cart-updated"));

    alert("Added to cart ✅");
   }
  if (loading) return <p>Loading...</p>;
  if (error)   return <p>{error}</p>;
  if (!product) return <p>Product not found</p>;
  return (
    <div className="min-h-screen bg-gray-100">
        <div className="max-w-4xl mx-auto p-4 md:p-8"> 
<header className="mb-6">
  <Link 
    className="text-sm md:text-base text-gray-600 hover:text-gray-800 flex items-center gap-1 mb-2"
    href="/"
  >
    <span className="text-lg">⬅</span>
    Back to products
  </Link>
  <h1 className="text-xl md:text-2xl font-bold text-gray-800">
    Product Details
  </h1>
</header>
      <div className="bg-white rounded-2xl shadow-sm p-4 md:p-6 flex flex-col md:flex-row gap-6"> 
        <div className="flex-1 flex items-center justify-center"> 
      <img src={product.image} alt={product.title} width={200} />
      </div>
      <div className="flex-1 flex flex-col" > 
      <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">{product.title}</h2>
      <p className="inline-block px-3 py-1 mb-3 rounded-full bg-gray-100 text-xs uppercase tracking-wide text-gray-600">Category: {product.category}</p>
      <p className="text-2xl font-bold text-blue-600 mb-3" >Price: ${product.price}</p>
      <p className="text-sm text-gray-700 mb-4 leading-relaxed">{product.description}</p>
      <button className="inline-flex items-center justify-center rounded-md bg-blue-600 text-white px-4 py-2 text-sm md:text-base font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
 onClick={handleAddToCart}>Add to cart</button>
      </div>
</div>
    
    </div>
    </div>
  );
}

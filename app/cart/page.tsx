"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

type CartItem = {
  id: number;
  title: string;
  price: number;
  image: string;
  qty: number;
};

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
 useEffect(() => {
    // نقرأ الكارت من localStorage أول ما الصفحة تفتح
    const storedCart = localStorage.getItem("cart");
    const cart: CartItem[] = storedCart ? JSON.parse(storedCart) : [];
    setCartItems(cart);
  }, []);
    // نحسب الـ Total
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

function handleRemove(id: number) {
    const newCart = cartItems.filter((item) => item.id !== id);
    setCartItems(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  }


   if (cartItems.length === 0) {
    return (
       <div className="min-h-screen bg-gray-100 flex items-center justify-center"> 
      <div  className="bg-white rounded-2xl shadow-sm p-6 md:p-8 max-w-md w-full text-center" >
        <h1 className="text-2xl font-bold text-gray-800 mb-3">Your Cart</h1>
        <p className="text-gray-600 mb-4">Cart is empty</p>
        
          <Link className= "inline-flex items-center justify-center rounded-md bg-blue-600 text-white px-4 py-2 text-sm md:text-base font-semibold hover:bg-blue-700 transition-colors" href="/">⬅ Back to products</Link>
        
      </div>
      </div>
    );
  }
    function handleIncrease(id: number) {
    const newCart = cartItems.map((item) => {
      if (item.id === id) {
        return { ...item, qty: item.qty + 1 };
      }
      return item;
    });

    setCartItems(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  }

  function handleDecrease(id: number) {
    const newCart = cartItems
      .map((item) => {
        if (item.id === id) {
          return { ...item, qty: item.qty - 1 };
        }
        return item;
      })
      .filter((item) => item.qty > 0); // لو الكمية بقت 0 نشيله خالص

    setCartItems(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  }

  const handleClearCart =()=>{
  setCartItems([]);          // فضّي الستايت
  localStorage.removeItem("cart"); // امسح الكارت من اللوكال ستوريدج
  }

   return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-4 md:p-8">

    <header className="flex items-center justify-between mb-6">
      <h1 className="text-xl md:text-2xl font-bold text-gray-800">Your Cart</h1>
      <Link className="text-sm md:text-base text-gray-600 hover:text-gray-800"
 href="/">⬅ Back to products</Link>
 <button className="text-xs md:text-sm text-red-600 hover:text-red-700 font-semibold" onClick={handleClearCart}> Empty cart
</button>
</header>

  <div className="space-y-4"> 
      {cartItems.map((item) => (
        <div className="flex flex-col sm:flex-row items-center gap-4 border-b border-gray-300 pb-4 last:border-b-0 last:pb-0" key={item.id}>
          <div className="w-20 h-20 flex items-center justify-center">
          <img className="max-h-20 object-contain" src={item.image} alt={item.title} width={80} />
          </div>
           <div className="flex-1 w-full">
          <h3 className="text-sm md:text-base font-semibold text-gray-800">{item.title}</h3>
          
           <p className="text-sm text-gray-600">
                    Price:{" "}
                    <span className="font-semibold text-blue-600">
                      ${item.price}
                    </span>
                  </p>
                   <p className="text-sm text-gray-600">
                    Subtotal:{" "}
                    <span className="font-semibold text-gray-800">
                      ${(item.price * item.qty).toFixed(2)}
                    </span>
                  </p>
               
        </div>
<div className="flex items-center gap-3" > 
      <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100" onClick={() => handleDecrease(item.id)}>-</button>
      <span >Qty: {item.qty}</span>
      <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100" onClick={() => handleIncrease(item.id)}>+</button>
    
      <button  className="text-xs md:text-sm text-red-600 hover:text-red-700 font-semibold" onClick={() => handleRemove(item.id)}>
      Remove
    </button>
    </div>
          <hr />
        
        </div>
      ))}
      </div>
      
      
      <div className="bg-white rounded-2xl shadow-sm p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4">

        <p className="text-lg md:text-xl font-semibold text-gray-800">
            Total:{" "}
            <span className="text-blue-600">
              ${totalPrice.toFixed(2)}
            </span>
          </p>
          <div className="flex gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-md border border-gray-300 text-gray-700 px-4 py-2 text-sm md:text-base hover:bg-gray-50"
            >
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
    </div>
    </div>
    
  );
}


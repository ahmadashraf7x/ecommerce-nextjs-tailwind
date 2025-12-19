"use client";
import { useEffect, useState } from "react";
import Link from "next/link"; 


type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  category:string;
};


export default function Products () {

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

   useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError("");
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError("Something went wrong");
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

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

  if (loading) return <p>Loading...</p>;
  if (error)   return <p>{error}</p>;

  return (
    <>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Products</h1>

          <section className="flex flex-col md:flex-row gap-3 md:gap-4 mb-6">
    <select className="w-full md:w-52 border border-gray-300 rounded-md px-3 py-2 bg-white text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
value={category} onChange={(e) => setCategory(e.target.value)}>
  <option value="all">All</option>
  <option value="men's clothing">Men's</option>
  <option value="women's clothing">Women</option>
  <option value="electronics">Electronics</option>
  <option value="jewelery">Jewelery</option>
</select>
      <input className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
 onChange={(e) => setSearch(e.target.value)} type="text" placeholder="search by title"
      value={search}  />
         </section>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 ">
      {filteredProducts.map((item) => (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 flex flex-col items-center"
 key={item.id}>

          <h3 className="font-semibold text-sm md:text-base text-gray-800 mb-2 line-clamp-2 min-h-12" >{item.title}</h3>
          <p className="text-blue-600 font-bold mb-1" >Price: ${item.price}</p>
           <Link className="flex justify-center mb-3"  href={`/${item.id}`} >
          <img  className="h-32 object-contain"
 src={item.image} width="100" alt={item.title} />
          </Link>
         <Link
                href={`/${item.id}`}
                className=" mt-auto text-sm text-blue-600 hover:underline"
              >
                View details
              </Link>
  
        </div>

      ))}
      </div>
      
    </>
    
  );
}

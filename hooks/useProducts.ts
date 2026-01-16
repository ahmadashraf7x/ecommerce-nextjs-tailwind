import { useEffect, useState } from "react";
import { getProducts } from "../services/products.service";
import { Product } from "../types/product";

export function useProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>("");

    async function fetchProducts() {
        try {
            setLoading(true);
            setError("");
            const data = await getProducts();
            setProducts(data);
        } catch (err) {
            console.error(err);
            setError("Failed to load products");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    return {
        products,
        loading,
        error,
        refetch: fetchProducts,
    };
}
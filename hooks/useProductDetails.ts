import { useEffect, useState, useCallback } from "react";
import { getProductById } from "../services/products.service";
import { Product } from "../types/product";

export function useProduct(id: number) {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>("");

    const fetchProduct = useCallback(async () => {
        if (!id) return;

        try {
            setLoading(true);
            setError("");

            const data = await getProductById(id);
            setProduct(data);
        } catch (err) {
            console.error(err);
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchProduct();
    }, [fetchProduct]);

    return {
        product,
        loading,
        error,
        refetch: fetchProduct,
    };
}
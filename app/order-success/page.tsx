"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function OrderSuccessPage() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get("orderId");

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 max-w-md w-full text-center space-y-4">

                <div className="text-green-600 text-5xl">✔</div>

                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Order Placed Successfully!
                </h1>

                {orderId && (
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                        Your Order ID: <span className="font-medium">{orderId}</span>
                    </p>
                )}

                <p className="text-sm text-gray-600 dark:text-gray-300">
                    Thank you for your purchase. We’ll process your order shortly.
                </p>

                <Link
                    href="/"
                    className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    Back to Shop
                </Link>

            </div>
        </div>
    );
}

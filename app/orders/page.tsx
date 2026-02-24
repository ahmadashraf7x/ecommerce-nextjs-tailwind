"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "store-redux";
import ProtectedRoute from "components/auth/ProtectedRoute";
import Link from "next/link";
import { Order } from "types/order";

export default function OrdersPage() {
  const user = useSelector((state: RootState) => state.auth.user);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("orders") || "[]");

    if (user) {
      const userOrders = stored.filter(
        (order: Order) => order.userEmail === user.email
      );
      setOrders(userOrders);
    }
  }, [user]);

  return (
    <ProtectedRoute>
      <div className="max-w-5xl mx-auto p-6 space-y-6 dark:text-white">

        <h1 className="text-3xl font-bold">
          My Orders
        </h1>

        {orders.length === 0 ? (
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow border dark:border-gray-700">
            <p>No orders yet.</p>
            <Link
              href="/"
              className="inline-block mt-4 text-blue-600 dark:text-blue-400"
            >
              Start Shopping →
            </Link>
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow border dark:border-gray-700 space-y-4"
            >
              <div className="flex justify-between">
                <span className="font-semibold">
                  Order #{order.id}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(order.createdAt).toLocaleDateString()}
                </span>
              </div>

              <div className="space-y-2 text-sm">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between"
                  >
                    <span>
                      {item.title} × {item.qty}
                    </span>
                    <span>
                      ${(item.price * item.qty).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <hr className="dark:border-gray-700" />

              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${order.totalPrice.toFixed(2)}</span>
              </div>

              <div className="text-sm text-gray-600 dark:text-gray-400">
                {order.shippingInfo.fullName} —{" "}
                {order.shippingInfo.city},{" "}
                {order.shippingInfo.country}
              </div>
            </div>
          ))
        )}
      </div>
    </ProtectedRoute>
  );
}
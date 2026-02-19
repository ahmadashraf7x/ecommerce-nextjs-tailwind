"use client";

import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "store-redux";
import { clear } from "store-redux/cartSlice";
import {
  resetCheckout,
  setSubmitAttempted,
  setAcceptedTerms,
} from "store-redux/checkoutSlice";
import { validateOrderForm } from "utils/checkout/orderValidation";
import { useEffect, useState } from "react";
import { submitOrder } from "services/order.service";
import { useRouter } from "next/navigation";





export default function OrderSummary() {
  const dispatch = useDispatch<AppDispatch>();

  const { items } = useSelector((state: RootState) => state.cart);

  const {
    shippingInfo,
    paymentMethod,
    cardData,
    bankData,
    acceptedTerms,
  } = useSelector((state: RootState) => state.checkout);

  const user = useSelector((state: RootState) => state.auth.user);

  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();


  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  useEffect(() => {
    setError(null);
  }, [paymentMethod, acceptedTerms, shippingInfo, cardData, bankData]);

  const handlePlaceOrder = async () => {

    setError(null);

    dispatch(setSubmitAttempted(true));

    const validationError = validateOrderForm({
      shippingInfo,
      paymentMethod,
      cardData,
      bankData,
      acceptedTerms,
    });

    if (validationError) {
      setError(validationError);
      return;
    }

    if (!user) {
      setError("You must be logged in");
      return;
    }
    setSubmitting(true);
    try {
      const data = await submitOrder({
        shippingInfo,
        paymentMethod,
      });

      console.log("ORDER SUBMITTED", data);

      dispatch(clear());
      dispatch(resetCheckout());

      router.push(`/order-success?orderId=${data.orderId}`);


    } catch {
      setError("Failed to submit order");
    } finally {
      setSubmitting(false);
    }

  };

  if (items.length === 0) {
    return (
      <aside className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
        <p>Your cart is empty.</p>
      </aside>
    );
  }

  return (
    <aside className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 space-y-4 text-gray-900 dark:text-gray-100">
      <h2 className="text-xl font-semibold">Order Summary</h2>

      {/* 🛒 Items */}
      <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between">
            <span>
              {item.title} × {item.qty}
            </span>
            <span>
              ${(item.price * item.qty).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <hr className="border-gray-200 dark:border-gray-700" />

      <div className="flex justify-between font-semibold text-lg">
        <span>Total</span>
        <span>${totalPrice.toFixed(2)}</span>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <input
          type="checkbox"
          checked={acceptedTerms}
          onChange={(e) =>
            dispatch(setAcceptedTerms(e.target.checked))
          }
          className="accent-blue-600"
        />
        <label className="text-sm text-gray-700 dark:text-gray-300">
          I accept Terms & Conditions
        </label>
      </div>

      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}

      <button
        type="button"
        onClick={handlePlaceOrder}
        disabled={submitting}
        className="mt-4 w-full rounded-md bg-blue-600 px-4 py-3 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {submitting ? "Submitting..." : "Place Order"}
      </button>
    </aside>
  );
}

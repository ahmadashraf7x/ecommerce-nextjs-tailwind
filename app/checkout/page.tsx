"use client";

import ProtectedRoute from "components/auth/ProtectedRoute";
import ShippingForm from "components/checkout/ShippingForm";
import PaymentMethod from "components/checkout/PaymentMethod";
import OrderSummary from "components/checkout/OrderSummary";


export default function CheckoutPage() {
  return (
    <ProtectedRoute>
      <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8">

        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <div className="lg:col-span-2 space-y-6">
            <ShippingForm />
            <PaymentMethod />
          </div>

          <OrderSummary />

        </div>

      </div>
    </ProtectedRoute>
  );
}

"use client";

import ProtectedRoute from "components/auth/ProtectedRoute";

export default function CheckoutPage() {
  return (
    <ProtectedRoute>
      {(user) => (
        
        <div>
          <h1 className="text-2xl font-bold mb-4">Checkout</h1>
          <p>Welcome {user.name}, complete your order.</p>
        </div>
      )}
    </ProtectedRoute>
  );
}

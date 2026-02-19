"use client";

import { useSelector } from "react-redux";
import ProtectedRoute from "components/auth/ProtectedRoute";
import type { RootState } from "store-redux";

export default function CheckoutPage() {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <ProtectedRoute>
      <div>
        <h1>Checkout</h1>
        {user && <p>Welcome {user.name}</p>}
      </div>
    </ProtectedRoute>
  );
}

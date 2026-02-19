"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { login } from "store-redux/authSlice";
import type { AppDispatch } from "store-redux";

type StoredUser = {
  name: string;
  email: string;
  password: string;
};

export default function AuthPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const [error, setError] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  const dispatch = useDispatch<AppDispatch>();

  // 🟢 helper: نجيب المستخدمين من localStorage
  const getStoredUsers = (): StoredUser[] => {
    const data = localStorage.getItem("users");
    return data ? JSON.parse(data) : [];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const users = getStoredUsers();

    if (mode === "signup") {
      // تحقق إن الإيميل مش موجود
      const exists = users.find((u) => u.email === email);
      if (exists) {
        setError("Email already exists");
        return;
      }

      if (password !== confirmPassword) {
  setError("Passwords do not match");
  return;
}

      const newUser: StoredUser = { name, email, password };

      localStorage.setItem("users", JSON.stringify([...users, newUser]));

      // نسجل دخوله بعد التسجيل
      dispatch(login({ name, email }));
      router.push(redirect || "/");
    }

    if (mode === "signin") {
      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (!user) {
        setError("Invalid email or password");
        return;
      }

      dispatch(login({ name: user.name, email: user.email }));
      router.push(redirect || "/");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border dark:border-gray-700">
      <h1 className="text-2xl font-bold mb-4 text-center">
        {mode === "signin" ? "Sign In" : "Sign Up"}
      </h1>

      <div className="flex justify-center gap-4 mb-4">
        <button
          className={`font-semibold ${
            mode === "signin" ? "text-blue-600" : ""
          }`}
          onClick={() => setMode("signin")}
        >
          Sign In
        </button>
        <button
          className={`font-semibold ${
            mode === "signup" ? "text-blue-600" : ""
          }`}
          onClick={() => setMode("signup")}
        >
          Sign Up
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === "signup" && (
          <input
            type="text"
            placeholder="Name"
            className="w-full border px-3 py-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full border px-3 py-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border px-3 py-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {mode === "signup" && (
  <input
    type="password"
    placeholder="Confirm Password"
    className="w-full border px-3 py-2 rounded"
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
    required
  />
)}


        {error && (
          <p className="text-red-600 text-sm">{error}</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {mode === "signin" ? "Sign In" : "Create Account"}
        </button>
      </form>
    </div>
  );
}

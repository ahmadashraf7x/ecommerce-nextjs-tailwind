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

  const getStoredUsers = (): StoredUser[] => {
    const data = localStorage.getItem("users");
    return data ? JSON.parse(data) : [];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const users = getStoredUsers();

    if (mode === "signup") {
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
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">

      <h1 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-white">
        {mode === "signin" ? "Sign In" : "Sign Up"}
      </h1>

      <div className="flex justify-center gap-4 mb-4">
        <button
          className={`font-semibold text-gray-700 dark:text-gray-300 ${mode === "signin" ? "text-blue-600" : ""
            }`}
          onClick={() => setMode("signin")}
        >
          Sign In
        </button>

        <button
          className={`font-semibold text-gray-700 dark:text-gray-300 ${mode === "signup" ? "text-blue-600" : ""
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
            className="w-full border px-3 py-2 rounded
            bg-white dark:bg-gray-900
            text-gray-900 dark:text-white
            border-gray-300 dark:border-gray-600"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full border px-3 py-2 rounded
          bg-white dark:bg-gray-900
          text-gray-900 dark:text-white
          border-gray-300 dark:border-gray-600"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border px-3 py-2 rounded
          bg-white dark:bg-gray-900
          text-gray-900 dark:text-white
          border-gray-300 dark:border-gray-600"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {mode === "signup" && (
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full border px-3 py-2 rounded
            bg-white dark:bg-gray-900
            text-gray-900 dark:text-white
            border-gray-300 dark:border-gray-600"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        )}

        {error && (
          <p className="text-red-600 dark:text-red-400 text-sm">
            {error}
          </p>
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
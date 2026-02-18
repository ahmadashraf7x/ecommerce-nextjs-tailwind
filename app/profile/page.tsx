"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProtectedRoute from "components/auth/ProtectedRoute";
import { login, logout } from "store-redux/authSlice";
import type { RootState, AppDispatch } from "store-redux";

type StoredUser = {
  name: string;
  email: string;
  password: string;
};

export default function ProfilePage() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [error, setError] = useState("");

  if (!user) return null;

  const getUsers = (): StoredUser[] => {
    const stored = localStorage.getItem("users");
    return stored ? JSON.parse(stored) : [];
  };

  const handleSave = () => {
    setError("");
    const users = getUsers();

    const existingUser = users.find((u) => u.email === user.email);

    if (!existingUser) {
      setError("User not found");
      return;
    }

    if (existingUser.password !== currentPassword) {
      setError("Incorrect password");
      return;
    }

    const emailExists = users.find(
      (u) => u.email === email && u.email !== user.email
    );

    if (emailExists) {
      setError("Email already in use");
      return;
    }

    const updatedUsers = users.map((u) =>
      u.email === user.email ? { ...u, name, email } : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    dispatch(login({ name, email }));
    setIsEditing(false);
  };

  const handleDeleteAccount = () => {
    const users = getUsers();
    const updatedUsers = users.filter((u) => u.email !== user.email);

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    dispatch(logout());
  };

  return (
    <ProtectedRoute>
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border dark:border-gray-700">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>

        {!isEditing ? (
          <>
            <div className="space-y-2 mb-6">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Edit Profile
              </button>

              <button
                onClick={() => dispatch(logout())}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Logout
              </button>

              <button
                onClick={handleDeleteAccount}
                className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-black"
              >
                Delete Account
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="space-y-4 mb-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border px-3 py-2 rounded"
              />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border px-3 py-2 rounded"
              />

              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Confirm password"
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            {error && (
              <p className="text-red-600 text-sm mb-3">{error}</p>
            )}

            <div className="flex gap-3">
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Save
              </button>

              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </ProtectedRoute>
  );
}

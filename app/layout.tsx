"use client";
import "./globals.css";
import Header from "../components/Header";
import { Toaster } from "react-hot-toast";
import { persistor, store } from "./store-redux";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Header />

            <main className="min-h-screen">
              <div className="max-w-5xl mx-auto p-4 md:p-8">
                {children}
              </div>
            </main>
            <Toaster position="top-right" />
          </PersistGate>
        </Provider>
      </body>

    </html>
  );
}

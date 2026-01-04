"use client";
import "./globals.css";
import Header from "../components/Header";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
        <Header />

        <main className="min-h-screen">
          <div className="max-w-5xl mx-auto p-4 md:p-8">
            {children}
          </div>
        </main>
         <Toaster position="top-right" />
      </body>
     
    </html>
  );
}

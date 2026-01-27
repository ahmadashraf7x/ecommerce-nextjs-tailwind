import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] text-center gap-4">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Product not found
      </h1>
      <p className="text-gray-600 dark:text-gray-300">
        The product you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Back to products
      </Link>
    </div>
  );
}

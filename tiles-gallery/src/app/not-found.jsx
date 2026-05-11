"use client";
import Link from "next/link";
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-6">
      <div className="text-center text-white max-w-md">
        <h1 className="text-8xl font-extrabold text-indigo-500 animate-pulse">404</h1>
        <h2 className="mt-4 text-2xl font-semibold">Oops! Page Not Found</h2>
        <p className="mt-2 text-gray-400">The page you are looking for doesn’t exist or has been moved.</p>
        <Link
          href="/"
          className="inline-block mt-6 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 transition rounded-xl font-medium shadow-lg"
        >Go Back Home
        </Link>
      </div>
    </div>
  );
}
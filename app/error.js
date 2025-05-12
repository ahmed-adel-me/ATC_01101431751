"use client";

import Link from "next/link";

export default function GlobalError({ error, reset }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <h2 className="text-3xl font-bold text-red-600 dark:text-red-400 mb-4">
          Something went wrong!
        </h2>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          {error?.message || "An unexpected error occurred."}
        </p>
        <button
          onClick={() => reset()}
          className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition mb-4"
        >
          Try Again
        </button>
        <br />
        <Link href="/" className="text-blue-600 dark:text-blue-400 underline">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

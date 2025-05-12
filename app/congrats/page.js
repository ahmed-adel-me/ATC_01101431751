import Link from "next/link";

export default function CongratsPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-center p-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-md">
        <h1 className="text-4xl font-bold text-green-600 dark:text-green-400 mb-4">
          🎉 Congratulations!
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-10 mt-6">
          Your event has been successfully booked.
        </p>
        <Link
          href="/"
          className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition"
        >
          Back to Events
        </Link>
      </div>
    </div>
  );
}

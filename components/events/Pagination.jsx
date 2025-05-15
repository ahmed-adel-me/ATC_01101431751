"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";

export default function Pagination({ page, totalPages }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const setPage = (newPage) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage);
    router.replace(`${pathname}?${params.toString()}`);
  };

  if (totalPages <= 1) return null;

  return (
    <nav className="flex justify-center mt-10" aria-label="Pagination">
      <ul className="inline-flex items-center gap-1">
        <li>
          <button
            onClick={() => setPage(page - 1)}
            disabled={page <= 1}
            aria-label="Previous page"
            className={`px-4 py-2 border border-gray-300 dark:border-gray-700 font-semibold transition-colors duration-200
              ${
                page <= 1
                  ? "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
                  : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-300"
              }`}
          >
            Previous
          </button>
        </li>
        {Array.from({ length: totalPages }, (_, i) => (
          <li key={i + 1}>
            <button
              onClick={() => setPage(i + 1)}
              aria-current={page === i + 1 ? "page" : undefined}
              className={`relative px-4 py-2 border border-gray-300 dark:border-gray-700 font-semibold transition-colors duration-200
                ${
                  page === i + 1
                    ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 border-blue-600 dark:border-blue-400"
                    : "text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-900 hover:bg-blue-50 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-300"
                }`}
            >
              {i + 1}
              {page === i + 1 && (
                <span
                  className="absolute left-1/2 -bottom-1 w-2/3 h-0.5 bg-blue-600 dark:bg-blue-400 rounded transition-all duration-300"
                  style={{ transform: "translateX(-50%)" }}
                />
              )}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page >= totalPages}
            aria-label="Next page"
            className={`px-4 py-2 border border-gray-300 dark:border-gray-700 font-semibold transition-colors duration-200
              ${
                page >= totalPages
                  ? "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
                  : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-300"
              }`}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}

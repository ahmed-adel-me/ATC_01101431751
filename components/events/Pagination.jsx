"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

function getPageNumbers(current, total) {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  if (current <= 4) {
    return [1, 2, 3, "...", total];
  }
  if (current >= total - 3) {
    return [1, "...", total - 2, total - 1, total];
  }
  return [1, "...", current - 1, current, current + 1, "...", total];
}

export default function Pagination({ page, totalPages }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const t = useTranslations("pagination");

  const setPage = (newPage) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage);
    router.replace(`${pathname}?${params.toString()}`);
  };

  if (totalPages <= 1) return null;

  const pageNumbers = getPageNumbers(page, totalPages);

  return (
    <nav className="flex justify-center mt-10" aria-label="Pagination">
      <ul className="inline-flex items-center gap-1 max-w-full">
        <li>
          <button
            onClick={() => setPage(page - 1)}
            disabled={page <= 1}
            aria-label={t("previous")}
            className={`px-4 py-2 border border-gray-300 dark:border-gray-700 font-semibold transition-colors duration-200
              ${
                page <= 1
                  ? "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
                  : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-300"
              }`}
          >
            {t("previous")}
          </button>
        </li>
        {pageNumbers.map((num, idx) =>
          num === "..." ? (
            <li key={idx + "dots"}>
              <span className="px-3 py-2 text-gray-400 select-none">…</span>
            </li>
          ) : (
            <li key={num}>
              <button
                onClick={() => setPage(num)}
                aria-current={page === num ? "page" : undefined}
                className={`relative px-4 py-2 border border-gray-300 dark:border-gray-700 font-semibold transition-colors duration-200
                  ${
                    page === num
                      ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 border-blue-600 dark:border-blue-400"
                      : "text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-900 hover:bg-blue-50 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-300"
                  }`}
              >
                {num}
                {page === num && (
                  <span
                    className="absolute left-1/2 -bottom-1 w-2/3 h-0.5 bg-blue-600 dark:bg-blue-400 rounded transition-all duration-300"
                    style={{ transform: "translateX(-50%)" }}
                  />
                )}
              </button>
            </li>
          )
        )}
        <li>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page >= totalPages}
            aria-label={t("next")}
            className={`px-4 py-2 border border-gray-300 dark:border-gray-700 font-semibold transition-colors duration-200
              ${
                page >= totalPages
                  ? "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
                  : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-300"
              }`}
          >
            {t("next")}
          </button>
        </li>
      </ul>
    </nav>
  );
}

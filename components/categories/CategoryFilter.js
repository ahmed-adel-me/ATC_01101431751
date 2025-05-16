"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";
import { FaLayerGroup } from "react-icons/fa";
import { useTranslations } from "use-intl";

export default function CategoryFilter({ categories }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const current = searchParams.get("category");
  const t = useTranslations("homePage");
  const handleClick = useCallback(
    (val) => {
      const params = new URLSearchParams(searchParams);
      if (!val) {
        params.delete("category");
      } else {
        params.set("category", val);
      }
      params.set("page", 1);
      router.replace(`${pathname}?${params.toString()}`);
    },
    [searchParams, router, pathname]
  );

  return (
    <section className="mb-4">
      <div className="flex flex-nowrap items-center gap-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 px-4 py-1 shadow-sm">
        <div className="flex items-center gap-2 min-w-max">
          <FaLayerGroup className="text-blue-400" />
          <span className="font-semibold text-blue-500 text-base uppercase tracking-wide">
            {t("category")}
          </span>
        </div>
        <div className="h-6 border-l border-gray-300 dark:border-gray-600 mx-3" />
        <div className="flex flex-nowrap overflow-x-scroll gap-2 scrollbar-hide pb-1">
          <button
            onClick={() => handleClick("")}
            className={`px-4 py-2 font-semibold text-sm transition rounded-sm
              ${
                !current
                  ? "bg-blue-600 text-white border-blue-600 shadow"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-blue-600 hover:text-white"
              }`}
          >
            {t("all")}
          </button>
          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => handleClick(cat._id)}
              className={`px-4 py-2 font-semibold text-sm transition rounded-sm
                ${
                  current === cat._id
                    ? "bg-blue-600 text-white border-blue-600 shadow"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 hover:bg-blue-600 hover:text-white"
                }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

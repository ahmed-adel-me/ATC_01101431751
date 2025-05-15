"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";
import { FaTag } from "react-icons/fa";

export default function TagFilter({ tags }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const selected = searchParams.getAll("tags");

  const handleToggle = useCallback(
    (tagId) => {
      const params = new URLSearchParams(searchParams.toString());
      let currentTags = params.getAll("tags");

      if (currentTags.includes(tagId)) {
        currentTags = currentTags.filter((id) => id !== tagId);
      } else {
        currentTags.push(tagId);
      }

      params.delete("tags");
      currentTags.forEach((id) => params.append("tags", id));
      params.set("page", 1);
      router.replace(`${pathname}?${params.toString()}`);
    },
    [searchParams, router, pathname]
  );

  const handleClear = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("tags");
    params.set("page", 1);
    router.replace(`${pathname}?${params.toString()}`);
  }, [searchParams, router, pathname]);

  return (
    <section className="mb-6">
      <div className="flex items-center gap-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 px-4 py-1 shadow-sm">
        <div className="flex items-center gap-2 min-w-max">
          <FaTag className="text-purple-400" />
          <span className="font-semibold text-purple-400 text-base uppercase tracking-wide">
            Tags
          </span>
        </div>
        <div className="h-6 border-l border-gray-300 dark:border-gray-600 mx-3" />
        <div className="flex flex-wrap gap-2 overflow-x-auto pb-1">
          <button
            onClick={handleClear}
            className={`px-4 py-2 font-semibold text-sm transition rounded-sm
              ${
                selected.length === 0
                  ? "bg-purple-600 text-white border-purple-600 shadow"
                  : "bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-purple-600 hover:text-white"
              }`}
          >
            All
          </button>
          {tags.map((tag) => (
            <button
              key={tag._id}
              onClick={() => handleToggle(tag._id)}
              className={`px-4 py-2 font-semibold text-sm flex items-center gap-2 transition rounded-sm
                ${
                  selected.includes(tag._id)
                    ? "bg-purple-600 text-white border-purple-600 shadow"
                    : "bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-purple-600 hover:text-white"
                }`}
            >
              {tag.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

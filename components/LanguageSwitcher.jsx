// components/LanguageSwitcher.tsx
"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { FaGlobe } from "react-icons/fa";

export default function LanguageSwitcher() {
  const router = useRouter();
  const currentLocale = useLocale();

  const nextLocale = currentLocale === "en" ? "ar" : "en";
  const label = nextLocale === "en" ? "EN" : "AR";

  const switchLanguage = () => {
    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000`;
    router.refresh();
  };

  return (
    <button
      onClick={switchLanguage}
      aria-label={`Switch language to ${label}`}
      className="flex items-center gap-2 px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm font-semibold  hover:bg-gray-300 dark:hover:bg-gray-600 transition"
    >
      <FaGlobe className="w-4 h-4 opacity-70" />
      <span>{label}</span>
    </button>
  );
}

"use client";

import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  const handleToggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      onClick={handleToggle}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition relative"
      aria-label="Toggle theme"
      type="button"
    >
      <FaSun
        className={`h-5 w-5 text-yellow-500 transition-all duration-300 ${
          isDark ? "opacity-0 scale-0 absolute" : "opacity-100 scale-100"
        }`}
      />
      <FaMoon
        className={`h-5 w-5 text-gray-700 dark:text-gray-200 transition-all duration-300 ${
          isDark ? "opacity-100 scale-100" : "opacity-0 scale-0 absolute"
        }`}
      />
    </button>
  );
}

export default ModeToggle;

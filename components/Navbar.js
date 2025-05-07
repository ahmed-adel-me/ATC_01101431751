"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/admin", label: "Admin" },
    { href: "/login", label: "Login" },
  ];

  return (
    <nav className="w-full border-b border-gray-700 bg-white dark:bg-gray-900 px-6 py-4 shadow-sm flex justify-between items-center">
      {/* Logo */}
      <Link
        href="/"
        className="text-xl font-bold text-blue-600 dark:text-blue-400"
      >
        EventsApp
      </Link>

      {/* Navigation Links */}
      <div className="flex space-x-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition ${
              pathname === link.href
                ? "text-blue-600 dark:text-blue-400"
                : "text-gray-700 dark:text-gray-300"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { data: session, status } = useSession(); // Get session and status
  const pathname = usePathname();
  const links = [
    { href: "/", label: "Home" },
    { href: "/admin", label: "Admin" },
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
      <div className="flex space-x-4 items-center">
        {status === "authenticated" &&
          links.map((link) => (
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

        {/* Session State Handling */}
        {status === "loading" ? (
          <p className="text-gray-500 dark:text-gray-400">Loading...</p>
        ) : session ? (
          <button
            onClick={() => signOut()}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Sign Out
          </button>
        ) : (
          <>
            <Link
              href="/auth/login"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Login
            </Link>
            <Link
              href="/auth/signup"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

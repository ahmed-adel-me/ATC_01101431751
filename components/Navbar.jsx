"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Spinner from "./Spinner";
import { ModeToggle } from "@/components/ModeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslations } from "next-intl";

export default function Navbar() {
  const t = useTranslations("navbar");
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [isSigningOut, setIsSigningOut] = useState(false);

  // Navigation links (show Admin only if not a plain user)
  const links = [
    { href: "/", label: t("home") },
    ...(session?.user?.role !== "user"
      ? [{ href: "/admin", label: t("admin") }]
      : []),
  ];

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await signOut();
    } catch (error) {
      console.error("Sign-out failed:", error);
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <nav className="w-full border-b border-gray-700 bg-white dark:bg-gray-900 px-6 py-4 shadow-sm flex justify-between items-center">
      {/* Logo */}
      <Link
        href="/"
        className="text-xl font-bold text-blue-600 dark:text-blue-400"
      >
        <span
          className={
            pathname.startsWith("/admin")
              ? "hidden md:inline-block"
              : "hidden sm:inline-block"
          }
        >
          EventsApp
        </span>
      </Link>

      {/* Actions: Language, Mode, Links, Auth */}
      <div className="flex items-center gap-3">
        {/* Language Switcher */}
        <LanguageSwitcher />

        {/* Dark mode toggle button */}
        <ModeToggle />

        {/* Authenticated navigation links */}
        {status === "authenticated" &&
          links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 text-nowrap py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition ${
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
          <p className="text-gray-500 dark:text-gray-400">{t("loading")}</p>
        ) : session ? (
          <button
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="px-4 py-2 rounded transition bg-red-600 text-white hover:bg-red-700"
          >
            {isSigningOut ? (
              <div className="flex items-center gap-2">
                <span>{t("signingOut")}</span>
                <Spinner className="border-white" size={15} />
              </div>
            ) : (
              t("signOut")
            )}
          </button>
        ) : (
          <>
            <Link
              href="/auth/login"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              {t("login")}
            </Link>
            <Link
              href="/auth/signup"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              {t("signup")}
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

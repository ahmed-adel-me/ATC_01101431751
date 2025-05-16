"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useTranslations } from "next-intl";

const Sidebar = () => {
  const t = useTranslations("sidebar");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/admin", label: t("dashboard") },
    { href: "/admin/events", label: t("manageEvents") },
    { href: "/admin/categories", label: t("manageCategories") },
    { href: "/admin/tags", label: t("manageTags") },
    // { href: "/admin/users", label: t("manageUsers") },
  ];

  return (
    <>
      {/* Hamburger Button */}
      <button
        className="fixed top-4 left-4 z-40 md:hidden bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white p-2 rounded shadow"
        onClick={() => setOpen(true)}
        aria-label="Open sidebar"
      >
        <FaBars size={22} />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/20 dark:bg-black/40 z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-6 z-40
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:static md:translate-x-0 md:w-64 md:block
        `}
        style={{ maxWidth: "100vw" }}
      >
        {/* Close button for mobile */}
        <button
          className="absolute top-4 right-4 md:hidden text-gray-800 dark:text-white"
          onClick={() => setOpen(false)}
          aria-label="Close sidebar"
        >
          <FaTimes size={22} />
        </button>
        <h2 className="text-xl font-bold mb-6">{t("adminPanel")}</h2>
        <nav>
          <ul className="space-y-4">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block px-2 py-1 rounded transition-colors
                    ${
                      pathname === link.href
                        ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 font-bold"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;

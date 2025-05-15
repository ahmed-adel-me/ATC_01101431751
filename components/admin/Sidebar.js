"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Sidebar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/events", label: "Manage Events" },
    { href: "/admin/categories", label: "Manage Categories" },
    { href: "/admin/tags", label: "Manage Tags" },
    // { href: "/admin/users", label: "Manage Users" },
  ];

  return (
    <>
      {/* Hamburger Button */}
      <button
        className="fixed top-4 left-4 z-40 md:hidden bg-gray-800 text-white p-2 rounded shadow"
        onClick={() => setOpen(true)}
        aria-label="Open sidebar"
      >
        <FaBars size={22} />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-gray-800 text-white p-6 z-40
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:static md:translate-x-0 md:w-64 md:block
        `}
        style={{ maxWidth: "100vw" }}
      >
        {/* Close button for mobile */}
        <button
          className="absolute top-4 right-4 md:hidden text-white"
          onClick={() => setOpen(false)}
          aria-label="Close sidebar"
        >
          <FaTimes size={22} />
        </button>
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav>
          <ul className="space-y-4">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`${
                    pathname === link.href
                      ? "text-white font-bold"
                      : "text-gray-300 hover:text-white"
                  } transition-colors`}
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

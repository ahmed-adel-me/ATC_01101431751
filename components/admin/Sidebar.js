"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname(); // Get the current path

  const links = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/events", label: "Manage Events" },
    { href: "/admin/categories", label: "Manage Categories" },
    { href: "/admin/tags", label: "Manage Tags" },
    // { href: "/admin/users", label: "Manage Users" },
  ];

  return (
    <aside className="w-64 bg-gray-800 text-white p-6">
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
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;

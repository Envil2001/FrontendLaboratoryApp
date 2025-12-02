'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarLink({ href, label, icon }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`
        flex items-center gap-3 py-2 px-4 rounded-lg transition font-medium
        ${isActive
          ? "bg-violet-600 text-white shadow-md"
          : "text-gray-700 dark:text-gray-200 hover:bg-violet-100 dark:hover:bg-gray-700 hover:text-violet-700"
        }
      `}
    >
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </Link>
  );
}

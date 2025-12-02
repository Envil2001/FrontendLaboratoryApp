'use client';

import Link from "next/link";
import { useAuth } from "@/app/lib/AuthContext";
import SidebarLink from "./SidebarLink";
import Image from "next/image";
import AppLogo from "./AppLogo";
import { RxHome } from "react-icons/rx";
import { RxDashboard } from "react-icons/rx";
import { RxReader } from "react-icons/rx";
import { RxInfoCircled } from "react-icons/rx";
import { RxPerson } from "react-icons/rx";
import { RxLockClosed } from "react-icons/rx";


export default function AppShell({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <aside className="w-64 bg-white dark:bg-gray-800 p-6 hidden md:flex flex-col shadow-xl border-r border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-center mb-8 gap-2 text-2xl font-extrabold tracking-wide text-violet-600">
          <AppLogo className="w-8 h-8 text-violet-600" />
          <span>FrontendLab</span>
        </div>

        {user && (
          <div className="flex items-center gap-3 mb-8 p-4 rounded-xl bg-violet-100 dark:bg-gray-700 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden">
              {user.photoURL ? (
                <Image
                  src={user.photoURL}
                  alt="avatar"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xl font-bold text-gray-600">
                  {user.email?.[0]?.toUpperCase() || "U"}
                </div>
              )}
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                {user.displayName || user.email}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-300 truncate">
                {user.email}
              </p>
            </div>
          </div>
        )}

        <nav className="flex-1 space-y-1">
          <p className="text-xs uppercase text-gray-400 dark:text-gray-500 mb-2 px-2">
            Menu
          </p>

          <SidebarLink href="/" label="Home" icon={<RxHome size={18} />} />
          <SidebarLink href="/game" label="Word Search Game" icon={<RxDashboard size={18} />} />
          <SidebarLink href="/articles" label="Articles" icon={<RxReader size={18} />} />
          <SidebarLink href="/about" label="About" icon={<RxInfoCircled size={18} />} />

          {user && (
            <>
              <p className="text-xs uppercase text-gray-400 dark:text-gray-500 mt-6 mb-2 px-2">
                User
              </p>

            <SidebarLink href="/user/profile" label="Profile" icon={<RxPerson size={18} />} />
            <SidebarLink
              href="/user/changepassword"
              label="Change Password"
              icon={<RxLockClosed size={18} />}
            />
            </>
          )}
        </nav>

        {user && (
          <Link
            href="/user/signout"
            className="mt-5 block text-center py-2 px-4 rounded-lg border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition font-medium shadow-sm"
          >
            Sign Out
          </Link>
        )}
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white dark:bg-gray-800 shadow flex items-center justify-between px-6">
          <span className="md:hidden">Mobile Menu</span>

          <div className="ml-auto flex items-center gap-4">
            {!user && (
              <>
                <Link
                  data-testid="topbar-signin"
                  href="/user/signin"
                  className="px-4 py-2 text-violet-600 border border-violet-600 rounded hover:bg-violet-600 hover:text-white transition"
                >
                  Sign In
                </Link>
                <Link
                  href="/user/register"
                  className="px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700 transition"
                >
                  Sign Up
                </Link>
              </>
            )}

            {user && (
              <>
                <span className="hidden sm:inline text-sm text-gray-600 dark:text-gray-300">
                  {user.displayName || user.email}
                </span>
                <Link
                  href="/user/signout"
                  className="px-4 py-2 text-violet-600 border border-violet-600 rounded hover:bg-violet-600 hover:text-white transition"
                >
                  Sign Out
                </Link>
              </>
            )}
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">{children}</main>

        <footer className="bg-white dark:bg-gray-800 p-4 text-center text-sm shadow-inner">
          © 2025 FrontendLaboratoryApp. Mamba UI Style.
        </footer>
      </div>
    </div>
  );
}

"use client";

import { ReactNode, useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import Cookies from "js-cookie";
import { useLogout } from "@/app/hooks/useAuth";
import FormButton from "@/components/auth/FormButton";

interface UserData {
  firstName: string;
  lastName: string;
  image: string;
  username: string;
}

let cachedRawCookie: string | undefined = undefined;
let cachedUserData: UserData | null = null;

function getUserSnapshot(): UserData | null {
  const currentCookie = Cookies.get("user");

  if (currentCookie === cachedRawCookie) {
    return cachedUserData;
  }

  cachedRawCookie = currentCookie;
  if (!currentCookie) {
    cachedUserData = null;
  } else {
    try {
      cachedUserData = JSON.parse(currentCookie);
    } catch (error) {
      console.error("Failed to parse user cookie", error);
      cachedUserData = null;
    }
  }

  return cachedUserData;
}

function getServerSnapshot(): UserData | null {
  return null;
}

function subscribe(callback: () => void) {
  return () => {};
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { logout } = useLogout();

  const user = useSyncExternalStore(
    subscribe,
    getUserSnapshot,
    getServerSnapshot,
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col justify-between p-4 hidden md:flex">
        <div className="space-y-6">
          <div className="flex items-center gap-2 px-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
              A
            </div>
            <span className="font-bold text-lg text-gray-800">Admin Panel</span>
          </div>

          <nav className="space-y-1">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-3 py-2 rounded-lg bg-blue-50 text-blue-600 font-medium text-sm transition-colors"
            >
              Dashboard
            </Link>
          </nav>
        </div>

        <FormButton
          onClick={logout}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full"
        >
          Logout
        </FormButton>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6">
          <h1 className="text-base font-semibold text-gray-800">
            System Management
          </h1>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <Image
                  src={user.image}
                  alt={user.username}
                  width={36}
                  height={36}
                  className="rounded-full border border-gray-200"
                />
                <div className="flex flex-col text-sm leading-tight">
                  <span className="font-semibold text-gray-900">
                    {user.firstName} {user.lastName}
                  </span>
                  <span className="text-gray-500 text-xs">
                    @{user.username}
                  </span>
                </div>
              </div>
            ) : (
              <div className="w-32 h-9 bg-gray-100 animate-pulse rounded-lg md:block hidden" />
            )}

            <FormButton
              onClick={logout}
              className="md:hidden text-xs text-red-600 font-medium border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
            >
              Logout
            </FormButton>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}

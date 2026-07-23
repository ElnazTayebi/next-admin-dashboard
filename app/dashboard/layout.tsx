"use client";

import { ReactNode } from "react";
import { useLogout } from "@/app/hooks/useAuth"; // Adjust the import path according to your structure

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { logout } = useLogout();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col justify-between p-4 hidden md:flex">
        <div className="space-y-6">
          <div className="flex items-center gap-2 px-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
              A
            </div>
            <span className="font-bold text-lg text-gray-800">Admin Panel</span>
          </div>

          <nav className="space-y-1">
            <a
              href="/dashboard"
              className="flex items-center gap-3 px-3 py-2 rounded-lg bg-blue-50 text-blue-600 font-medium text-sm"
            >
              Dashboard
            </a>
          </nav>
        </div>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full"
        >
          Logout
        </button>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6">
          <h1 className="text-base font-semibold text-gray-800">System Management</h1>

          <button
            onClick={logout}
            className="md:hidden text-xs text-red-600 font-medium border border-red-200 px-3 py-1.5 rounded-lg"
          >
            Logout
          </button>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
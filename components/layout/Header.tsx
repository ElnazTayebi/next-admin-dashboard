"use client";

import { UserDropdown } from "@/features/auth/components/UserDropdown";


export default function Header() {
  return (
    <header className="flex h-16 w-full items-center justify-between border-b bg-background px-6">
      <h1 className="text-base font-semibold text-foreground">
        Admin Dashboard
      </h1>

      <UserDropdown />
    </header>
  );
}

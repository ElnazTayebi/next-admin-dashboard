"use client";

import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import Header from "@/components/layout/Header";
import { useLogout } from "@/features/auth";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { logout } = useLogout();

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden bg-background">
        <AppSidebar onLogout={logout} />

        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="flex h-16 items-center border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="flex-1">
              <Header />
            </div>
          </div>

          <main className="flex-1 overflow-y-auto p-6 bg-muted/20">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
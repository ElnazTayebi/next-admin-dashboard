// providers/AppProvider.tsx
"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "./ThemeProvider";
import QueryProvider from "./QueryProvider";



export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </QueryProvider>
  );
}
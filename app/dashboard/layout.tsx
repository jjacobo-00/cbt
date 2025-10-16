"use client";

import { AppSidebar } from "@/components/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import "@/app/globals.css";
import { User, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Wait for hydration (fixes mismatch issue)
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-gray-100 dark:bg-gray-900 transition-colors">
        {/* Sidebar */}
        <AppSidebar />

        {/* Main Content Area */}
        <div className="flex flex-col flex-1 min-w-0">
          {/* Top Navbar */}
          <header className="flex items-center justify-between px-6 py-3 bg-white dark:bg-gray-800 border-b dark:border-gray-700 shadow-sm transition-colors">
            {/* Left: Sidebar Trigger */}
            <div className="flex items-center gap-3">
              <SidebarTrigger className="text-gray-600 dark:text-gray-300" />
              <h1 className="text-lg font-semibold text-gray-700 dark:text-gray-100">
                Dashboard
              </h1>
            </div>

            {/* Right: Theme Toggle + Account Icon */}
            <div className="flex items-center gap-4">
              {/* 🌙 Theme Toggle Button */}
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Moon className="w-5 h-5 text-sky-800" />
                )}
              </button>

              {/* 👤 Account Icon */}
              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                <User className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 w-full overflow-y-auto p-6 text-gray-900 dark:text-gray-100 transition-colors">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

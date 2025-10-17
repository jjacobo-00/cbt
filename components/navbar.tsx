"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { googleSignOut } from "@/app/actions/googleSignOut";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { User, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { googleSignIn } from "@/app/actions/googleSignIn";

interface Session {
  id?: string;
  user?: {
    name?: string;
  };
}

interface NavbarProps {
  session: Session | null;
}

export default function Navbar({ session }: NavbarProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // ✅ Wait for hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    toast.warning("Are you sure you want to log out?", {
      action: {
        label: "Logout",
        onClick: async () => {
          await googleSignOut();
          toast.success("You have been logged out successfully!");
        },
      },
      cancel: {
        label: "Cancel",
      },
    });
  };

  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white dark:bg-gray-800 border-b dark:border-gray-700 shadow-sm transition-colors">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="text-gray-600 dark:text-gray-300" />
        <h1 className="text-lg font-semibold text-gray-700 dark:text-gray-100">
          Dashboard
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Theme Toggle — Render only after hydration */}
        {mounted && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-sky-800" />
            )}
          </button>
        )}

        {/* User dropdown */}
        {session && session.user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                <User className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>
                {session.user.name ?? "User"}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={`/users/${session.id}`}>Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-red-600 cursor-pointer"
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <form action={googleSignIn}>
            <button
              type="submit"
              className="p-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Sign in with Google
            </button>
          </form>
        )}
      </div>
    </header>
  );
}

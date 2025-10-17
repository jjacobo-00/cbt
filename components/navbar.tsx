"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { googleSignOut } from "@/app/actions/googleSignOut";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { User, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

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
  const router = useRouter();

  // ✅ Ensure client-only rendering consistency
  useEffect(() => {
    setMounted(true);
  }, []);

  // ✅ Redirect to login if no session
  useEffect(() => {
    if (mounted && !session) {
      router.push("/login");
    }
  }, [mounted, session, router]);

  const handleLogout = () => {
    toast.warning("Are you sure you want to log out?", {
      action: {
        label: "Logout",
        onClick: async () => {
          await googleSignOut();
          toast.success("You have been logged out successfully!");
          router.push("/login");
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

      {/* Right-side controls */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle — only after mount */}
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

        {/* User Dropdown — only render after hydration */}
        {mounted && session && session.user && (
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
        )}
      </div>
    </header>
  );
}

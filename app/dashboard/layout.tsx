import { AppSidebar } from "@/components/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import "@/app/globals.css";
import Navbar from "@/components/navbar";
import { auth } from "@/auth";
import { Toaster, toast } from "sonner";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth(); // ✅ this now works

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-gray-100 dark:bg-gray-900 transition-colors">
        <AppSidebar />
        <div className="flex flex-col flex-1 min-w-0">
          <Navbar session={session} />
          <main className="flex-1 w-full overflow-y-auto p-6 text-gray-900 dark:text-gray-100 transition-colors">
            {children}
            <Toaster richColors position="bottom-center" theme="system" />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

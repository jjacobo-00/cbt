"use client";

import dynamic from "next/dynamic";

const LoginPageClient = dynamic(() => import("./LoginPageClient"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-700 dark:border-gray-200"></div>
    </div>
  ),
});

export default function Page() {
  return <LoginPageClient />;
}

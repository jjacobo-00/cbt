"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Globe } from "lucide-react";
import { useTheme } from "next-themes";
import { googleSignIn } from "@/app/actions/googleSignIn";
import { motion } from "framer-motion";
import Image from "next/image";

export default function LoginPageClient() {
  const [isPending, startTransition] = useTransition();
  const { theme } = useTheme();

  const handleGoogleLogin = () => {
    startTransition(async () => {
      await googleSignIn();
    });
  };

  return (
    <div
      className={`flex items-center justify-center min-h-screen px-4 transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gradient-to-b from-gray-950 to-gray-900"
          : "bg-gradient-to-b from-gray-50 to-gray-100"
      }`}
    >
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-semibold tracking-tight text-foreground">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={120}
              height={120}
              className="mx-auto mb-2"
            />
            Welcome Back 👋
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <Button
            onClick={handleGoogleLogin}
            disabled={isPending}
            className="flex items-center gap-2 w-full"
          >
            {isPending ? (
              <>
                <Loader2 className="animate-spin h-5 w-5" /> Signing in...
              </>
            ) : (
              <>
                <Globe className="h-5 w-5" /> Continue with Google
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

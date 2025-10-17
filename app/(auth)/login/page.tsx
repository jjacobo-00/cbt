"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Globe } from "lucide-react";
import { useTheme } from "next-themes";
import { googleSignIn } from "@/app/actions/googleSignIn";
import { motion } from "framer-motion";
import Image from "next/image";

export default function LoginPage() {
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
          : "bg-gradient-to-b from-gray-100 to-white"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="w-[380px] rounded-2xl shadow-xl border border-border/50 backdrop-blur-sm">
          <CardHeader className="flex flex-col items-center justify-center space-y-3">
            <Image
              src="/logo.svg"
              alt="App Logo"
              width={130}
              height={130}
              priority
              className="rounded-md"
            />
            <CardTitle className="text-2xl font-semibold tracking-tight text-foreground text-center">
              Welcome Back 👋
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <p className="text-center text-sm text-muted-foreground">
              Sign in to access your dashboard
            </p>

            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2 py-5 font-medium transition-all hover:bg-accent hover:text-accent-foreground"
              onClick={handleGoogleLogin}
              disabled={isPending}
            >
              {isPending ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Globe className="h-5 w-5 text-blue-500" />
              )}
              {isPending ? "Signing in..." : "Continue with Google"}
            </Button>

            <div className="text-center text-xs text-muted-foreground">
              By continuing, you agree to our{" "}
              <a href="#" className="text-primary hover:underline">
                Terms
              </a>{" "}
              and{" "}
              <a href="#" className="text-primary hover:underline">
                Privacy Policy
              </a>
              .
            </div>
          </CardContent>
        </Card>

        <footer className="mt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} CBT Inc. All rights reserved.
        </footer>
      </motion.div>
    </div>
  );
}

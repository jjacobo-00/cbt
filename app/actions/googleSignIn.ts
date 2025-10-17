// app/actions/googleSignIn.ts
"use server";

import { signIn } from "@/auth";

export async function googleSignIn() {
  await signIn("google", { redirectTo: "/dashboard" }); // ✅ go to dashboard
}

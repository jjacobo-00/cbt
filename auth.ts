// app/auth.ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { supabase } from "@/lib/supabaseClient";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async signIn({ user }) {
      try {
        // Check if user exists
        const { data: existingUser, error: selectError } = await supabase
          .from("users")
          .select("*")
          .eq("email", user.email)
          .single();

        // If not found, insert a new one
        if (!existingUser) {
          const { error: insertError } = await supabase.from("users").insert({
            name: user.name,
            email: user.email,
          });

          if (insertError) {
            console.error("Supabase insert error:", insertError);
          } else {
            console.log("✅ New user added to Supabase:", user.email);
          }
        }

        if (selectError && selectError.code !== "PGRST116") {
          console.error("Supabase select error:", selectError);
        }

        return true; // allow sign-in
      } catch (err) {
        console.error("Unexpected Supabase error:", err);
        return false; // block login on error
      }
    },

    async redirect({ url, baseUrl }) {
      return url.startsWith("/") ? `${baseUrl}${url}` : `${baseUrl}/dashboard`;
    },
  },
});

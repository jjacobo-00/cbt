// app/auth.ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  pages: {
    signIn: "/login", // ⬅️ Custom login page
  },

  callbacks: {
    async redirect({ url, baseUrl }) {
      // Redirect after login
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Default: go to dashboard
      return `${baseUrl}/dashboard`;
    },
  },
});

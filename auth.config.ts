import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      if (isLoggedIn) {
        return Response.redirect(new URL("/", nextUrl));
      }
      return false;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;

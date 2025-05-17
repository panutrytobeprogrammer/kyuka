import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { cookies } from "next/headers";
import { APIResponse } from "../types";

export function isAuthorized(id: string, email: string) {
  return fetch(`${process.env.NEXTAUTH_URL}/api/${id}/${email}`, {
    cache: "no-store",
  });
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
    signOut: "/logout",
    error: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, credentials }) {
      return true;
    },
    redirect({ baseUrl, url }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    async jwt({ token, account }) {
      return token;
    },
    async session({ session }) {
      return {
        ...session,
      };
    },
  },
};

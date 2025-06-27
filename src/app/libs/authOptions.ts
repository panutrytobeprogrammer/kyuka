import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { env } from "next-runtime-env";

export function isAuthorized(id: string, email: string) {
  return fetch(`${env("NEXTAUTH_URL")}/api/${id}/${email}`, {
    cache: "no-store",
  });
}

export const authOptions: NextAuthOptions = {
  secret: env("NEXTAUTH_SECRET"),
  pages: {
    signIn: "/login",
    signOut: "/logout",
    error: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: env("GOOGLE_CLIENT_ID") as string,
      clientSecret: env("GOOGLE_CLIENT_SECRET") as string,
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

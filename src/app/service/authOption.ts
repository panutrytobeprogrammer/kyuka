import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

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
    async signIn({ user }) {
      const allowUsers: string[] = (process.env.ACCESS_EMAIL as string).split(
        ","
      );
      if (allowUsers.includes(user.email?.toLowerCase().trim() as string)) {
        return true;
      } else {
        console.error(`${user.email} not allowed to sign-in`);
        return false;
      }
    },
    redirect({ baseUrl }) {
      return baseUrl;
    },
    async jwt({ token, account }) {
      console.log(account?.access_token);

      const transformedObject = Object.fromEntries(
        Object.entries(token).filter(([key]) => key !== "picture")
      );
      return transformedObject;
    },
    async session({ session }) {
      return {
        ...session,
      };
    },
  },
};

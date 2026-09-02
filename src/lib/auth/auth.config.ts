import type { NextAuthConfig } from "next-auth";

/**
 * Edge-safe auth configuration.
 *
 * This half contains NO database or Node-only code so it can run inside
 * `middleware.ts` (Edge runtime). The Credentials provider and Prisma wiring
 * live in `./index.ts`, which is only imported from Node contexts.
 */
export const authConfig = {
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 8, // 8h — session expiration (spec §34)
  },
  providers: [],
  callbacks: {
    /** Route protection for `/admin/**` (spec §6.2, §34). */
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const { pathname } = nextUrl;

      const isLoginPage = pathname === "/admin/login";
      const isAdminArea =
        pathname === "/admin" || pathname.startsWith("/admin/");

      if (isLoginPage) {
        if (isLoggedIn) {
          return Response.redirect(new URL("/admin/dashboard", nextUrl));
        }
        return true;
      }

      if (isAdminArea) {
        return isLoggedIn;
      }

      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as typeof session.user.role;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

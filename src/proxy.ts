import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth/auth.config";

// Next.js 16 "proxy" convention (formerly middleware).
// Uses only the DB-free auth config so it runs on the Edge runtime.
const { auth } = NextAuth(authConfig);

export default auth;

export const config = {
  // Run on everything except Next internals and static assets.
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico)$).*)",
  ],
};

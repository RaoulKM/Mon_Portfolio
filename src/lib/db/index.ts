// Central data-access entry point.
// Import `prisma` from here so the rest of the app never reaches into
// "@/lib/prisma" directly — makes it easy to wrap queries later.
export { prisma } from "@/lib/prisma";

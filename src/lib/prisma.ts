import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

import { env } from "@/lib/env";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Serverless (Vercel/Lambda): keep the pool tiny — one connection per
// instance — and don't linger. Long-lived servers can use a normal pool.
const isServerless = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);

function createClient() {
  // Prisma 7 — runtime connects through a driver adapter (no Rust engine).
  const adapter = new PrismaPg(
    {
      connectionString: env.DATABASE_URL,
      ...(isServerless ? { max: 1, idleTimeoutMillis: 10_000 } : {}),
    },
    {
      // Without these, a failed/idle pg connection emits an unhandled 'error'
      // event that crashes the Node process. Keep them as no-throw loggers.
      onPoolError: (err) => console.error("[pg:pool]", err.message),
      onConnectionError: (err) => console.error("[pg:connection]", err.message),
    },
  );
  return new PrismaClient({
    adapter,
    log: env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

export const prisma = globalForPrisma.prisma ?? createClient();

if (env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

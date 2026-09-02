import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

import { env } from "@/lib/env";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createClient() {
  // Prisma 7 — runtime connects through a driver adapter (no Rust engine).
  const adapter = new PrismaPg(
    { connectionString: env.DATABASE_URL },
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

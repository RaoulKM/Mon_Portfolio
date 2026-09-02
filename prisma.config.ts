import { config as loadEnv } from "dotenv";
import { defineConfig } from "prisma/config";

// Prisma 7 no longer auto-loads .env — load it ourselves (local overrides first).
loadEnv({ path: [".env.local", ".env"], quiet: true });

/**
 * Prisma 7 configuration.
 * The connection URL here is used by the CLI / schema engine (migrate,
 * introspect, studio). The runtime `PrismaClient` connects via a driver
 * adapter — see `src/lib/prisma.ts`.
 *
 * A placeholder URL keeps `prisma generate` working when DATABASE_URL is
 * unset (e.g. `npm install` on a fresh checkout); migrate/studio still need
 * the real value in `.env.local`.
 */
export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url:
      process.env.DATABASE_URL ??
      "postgresql://user:password@localhost:5432/mon_portfolio?schema=public",
  },
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
});

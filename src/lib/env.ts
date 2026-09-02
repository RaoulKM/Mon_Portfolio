import { z } from "zod";

/**
 * Centralised, validated environment configuration.
 * Import `env` instead of reading `process.env` directly so a missing or
 * malformed variable fails fast at boot rather than deep inside a request.
 */
const schema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),

  DATABASE_URL: z.string().url(),

  // Auth.js (NextAuth v5)
  AUTH_SECRET: z.string().min(1, "AUTH_SECRET is required"),
  AUTH_URL: z.string().url().optional(),

  // Public
  NEXT_PUBLIC_SITE_URL: z
    .string()
    .url()
    .default("http://localhost:3000"),

  // Media storage (§5) — abstraction, provider optional in dev
  STORAGE_PROVIDER: z
    .enum(["local", "cloudinary", "s3"])
    .default("local"),
  CLOUDINARY_CLOUD_NAME: z.string().optional(),
  CLOUDINARY_API_KEY: z.string().optional(),
  CLOUDINARY_API_SECRET: z.string().optional(),
  CLOUDINARY_FOLDER: z.string().optional(),

  // Email (§18) — optional in dev
  EMAIL_SERVER: z.string().optional(),
  EMAIL_FROM: z.string().optional(),
}).superRefine((v, ctx) => {
  if (v.STORAGE_PROVIDER === "cloudinary") {
    for (const key of [
      "CLOUDINARY_CLOUD_NAME",
      "CLOUDINARY_API_KEY",
      "CLOUDINARY_API_SECRET",
    ] as const) {
      if (!v[key]) {
        ctx.addIssue({
          code: "custom",
          path: [key],
          message: `${key} is required when STORAGE_PROVIDER=cloudinary`,
        });
      }
    }
  }
});

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
  console.error(
    "❌ Invalid environment variables:",
    JSON.stringify(parsed.error.flatten().fieldErrors, null, 2),
  );
  throw new Error("Invalid environment variables");
}

export const env = parsed.data;
export type Env = z.infer<typeof schema>;

import { z } from "zod";

/** Zod helpers for parsing HTML form submissions (everything arrives as strings). */

/** Checkbox: present ("on"/"true") → true, absent → false. */
export const checkbox = z
  .union([z.string(), z.boolean(), z.undefined(), z.null()])
  .transform((v) => v === "on" || v === "true" || v === true);

/** Optional text: "" → undefined, trimmed otherwise. */
export const optionalText = z
  .string()
  .trim()
  .optional()
  .transform((v) => (v ? v : undefined));

/** Required, trimmed text with a minimum length. */
export const requiredText = (min = 1, max = 5000) =>
  z.string().trim().min(min, "Champ requis").max(max);

/** Optional URL: "" → undefined. */
export const optionalUrl = z
  .string()
  .trim()
  .optional()
  .transform((v) => (v ? v : undefined))
  .pipe(z.string().url("URL invalide").optional());

/** Integer from a string input. */
export const intField = (min = 0, max = 1_000_000) =>
  z.coerce.number().int().min(min).max(max);

/** Optional float. */
export const optionalFloat = z
  .string()
  .trim()
  .optional()
  .transform((v) => (v ? Number(v) : undefined))
  .pipe(z.number().min(0).max(100).optional());

/** Optional date: "" → undefined. */
export const optionalDate = z
  .string()
  .trim()
  .optional()
  .transform((v) => (v ? new Date(v) : undefined))
  .pipe(z.date().optional());

/** Comma / newline separated list → string[] (empties removed). */
export const listField = z
  .string()
  .optional()
  .transform((v) =>
    (v ?? "")
      .split(/[\n,]/)
      .map((s) => s.trim())
      .filter(Boolean),
  );

/** cuid or "" → undefined. */
export const optionalId = z
  .string()
  .trim()
  .optional()
  .transform((v) => (v ? v : undefined));

export const slugField = z
  .string()
  .trim()
  .toLowerCase()
  .min(1, "Slug requis")
  .max(120)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug invalide (a-z, 0-9, tirets)");

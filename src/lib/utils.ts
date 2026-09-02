import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind class names, resolving conflicts. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Build a URL-safe slug from an arbitrary string. */
export function slugify(input: string): string {
  return input
    .toString()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

/** Rough reading-time estimate in minutes (~200 wpm). */
export function readingTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/** Format a date range like "janv. 2023 — aujourd'hui". */
export function formatDateRange(
  start: Date,
  end?: Date | null,
  opts?: { locale?: string; present?: string },
): string {
  const locale = opts?.locale === "en" ? "en-US" : "fr-FR";
  const present = opts?.present ?? (opts?.locale === "en" ? "present" : "aujourd'hui");
  const fmt = new Intl.DateTimeFormat(locale, { month: "short", year: "numeric" });
  return `${fmt.format(start)} — ${end ? fmt.format(end) : present}`;
}

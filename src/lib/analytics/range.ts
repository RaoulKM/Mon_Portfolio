export const RANGES = [
  { key: "today", label: "Aujourd'hui", days: 1, bucket: "hour" as const },
  { key: "7d", label: "7 jours", days: 7, bucket: "day" as const },
  { key: "30d", label: "30 jours", days: 30, bucket: "day" as const },
  { key: "90d", label: "90 jours", days: 90, bucket: "day" as const },
  { key: "1y", label: "1 an", days: 365, bucket: "month" as const },
] as const;

export type RangeKey = (typeof RANGES)[number]["key"];
export type Bucket = "hour" | "day" | "month";

export interface ResolvedRange {
  key: RangeKey;
  label: string;
  bucket: Bucket;
  start: Date;
  end: Date;
  /** Immediately-preceding window of the same length, for deltas. */
  prevStart: Date;
  prevEnd: Date;
}

export function resolveRange(input?: string | string[]): ResolvedRange {
  const raw = Array.isArray(input) ? input[0] : input;
  const def = RANGES.find((r) => r.key === raw) ?? RANGES[1]; // default 7d

  const end = new Date();
  const start = new Date(end.getTime() - def.days * 86_400_000);
  const prevEnd = start;
  const prevStart = new Date(start.getTime() - def.days * 86_400_000);

  return {
    key: def.key,
    label: def.label,
    bucket: def.bucket,
    start,
    end,
    prevStart,
    prevEnd,
  };
}

/** Percentage change current vs previous; null when previous is 0. */
export function delta(current: number, previous: number): number | null {
  if (previous === 0) return current === 0 ? 0 : null;
  return Math.round(((current - previous) / previous) * 100);
}

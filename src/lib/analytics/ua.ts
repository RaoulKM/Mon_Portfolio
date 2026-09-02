/** Minimal, dependency-free UA classification (spec §22 — coarse, no PII). */

export function parseDevice(ua: string | null): "mobile" | "tablet" | "desktop" {
  if (!ua) return "desktop";
  const s = ua.toLowerCase();
  if (/ipad|tablet|playbook|silk|(android(?!.*mobile))/.test(s)) return "tablet";
  if (/mobi|iphone|ipod|android|blackberry|opera mini|iemobile/.test(s))
    return "mobile";
  return "desktop";
}

export function parseBrowser(ua: string | null): string {
  if (!ua) return "inconnu";
  const s = ua.toLowerCase();
  if (s.includes("edg/")) return "Edge";
  if (s.includes("opr/") || s.includes("opera")) return "Opera";
  if (s.includes("firefox")) return "Firefox";
  if (s.includes("chrome") && !s.includes("chromium")) return "Chrome";
  if (s.includes("safari")) return "Safari";
  return "autre";
}

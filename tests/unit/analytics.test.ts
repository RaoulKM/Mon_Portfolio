import { describe, it, expect } from "vitest";

import { resolveRange, delta, RANGES } from "@/lib/analytics/range";
import { parseDevice, parseBrowser } from "@/lib/analytics/ua";

describe("resolveRange", () => {
  it("defaults to 7 days for an unknown key", () => {
    const r = resolveRange("nope");
    expect(r.key).toBe("7d");
    expect(r.bucket).toBe("day");
  });

  it("honours a valid key and array input", () => {
    expect(resolveRange("30d").key).toBe("30d");
    expect(resolveRange(["1y"]).key).toBe("1y");
  });

  it("previous window is the same length, immediately before", () => {
    const r = resolveRange("7d");
    const cur = r.end.getTime() - r.start.getTime();
    const prev = r.prevEnd.getTime() - r.prevStart.getTime();
    expect(Math.round(prev / 86_400_000)).toBe(7);
    expect(r.prevEnd.getTime()).toBe(r.start.getTime());
    expect(Math.round(cur / 86_400_000)).toBe(7);
  });

  it("exposes every documented range", () => {
    expect(RANGES.map((r) => r.key)).toEqual(["today", "7d", "30d", "90d", "1y"]);
  });
});

describe("delta", () => {
  it("computes a percentage change", () => {
    expect(delta(150, 100)).toBe(50);
    expect(delta(80, 100)).toBe(-20);
  });
  it("returns 0 when both are 0, null when only previous is 0", () => {
    expect(delta(0, 0)).toBe(0);
    expect(delta(5, 0)).toBeNull();
  });
});

describe("parseDevice", () => {
  it("detects mobile / tablet / desktop", () => {
    expect(parseDevice("Mozilla/5.0 (iPhone) Safari")).toBe("mobile");
    expect(parseDevice("Mozilla/5.0 (iPad) Safari")).toBe("tablet");
    expect(parseDevice("Mozilla/5.0 (Windows NT 10.0) Chrome/120")).toBe("desktop");
    expect(parseDevice(null)).toBe("desktop");
  });
});

describe("parseBrowser", () => {
  it("classifies the major engines", () => {
    expect(parseBrowser("... Chrome/120 Safari/537")).toBe("Chrome");
    expect(parseBrowser("... Firefox/121")).toBe("Firefox");
    expect(parseBrowser("... Edg/120")).toBe("Edge");
    expect(parseBrowser("... Version/17 Safari/605")).toBe("Safari");
    expect(parseBrowser(null)).toBe("inconnu");
  });
});

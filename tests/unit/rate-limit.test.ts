import { describe, it, expect } from "vitest";

import { rateLimit, clientIp } from "@/lib/api/rate-limit";

describe("rateLimit", () => {
  it("allows up to `limit` hits then blocks within the window", () => {
    const key = `test:${Math.random()}`;
    const opts = { limit: 3, windowMs: 1000 };
    expect(rateLimit(key, opts).success).toBe(true);
    expect(rateLimit(key, opts).success).toBe(true);
    const third = rateLimit(key, opts);
    expect(third.success).toBe(true);
    expect(third.remaining).toBe(0);
    expect(rateLimit(key, opts).success).toBe(false);
  });

  it("resets after the window elapses", () => {
    const key = `test:${Math.random()}`;
    rateLimit(key, { limit: 1, windowMs: -1 }); // already expired
    expect(rateLimit(key, { limit: 1, windowMs: 1000 }).success).toBe(true);
  });
});

describe("clientIp", () => {
  it("prefers the first x-forwarded-for entry", () => {
    const req = new Request("http://x", {
      headers: { "x-forwarded-for": "1.2.3.4, 5.6.7.8" },
    });
    expect(clientIp(req)).toBe("1.2.3.4");
  });
  it("falls back to unknown", () => {
    expect(clientIp(new Request("http://x"))).toBe("unknown");
  });
});

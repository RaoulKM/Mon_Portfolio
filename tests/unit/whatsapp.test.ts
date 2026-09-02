import { describe, it, expect } from "vitest";

import { buildWhatsappUrl } from "@/lib/whatsapp";

describe("buildWhatsappUrl", () => {
  it("strips non-digits from the number", () => {
    const url = buildWhatsappUrl("+237 6 12 34 56 78", "Salut");
    expect(url).toBe("https://wa.me/237612345678?text=Salut");
  });

  it("url-encodes the message", () => {
    const url = buildWhatsappUrl("237600000000", "Bonjour Raoul & co");
    expect(url).toContain("text=Bonjour%20Raoul%20%26%20co");
  });

  it("falls back to a default message when none given", () => {
    const url = buildWhatsappUrl("237600000000", "");
    expect(url).toContain("text=Bonjour%20Raoul");
  });

  it("returns null for a too-short / missing number", () => {
    expect(buildWhatsappUrl("", "x")).toBeNull();
    expect(buildWhatsappUrl("123", "x")).toBeNull();
    expect(buildWhatsappUrl(null, "x")).toBeNull();
  });
});

import { describe, it, expect } from "vitest";

import { slugify, readingTime, formatDateRange } from "@/lib/utils";

describe("slugify", () => {
  it("lowercases and hyphenates", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });
  it("strips accents and punctuation", () => {
    expect(slugify("Créer  un Projet !")).toBe("creer-un-projet");
  });
  it("trims leading/trailing separators", () => {
    expect(slugify("  --AgriPulse--  ")).toBe("agripulse");
  });
});

describe("readingTime", () => {
  it("returns at least 1 minute", () => {
    expect(readingTime("court")).toBe(1);
  });
  it("scales with word count (~200 wpm)", () => {
    const text = Array.from({ length: 600 }, () => "mot").join(" ");
    expect(readingTime(text)).toBe(3);
  });
});

describe("formatDateRange", () => {
  it("uses 'aujourd'hui' when no end date", () => {
    const out = formatDateRange(new Date("2022-01-01"), null);
    expect(out).toMatch(/janv\.? 2022 — aujourd'hui/);
  });
  it("formats both bounds", () => {
    const out = formatDateRange(new Date("2020-06-01"), new Date("2021-09-01"));
    expect(out).toMatch(/2020 — .*2021/);
  });
});

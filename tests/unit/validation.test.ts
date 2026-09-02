import { describe, it, expect } from "vitest";

import { contactSchema } from "@/lib/validation/contact";
import {
  checkbox,
  listField,
  optionalImageRef,
  slugField,
} from "@/lib/validation/forms";

describe("contactSchema", () => {
  it("accepts a valid message", () => {
    const r = contactSchema.safeParse({
      name: "Jean Test",
      email: "jean@example.com",
      message: "Bonjour, ceci est un message de test assez long.",
    });
    expect(r.success).toBe(true);
  });

  it("rejects a short message and a bad email", () => {
    const r = contactSchema.safeParse({ name: "x", email: "nope", message: "hi" });
    expect(r.success).toBe(false);
  });

  it("allows an empty honeypot but not a filled one shape", () => {
    const base = {
      name: "Jean Test",
      email: "jean@example.com",
      message: "Bonjour, ceci est un message de test assez long.",
    };
    expect(contactSchema.safeParse({ ...base, website: "" }).success).toBe(true);
    expect(contactSchema.safeParse({ ...base, website: "spam" }).success).toBe(false);
  });
});

describe("form helpers", () => {
  it("checkbox coerces presence to boolean", () => {
    expect(checkbox.parse("on")).toBe(true);
    expect(checkbox.parse("true")).toBe(true);
    expect(checkbox.parse(undefined)).toBe(false);
    expect(checkbox.parse("")).toBe(false);
  });

  it("listField splits on newlines/commas and trims", () => {
    expect(listField.parse("a, b\n c ,,")).toEqual(["a", "b", "c"]);
    expect(listField.parse(undefined)).toEqual([]);
  });

  it("optionalImageRef accepts URLs and root-relative paths, rejects junk", () => {
    expect(optionalImageRef.parse("")).toBeUndefined();
    expect(optionalImageRef.parse("/uploads/x.png")).toBe("/uploads/x.png");
    expect(optionalImageRef.parse("https://res.cloudinary.com/a/b.png")).toContain(
      "cloudinary",
    );
    expect(optionalImageRef.safeParse("not a url").success).toBe(false);
  });

  it("slugField normalises and validates", () => {
    expect(slugField.parse("Agri-Pulse")).toBe("agri-pulse");
    expect(slugField.safeParse("bad slug!").success).toBe(false);
  });
});

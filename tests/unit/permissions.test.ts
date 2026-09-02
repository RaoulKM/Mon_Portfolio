import { describe, it, expect } from "vitest";

import { can, permissionsFor, PERMISSIONS } from "@/lib/auth/permissions";

describe("permissions", () => {
  it("SUPER_ADMIN has every permission", () => {
    expect(permissionsFor("SUPER_ADMIN").sort()).toEqual([...PERMISSIONS].sort());
  });

  it("EDITOR can manage content but not users/settings", () => {
    expect(can("EDITOR", "MANAGE_PROJECTS")).toBe(true);
    expect(can("EDITOR", "VIEW_ANALYTICS")).toBe(true);
    expect(can("EDITOR", "MANAGE_USERS")).toBe(false);
    expect(can("EDITOR", "MANAGE_SETTINGS")).toBe(false);
  });

  it("can() is false for an unknown/absent role", () => {
    expect(can(undefined, "VIEW_DASHBOARD")).toBe(false);
    expect(can(null, "VIEW_DASHBOARD")).toBe(false);
  });
});

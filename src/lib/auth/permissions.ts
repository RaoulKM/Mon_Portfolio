import type { Role } from "@prisma/client";

/** Fine-grained permissions (spec §34). */
export const PERMISSIONS = [
  "VIEW_DASHBOARD",
  "MANAGE_PROFILE",
  "MANAGE_PROJECTS",
  "MANAGE_SKILLS",
  "MANAGE_EXPERIENCE",
  "MANAGE_EDUCATION",
  "MANAGE_CERTIFICATIONS",
  "MANAGE_SERVICES",
  "MANAGE_BLOG",
  "MANAGE_TESTIMONIALS",
  "MANAGE_MESSAGES",
  "MANAGE_MEDIA",
  "VIEW_ANALYTICS",
  "MANAGE_SETTINGS",
  "MANAGE_USERS",
  "VIEW_AUDIT_LOGS",
] as const;

export type Permission = (typeof PERMISSIONS)[number];

const EDITOR_PERMISSIONS: Permission[] = [
  "VIEW_DASHBOARD",
  "MANAGE_PROFILE",
  "MANAGE_PROJECTS",
  "MANAGE_SKILLS",
  "MANAGE_EXPERIENCE",
  "MANAGE_EDUCATION",
  "MANAGE_CERTIFICATIONS",
  "MANAGE_SERVICES",
  "MANAGE_BLOG",
  "MANAGE_TESTIMONIALS",
  "MANAGE_MESSAGES",
  "MANAGE_MEDIA",
  "VIEW_ANALYTICS",
];

const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  SUPER_ADMIN: [...PERMISSIONS],
  EDITOR: EDITOR_PERMISSIONS,
};

export function permissionsFor(role: Role): Permission[] {
  return ROLE_PERMISSIONS[role] ?? [];
}

export function can(role: Role | undefined | null, permission: Permission): boolean {
  if (!role) return false;
  return permissionsFor(role).includes(permission);
}

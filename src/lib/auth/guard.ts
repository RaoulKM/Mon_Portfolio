import "server-only";
import { redirect } from "next/navigation";

import { auth } from "./index";
import { can, type Permission } from "./permissions";

/**
 * Require an authenticated admin in a Server Component / Server Action.
 * Redirects to the login page when absent.
 */
export async function requireUser() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");
  return session.user;
}

export async function requirePermission(permission: Permission) {
  const user = await requireUser();
  if (!can(user.role, permission)) redirect("/admin/dashboard");
  return user;
}

/**
 * Guard for Route Handlers. Returns the user, or `null` — caller should
 * respond with `unauthorized()` / `forbidden()`.
 */
export async function apiUser() {
  const session = await auth();
  return session?.user ?? null;
}

export async function apiRequire(permission: Permission) {
  const user = await apiUser();
  if (!user) return { user: null, error: "unauthorized" as const };
  if (!can(user.role, permission)) {
    return { user: null, error: "forbidden" as const };
  }
  return { user, error: null };
}

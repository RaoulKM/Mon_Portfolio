"use server";

import { prisma } from "@/lib/prisma";
import { runAction, type ActionResult } from "@/lib/admin/action";
import { profileFormSchema } from "@/lib/validation/admin";

const REVALIDATE = ["/", "/about", "/contact", "/admin/profile"];

export async function saveProfile(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  // Social links arrive as parallel arrays, handled outside the object schema.
  const platforms = formData.getAll("social_platform").map(String);
  const urls = formData.getAll("social_url").map(String);
  const icons = formData.getAll("social_icon").map(String);
  const socialLinks = platforms
    .map((platform, i) => ({
      platform: platform.trim(),
      url: (urls[i] ?? "").trim(),
      icon: (icons[i] ?? "").trim().toLowerCase(),
    }))
    .filter((s) => s.platform && s.url)
    .map((s, i) => ({
      ...s,
      displayOrder: i,
      icon: s.icon || s.platform.toLowerCase(),
    }));

  return runAction(
    {
      permission: "MANAGE_PROFILE",
      schema: profileFormSchema,
      formData,
      audit: { action: "PROFILE_UPDATED", entity: "Profile" },
      revalidate: REVALIDATE,
    },
    async (data) => {
      const existing = await prisma.profile.findFirst({ where: { isPrimary: true } });

      if (existing) {
        return prisma.profile.update({
          where: { id: existing.id },
          data: {
            ...data,
            socialLinks: {
              deleteMany: {},
              create: socialLinks,
            },
          },
        });
      }

      return prisma.profile.create({
        data: {
          ...data,
          isPrimary: true,
          socialLinks: { create: socialLinks },
        },
      });
    },
  );
}

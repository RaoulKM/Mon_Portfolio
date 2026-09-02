import "server-only";
import { cache } from "react";

import { prisma } from "@/lib/prisma";

export type ProfileWithLinks = NonNullable<
  Awaited<ReturnType<typeof loadProfile>>
>;

async function loadProfile() {
  return prisma.profile.findFirst({
    where: { isPrimary: true },
    include: {
      socialLinks: {
        where: { isVisible: true },
        orderBy: { displayOrder: "asc" },
      },
    },
  });
}

/** Primary profile + visible social links, or `null` if none / DB unavailable. */
export const getProfile = cache(async () => {
  try {
    return await loadProfile();
  } catch {
    return null;
  }
});

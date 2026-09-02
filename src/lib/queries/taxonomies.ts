import "server-only";
import { cache } from "react";

import { prisma } from "@/lib/prisma";

export const getTechnologies = cache(async () => {
  try {
    return await prisma.technology.findMany({ orderBy: { name: "asc" } });
  } catch {
    return [];
  }
});

export const getCategories = cache(async () => {
  try {
    return await prisma.category.findMany({ orderBy: { name: "asc" } });
  } catch {
    return [];
  }
});

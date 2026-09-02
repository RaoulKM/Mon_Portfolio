import "server-only";
import { cache } from "react";
import type { Experience, Education, Certification, Service } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export const getExperiences = cache(async (): Promise<Experience[]> => {
  try {
    return await prisma.experience.findMany({
      where: { isVisible: true },
      orderBy: [{ isCurrent: "desc" }, { startDate: "desc" }, { displayOrder: "asc" }],
    });
  } catch {
    return [];
  }
});

export const getEducation = cache(async (): Promise<Education[]> => {
  try {
    return await prisma.education.findMany({
      where: { isVisible: true },
      orderBy: [{ startDate: "desc" }, { displayOrder: "asc" }],
    });
  } catch {
    return [];
  }
});

export const getCertifications = cache(async (): Promise<Certification[]> => {
  try {
    return await prisma.certification.findMany({
      where: { isVisible: true },
      orderBy: [{ issueDate: "desc" }, { displayOrder: "asc" }],
    });
  } catch {
    return [];
  }
});

export const getServices = cache(async (): Promise<Service[]> => {
  try {
    return await prisma.service.findMany({
      where: { isVisible: true },
      orderBy: [{ featured: "desc" }, { displayOrder: "asc" }],
    });
  } catch {
    return [];
  }
});

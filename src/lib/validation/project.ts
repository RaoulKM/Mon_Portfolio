import { z } from "zod";
import { slug } from "./common";

export const projectStatus = z.enum([
  "PLANNED",
  "IN_PROGRESS",
  "COMPLETED",
  "MAINTENANCE",
  "ARCHIVED",
]);

export const projectSchema = z.object({
  title: z.string().trim().min(2).max(160),
  slug,
  shortDescription: z.string().trim().min(10).max(300),
  description: z.string().trim().min(10),
  problem: z.string().trim().optional().or(z.literal("")),
  solution: z.string().trim().optional().or(z.literal("")),
  architecture: z.string().trim().optional().or(z.literal("")),
  challenges: z.string().trim().optional().or(z.literal("")),
  results: z.string().trim().optional().or(z.literal("")),
  coverImage: z.string().url().optional().or(z.literal("")),
  gallery: z.array(z.string().url()).default([]),
  githubUrl: z.string().url().optional().or(z.literal("")),
  liveUrl: z.string().url().optional().or(z.literal("")),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  status: projectStatus.default("IN_PROGRESS"),
  featured: z.boolean().default(false),
  isPublished: z.boolean().default(false),
  displayOrder: z.number().int().min(0).default(0),
  categoryId: z.string().cuid().optional(),
  technologyIds: z.array(z.string().cuid()).default([]),
  seoTitle: z.string().max(160).optional().or(z.literal("")),
  seoDescription: z.string().max(300).optional().or(z.literal("")),
});
export type ProjectInput = z.infer<typeof projectSchema>;

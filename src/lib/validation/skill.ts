import { z } from "zod";

export const skillCategory = z.enum([
  "FRONTEND",
  "BACKEND",
  "DATABASE",
  "DEVOPS",
  "AI",
  "MOBILE",
  "OTHER",
]);

export const skillSchema = z.object({
  name: z.string().trim().min(1).max(80),
  category: skillCategory,
  level: z.number().int().min(0).max(100).default(50),
  years: z.number().min(0).max(50).optional(),
  icon: z.string().max(80).optional().or(z.literal("")),
  color: z.string().max(24).optional().or(z.literal("")),
  description: z.string().trim().max(500).optional().or(z.literal("")),
  displayOrder: z.number().int().min(0).default(0),
  isVisible: z.boolean().default(true),
});
export type SkillInput = z.infer<typeof skillSchema>;

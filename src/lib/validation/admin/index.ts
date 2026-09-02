import { z } from "zod";
import {
  checkbox,
  intField,
  listField,
  optionalDate,
  optionalFloat,
  optionalId,
  optionalText,
  optionalUrl,
  requiredText,
  slugField,
} from "@/lib/validation/forms";

// --- Project (spec §10, §23) ---------------------------------------------
export const projectFormSchema = z.object({
  title: requiredText(2, 160),
  slug: slugField,
  shortDescription: requiredText(10, 300),
  description: requiredText(10),
  problem: optionalText,
  solution: optionalText,
  architecture: optionalText,
  challenges: optionalText,
  results: optionalText,
  coverImage: optionalUrl,
  gallery: listField,
  githubUrl: optionalUrl,
  liveUrl: optionalUrl,
  startDate: optionalDate,
  endDate: optionalDate,
  status: z.enum(["PLANNED", "IN_PROGRESS", "COMPLETED", "MAINTENANCE", "ARCHIVED"]),
  featured: checkbox,
  isPublished: checkbox,
  displayOrder: intField(0, 9999),
  categoryId: optionalId,
  technologyIds: z
    .union([z.string(), z.array(z.string())])
    .optional()
    .transform((v) => (Array.isArray(v) ? v : v ? [v] : [])),
  seoTitle: optionalText,
  seoDescription: optionalText,
});
export type ProjectFormInput = z.infer<typeof projectFormSchema>;

// --- Skill (spec §9, §24) ----------------------------------------------
export const skillFormSchema = z.object({
  name: requiredText(1, 80),
  category: z.enum(["FRONTEND", "BACKEND", "DATABASE", "DEVOPS", "AI", "MOBILE", "OTHER"]),
  level: intField(0, 100),
  years: optionalFloat,
  icon: optionalText,
  color: optionalText,
  description: optionalText,
  displayOrder: intField(0, 9999),
  isVisible: checkbox,
});
export type SkillFormInput = z.infer<typeof skillFormSchema>;

// --- Experience (spec §12) -------------------------------------------
export const experienceFormSchema = z.object({
  company: requiredText(1, 160),
  position: requiredText(1, 160),
  location: optionalText,
  startDate: optionalDate.pipe(z.date({ message: "Date de début requise" })),
  endDate: optionalDate,
  description: optionalText,
  responsibilities: listField,
  technologies: listField,
  logo: optionalUrl,
  isCurrent: checkbox,
  isVisible: checkbox,
  displayOrder: intField(0, 9999),
});
export type ExperienceFormInput = z.infer<typeof experienceFormSchema>;

// --- Education (spec §13) ------------------------------------------
export const educationFormSchema = z.object({
  institution: requiredText(1, 160),
  degree: requiredText(1, 160),
  field: optionalText,
  startDate: optionalDate.pipe(z.date({ message: "Date de début requise" })),
  endDate: optionalDate,
  description: optionalText,
  location: optionalText,
  logo: optionalUrl,
  isVisible: checkbox,
  displayOrder: intField(0, 9999),
});
export type EducationFormInput = z.infer<typeof educationFormSchema>;

// --- Certification (spec §14) -----------------------------------
export const certificationFormSchema = z.object({
  name: requiredText(1, 200),
  issuer: requiredText(1, 160),
  issueDate: optionalDate.pipe(z.date({ message: "Date d'obtention requise" })),
  expirationDate: optionalDate,
  credentialId: optionalText,
  credentialUrl: optionalUrl,
  certificateImage: optionalUrl,
  description: optionalText,
  isVisible: checkbox,
  displayOrder: intField(0, 9999),
});
export type CertificationFormInput = z.infer<typeof certificationFormSchema>;

// --- Service (spec §15) ----------------------------------------
export const serviceFormSchema = z.object({
  title: requiredText(1, 160),
  slug: slugField,
  description: requiredText(10),
  icon: optionalText,
  features: listField,
  price: optionalText,
  featured: checkbox,
  isVisible: checkbox,
  displayOrder: intField(0, 9999),
});
export type ServiceFormInput = z.infer<typeof serviceFormSchema>;

// --- Profile (spec §8, §25) ----------------------------------
export const profileFormSchema = z.object({
  fullName: requiredText(2, 160),
  headline: requiredText(2, 200),
  shortBio: requiredText(10, 400),
  bio: requiredText(10),
  philosophy: optionalText,
  objectives: optionalText,
  avatarUrl: optionalUrl,
  location: optionalText,
  availability: optionalText,
  yearsOfExperience: intField(0, 80),
  projectsCount: intField(0, 9999),
  technologiesCount: intField(0, 9999),
  certificationsCount: intField(0, 9999),
  email: z.string().trim().email("Email invalide").optional().or(z.literal("").transform(() => undefined)),
  phone: optionalText,
  cvUrlFr: optionalUrl,
  cvUrlEn: optionalUrl,
});
export type ProfileFormInput = z.infer<typeof profileFormSchema>;

// --- Media (spec §26) -------------------------------------
export const mediaFormSchema = z.object({
  filename: requiredText(1, 200),
  url: z.string().trim().url("URL invalide"),
  mimeType: requiredText(1, 100),
  size: intField(0, 1_000_000_000),
  alt: optionalText,
  folder: optionalText,
});
export type MediaFormInput = z.infer<typeof mediaFormSchema>;

// --- Message status update (spec §19) --------------------
export const messageStatusSchema = z.object({
  id: z.string().min(1),
  status: z.enum(["UNREAD", "READ", "ARCHIVED", "SPAM"]),
});

// --- Generic id / reorder ---------------------------------
export const idSchema = z.object({ id: z.string().min(1) });
export const reorderSchema = z.object({
  ids: z.union([z.string(), z.array(z.string())]).transform((v) => (Array.isArray(v) ? v : [v])),
});

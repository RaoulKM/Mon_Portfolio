import { config as loadEnv } from "dotenv";
import { PrismaClient, type Prisma } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

// Match prisma.config.ts: .env.local overrides .env so `npm run db:seed`
// targets the same database as `prisma migrate`.
loadEnv({ path: [".env.local", ".env"], quiet: true });

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL is not set");

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

/**
 * Seed data — snapshot of the live portfolio content (spec §49).
 * Idempotent: collections are only populated when empty; the profile,
 * technologies, the AgriPulse project and site settings are upserted.
 *
 * Note: a few `/uploads/…` paths point at files uploaded locally through
 * the admin. On a fresh clone they 404 until you re-upload — replace them
 * (or the Cloudinary URLs) from `/admin`.
 */
async function main() {
  // --- Admin user (spec §34) -----------------------------------------
  const email = process.env.SEED_ADMIN_EMAIL ?? "admin@example.com";
  const password = process.env.SEED_ADMIN_PASSWORD ?? "ChangeMe_12345";
  const name = process.env.SEED_ADMIN_NAME ?? "KOM MBOUME PIERRE RAOUL";

  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.user.upsert({
    where: { email },
    update: { passwordHash, role: "SUPER_ADMIN", name },
    create: { email, name, passwordHash, role: "SUPER_ADMIN" },
  });
  console.log(`✓ Admin: ${email}`);

  // --- Profile + social links (§8, §25) ----------------------------
  const existingProfile = await prisma.profile.findFirst({ where: { isPrimary: true } });
  const profileData = {
    fullName: "KOM MBOUME PIERRE RAOUL",
    headline: "Développeur Full-Stack / Software Engineer",
    shortBio:
      "Je conçois des applications web modernes, des SaaS et des solutions numériques évolutives.",
    bio: "Développeur Full-Stack orienté produits numériques, SaaS, architecture logicielle et IA. J'aime construire et maintenir des applications complètes, de la base de données au déploiement.",
    philosophy:
      "Privilégier une architecture propre, maintenable et évolutive plutôt qu'une accumulation de fonctionnalités.",
    objectives: "Mettre le numérique au service du quotidien.",
    location: "Cameroun",
    availability: "Ouvert aux opportunités",
    yearsOfExperience: 1,
    projectsCount: 3,
    technologiesCount: 15,
    certificationsCount: 2,
    email: "kommboumepierreraoul@gmail.com",
    phone: "699885533",
    whatsappNumber: "+237 6 98 55 53 74",
    whatsappMessage: "Bonjour Raoul, je vous contacte au sujet de ",
    // Committed static asset (public/documents/) so it deploys with the app.
    cvUrlFr: "/documents/cv-kom-mboume-pierre-raoul-fr.pdf",
  } satisfies Prisma.ProfileUpdateInput;

  const socialLinks = [
    { platform: "GitHub", url: "https://github.com/", icon: "github", displayOrder: 0 },
    { platform: "LinkedIn", url: "https://www.linkedin.com/", icon: "linkedin", displayOrder: 1 },
    { platform: "Facebook", url: "https://facebook.com", icon: "facebook", displayOrder: 2 },
  ];

  if (existingProfile) {
    await prisma.profile.update({
      where: { id: existingProfile.id },
      data: {
        ...profileData,
        socialLinks: { deleteMany: {}, create: socialLinks },
      },
    });
  } else {
    await prisma.profile.create({
      data: {
        ...profileData,
        isPrimary: true,
        socialLinks: { create: socialLinks },
      },
    });
  }
  console.log("✓ Profile + 3 social links");

  // --- Technologies (§10) ----------------------------------------
  const techs: Prisma.TechnologyCreateInput[] = [
    { name: "Next.js", slug: "nextjs", category: "FRONTEND", color: "#000000" },
    { name: "React", slug: "react", category: "FRONTEND", color: "#61DAFB" },
    { name: "TypeScript", slug: "typescript", category: "FRONTEND", color: "#3178C6" },
    { name: "Tailwind CSS", slug: "tailwindcss", category: "FRONTEND", color: "#06B6D4" },
    { name: "Laravel", slug: "laravel", category: "BACKEND", color: "#FF2D20" },
    { name: "Node.js", slug: "nodejs", category: "BACKEND", color: "#339933" },
    { name: "NestJS", slug: "nestjs", category: "BACKEND", color: "#E0234E" },
    { name: "PostgreSQL", slug: "postgresql", category: "DATABASE", color: "#4169E1" },
    { name: "Prisma", slug: "prisma", category: "DATABASE", color: "#2D3748" },
    { name: "Docker", slug: "docker", category: "DEVOPS", color: "#2496ED" },
    { name: "PostGIS", slug: "postgis", category: "DATABASE", color: "#4169E1" },
    { name: "OpenAI", slug: "openai", category: "AI", color: "#412991" },
  ];
  for (const t of techs) {
    await prisma.technology.upsert({ where: { slug: t.slug }, update: {}, create: t });
  }
  console.log(`✓ ${techs.length} technologies`);

  // --- Skills (§9) ---------------------------------------------
  const skills: Prisma.SkillCreateManyInput[] = [
    { name: "Next.js", category: "FRONTEND", level: 90, displayOrder: 0 },
    { name: "React", category: "FRONTEND", level: 90, displayOrder: 1 },
    { name: "TypeScript", category: "FRONTEND", level: 85, displayOrder: 2 },
    { name: "Tailwind CSS", category: "FRONTEND", level: 88, displayOrder: 3 },
    {
      name: "HTML",
      category: "FRONTEND",
      level: 95,
      years: 3,
      icon: "ChevronRight",
      color: "#3bf7af",
      description: "Langage de base",
      displayOrder: 4,
    },
    { name: "Laravel", category: "BACKEND", level: 90, displayOrder: 0 },
    { name: "Node.js", category: "BACKEND", level: 75, displayOrder: 1 },
    { name: "REST API", category: "BACKEND", level: 85, displayOrder: 2 },
    { name: "PostgreSQL", category: "DATABASE", level: 82, displayOrder: 0 },
    { name: "Prisma", category: "DATABASE", level: 85, displayOrder: 1 },
    { name: "Docker", category: "DEVOPS", level: 70, displayOrder: 0 },
    {
      name: "Git / GitHub",
      category: "DEVOPS",
      level: 88,
      icon: "GitBranch",
      color: "#d301ef",
      displayOrder: 1,
    },
    { name: "CI/CD", category: "DEVOPS", level: 65, displayOrder: 2 },
    {
      name: "Versioning",
      category: "DEVOPS",
      level: 80,
      years: 2,
      icon: "GitFork",
      color: "#b53bf7",
      description: "Gestion des versions de projet avec Git / GitHub",
      displayOrder: 3,
    },
    { name: "AI APIs", category: "AI", level: 70, displayOrder: 0 },
    { name: "AI moderation", category: "AI", level: 65, displayOrder: 1 },
  ];
  if ((await prisma.skill.count()) === 0) {
    await prisma.skill.createMany({ data: skills });
    console.log(`✓ ${skills.length} skills`);
  }

  // --- Featured project: AgriPulse (§10) -----------------------
  await prisma.project.upsert({
    where: { slug: "agripulse" },
    update: {},
    create: {
      title: "AgriPulse",
      slug: "agripulse",
      shortDescription: "Plateforme communautaire agricole SaaS.",
      description:
        "Plateforme SaaS agricole : communauté, marketplace, missions, messagerie, notifications, IA, modération et cartographie.",
      problem: "Fragmentation des échanges et du marché entre acteurs agricoles.",
      solution: "Une plateforme unifiée mêlant communauté, marketplace et missions.",
      architecture:
        "Next.js + Laravel API + PostgreSQL/PostGIS, conteneurisé avec Docker.",
      coverImage:
        "https://res.cloudinary.com/trveepjk/image/upload/v1788370897/portfolio/ymtvkyzbykzn3tajj9dm.png",
      gallery: [
        "/uploads/capture-d-cran-2026-07-06-023652-41cc1ddb.png",
        "/uploads/capture-d-cran-2026-07-06-004720-57881e22.png",
        "/uploads/capture-d-cran-2026-07-06-004659-3f3ad5e4.png",
        "/uploads/capture-d-cran-2026-07-05-225703-dfcb4833.png",
        "/uploads/capture-d-cran-2026-07-05-224835-57eed2f8.png",
        "/uploads/capture-d-cran-2026-07-05-224818-0b020642.png",
        "/uploads/capture-d-cran-2026-07-05-224504-c30b2aaf.png",
        "/uploads/capture-d-cran-2026-07-05-224151-004801fb.png",
        "/uploads/capture-d-cran-2026-07-05-224053-6b9a140a.png",
      ],
      liveUrl: "https://agripulse237.site",
      status: "IN_PROGRESS",
      featured: true,
      isPublished: true,
      displayOrder: 0,
      technologies: {
        connect: [
          { slug: "nextjs" },
          { slug: "laravel" },
          { slug: "postgresql" },
          { slug: "docker" },
          { slug: "postgis" },
          { slug: "openai" },
        ],
      },
    },
  });
  console.log("✓ Project: AgriPulse");

  // --- Education (§13) ---------------------------------------
  if ((await prisma.education.count()) === 0) {
    await prisma.education.createMany({
      data: [
        {
          institution: "Lycée Classique de Bafoussam",
          degree: "Baccalauréat",
          field: "Scientifique (C)",
          startDate: new Date("2022-09-07"),
          endDate: new Date("2023-07-31"),
          description: "Mention Bien",
          location: "Bafoussam, Cameroun",
          logo: "/uploads/whatsapp-image-2025-01-02-at-5-23-32-pm-removebg-preview-1-244660b6.png",
          displayOrder: 0,
        },
        {
          institution: "IUT FOTSO Victor Bandjoun",
          degree: "DUT Génie Logiciel",
          field: "Génie Logiciel",
          startDate: new Date("2024-09-01"),
          endDate: new Date("2025-07-01"),
          description: "Mention Bien",
          location: "Bandjoun, Cameroun",
          displayOrder: 1,
        },
        {
          institution: "IUT FOTSO Victor Bandjoun",
          degree: "Licence Technologique Génie Logiciel",
          field: "Génie Logiciel",
          startDate: new Date("2025-09-01"),
          endDate: new Date("2026-07-01"),
          location: "Bandjoun, Cameroun",
          displayOrder: 2,
        },
      ],
    });
    console.log("✓ 3 education entries");
  }

  // --- Services (§15) ---------------------------------------
  if ((await prisma.service.count()) === 0) {
    await prisma.service.createMany({
      data: [
        {
          title: "Développement Web",
          slug: "developpement-web",
          description: "Applications modernes avec Next.js, React et Laravel.",
          icon: "Code",
          features: ["Next.js / React", "Laravel", "TypeScript", "HTML", "CSS", "JavaScript"],
          featured: true,
          displayOrder: 0,
        },
        {
          title: "API & Backend",
          slug: "api-backend",
          description: "Conception d'API REST robustes et sécurisées.",
          icon: "Server",
          features: ["REST", "Auth", "Validation"],
          displayOrder: 1,
        },
        {
          title: "SaaS",
          slug: "saas",
          description: "Conception d'architectures SaaS complètes.",
          icon: "Layers",
          features: ["Multi-tenant", "Billing", "Analytics"],
          displayOrder: 2,
        },
        {
          title: "AI Integration",
          slug: "ai-integration",
          description: "Intégration d'assistants IA, automatisation et modération.",
          icon: "Sparkles",
          features: ["OpenAI", "Modération", "Assistants"],
          displayOrder: 3,
        },
        {
          title: "DevOps",
          slug: "devops",
          description: "Docker, déploiement, VPS et CI/CD.",
          icon: "Container",
          features: ["Docker", "CI/CD", "VPS"],
          displayOrder: 4,
        },
      ],
    });
    console.log("✓ 5 services");
  }

  // --- Site settings (§27) ---------------------------------
  const settings: Array<[string, Prisma.InputJsonValue]> = [
    [
      "general",
      {
        siteName: "KOM MBOUME PIERRE RAOUL",
        timezone: "Africa/Douala",
        language: "fr",
      },
    ],
    [
      "seo",
      {
        defaultTitle: "KOM MBOUME PIERRE RAOUL — Développeur Full-Stack",
        keywords: ["Next.js", "Laravel", "Full-Stack"],
      },
    ],
    [
      "social",
      { github: "https://github.com/", linkedin: "https://www.linkedin.com/" },
    ],
    [
      "contact",
      {
        contactEmail: "kommboumepierreraoul@gmail.com",
        notificationEmail: "kommboumepierreraoul@gmail.com",
      },
    ],
  ];
  for (const [key, value] of settings) {
    await prisma.siteSetting.upsert({ where: { key }, update: { value }, create: { key, value } });
  }
  console.log(`✓ ${settings.length} site settings`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

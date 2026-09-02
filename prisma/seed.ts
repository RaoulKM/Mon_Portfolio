import "dotenv/config";
import { PrismaClient, type Prisma } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL is not set");

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

async function main() {
  // --- Admin user (spec §34, §49) ---------------------------------------
  const email = process.env.SEED_ADMIN_EMAIL ?? "admin@example.com";
  const password = process.env.SEED_ADMIN_PASSWORD ?? "ChangeMe_12345";
  const name = process.env.SEED_ADMIN_NAME ?? "Administrateur";

  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.user.upsert({
    where: { email },
    update: { passwordHash, role: "SUPER_ADMIN", name },
    create: { email, name, passwordHash, role: "SUPER_ADMIN" },
  });
  console.log(`✓ Admin: ${email}`);

  // --- Profile + social links -----------------------------------------
  const existingProfile = await prisma.profile.findFirst({ where: { isPrimary: true } });
  if (!existingProfile) {
    await prisma.profile.create({
      data: {
        fullName: "KOM MBOUME PIERRE RAOUL",
        headline: "Développeur Full-Stack / Software Engineer",
        shortBio:
          "Je conçois des applications web modernes, des SaaS et des solutions numériques évolutives.",
        bio: "Développeur Full-Stack orienté produits numériques, SaaS, architecture logicielle et IA. J'aime construire et maintenir des applications complètes, de la base de données au déploiement.",
        philosophy:
          "Privilégier une architecture propre, maintenable et évolutive plutôt qu'une accumulation de fonctionnalités.",
        location: "Cameroun",
        availability: "Ouvert aux opportunités",
        yearsOfExperience: 3,
        projectsCount: 20,
        technologiesCount: 15,
        certificationsCount: 2,
        email: "kommboumepierreraoul@gmail.com",
        socialLinks: {
          create: [
            { platform: "GitHub", url: "https://github.com/", icon: "github", displayOrder: 0 },
            { platform: "LinkedIn", url: "https://www.linkedin.com/", icon: "linkedin", displayOrder: 1 },
          ],
        },
      },
    });
    console.log("✓ Profile");
  }

  // --- Technologies ---------------------------------------------------
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

  // --- Skills (spec §9) ---------------------------------------------
  const skills: Prisma.SkillCreateManyInput[] = [
    { name: "Next.js", category: "FRONTEND", level: 90, displayOrder: 0 },
    { name: "React", category: "FRONTEND", level: 90, displayOrder: 1 },
    { name: "TypeScript", category: "FRONTEND", level: 85, displayOrder: 2 },
    { name: "Tailwind CSS", category: "FRONTEND", level: 88, displayOrder: 3 },
    { name: "Laravel", category: "BACKEND", level: 90, displayOrder: 0 },
    { name: "Node.js", category: "BACKEND", level: 75, displayOrder: 1 },
    { name: "REST API", category: "BACKEND", level: 85, displayOrder: 2 },
    { name: "PostgreSQL", category: "DATABASE", level: 82, displayOrder: 0 },
    { name: "Prisma", category: "DATABASE", level: 85, displayOrder: 1 },
    { name: "Docker", category: "DEVOPS", level: 70, displayOrder: 0 },
    { name: "Git / GitHub", category: "DEVOPS", level: 88, displayOrder: 1 },
    { name: "CI/CD", category: "DEVOPS", level: 65, displayOrder: 2 },
    { name: "AI APIs", category: "AI", level: 70, displayOrder: 0 },
    { name: "AI moderation", category: "AI", level: 65, displayOrder: 1 },
  ];
  if ((await prisma.skill.count()) === 0) {
    await prisma.skill.createMany({ data: skills });
    console.log(`✓ ${skills.length} skills`);
  }

  // --- Featured project: AgriPulse (spec §10) ----------------------
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
      architecture: "Next.js + Laravel API + PostgreSQL/PostGIS, conteneurisé avec Docker.",
      status: "IN_PROGRESS",
      featured: true,
      isPublished: true,
      displayOrder: 0,
      technologies: {
        connect: [
          { slug: "nextjs" },
          { slug: "laravel" },
          { slug: "postgresql" },
          { slug: "postgis" },
          { slug: "openai" },
          { slug: "docker" },
        ],
      },
    },
  });
  console.log("✓ Project: AgriPulse");

  // --- Experience / Education / Certifications / Services ---------
  if ((await prisma.education.count()) === 0) {
    await prisma.education.createMany({
      data: [
        {
          institution: "IUT",
          degree: "DUT Génie Logiciel",
          field: "Génie Logiciel",
          startDate: new Date("2019-09-01"),
          endDate: new Date("2021-07-01"),
          displayOrder: 0,
        },
        {
          institution: "Université",
          degree: "Licence Technologique Génie Logiciel",
          field: "Génie Logiciel",
          startDate: new Date("2021-09-01"),
          endDate: new Date("2022-07-01"),
          displayOrder: 1,
        },
      ],
    });
    console.log("✓ Education");
  }

  if ((await prisma.service.count()) === 0) {
    await prisma.service.createMany({
      data: [
        {
          title: "Développement Web",
          slug: "developpement-web",
          description: "Applications modernes avec Next.js, React et Laravel.",
          icon: "Code",
          features: ["Next.js / React", "Laravel", "TypeScript"],
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
    console.log("✓ Services");
  }

  // --- Site settings (spec §27) ----------------------------------
  const settings: Array<[string, Prisma.InputJsonValue]> = [
    ["general", { siteName: "KOM MBOUME PIERRE RAOUL", timezone: "Africa/Douala", language: "fr" }],
    ["seo", { defaultTitle: "KOM MBOUME PIERRE RAOUL — Développeur Full-Stack", keywords: ["Next.js", "Laravel", "Full-Stack"] }],
    ["social", { github: "https://github.com/", linkedin: "https://www.linkedin.com/" }],
    ["contact", { contactEmail: "kommboumepierreraoul@gmail.com", notificationEmail: "kommboumepierreraoul@gmail.com" }],
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

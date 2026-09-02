export const siteConfig = {
  name: "KOM MBOUME PIERRE RAOUL",
  shortName: "KMPR",
  title: "KOM MBOUME PIERRE RAOUL — Développeur Full-Stack",
  description:
    "Je conçois des applications web modernes, des SaaS et des solutions numériques évolutives avec Next.js, Laravel, React et TypeScript.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "fr-FR",
  defaultOgImage: "/og.png",
} as const;

/** Public navigation (spec §32). */
export const publicNav = [
  { label: "Accueil", href: "/" },
  { label: "À propos", href: "/about" },
  { label: "Projets", href: "/projects" },
  { label: "Compétences", href: "/skills" },
  { label: "Expérience", href: "/experience" },
  { label: "Formation", href: "/education" },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

/** Admin sidebar (spec §33). */
export const adminNav = [
  {
    group: null,
    items: [{ label: "Dashboard", href: "/admin/dashboard", icon: "LayoutDashboard" }],
  },
  {
    group: "Contenu",
    items: [
      { label: "Profil", href: "/admin/profile", icon: "User" },
      { label: "Projets", href: "/admin/projects", icon: "FolderGit2" },
      { label: "Compétences", href: "/admin/skills", icon: "Sparkles" },
      { label: "Expériences", href: "/admin/experience", icon: "Briefcase" },
      { label: "Formation", href: "/admin/education", icon: "GraduationCap" },
      { label: "Certifications", href: "/admin/certifications", icon: "BadgeCheck" },
      { label: "Services", href: "/admin/services", icon: "Handshake" },
      { label: "Blog", href: "/admin/blog", icon: "Newspaper" },
      { label: "Témoignages", href: "/admin/testimonials", icon: "Quote" },
    ],
  },
  {
    group: "Communication",
    items: [
      { label: "Messages", href: "/admin/messages", icon: "Mail" },
      { label: "Médias", href: "/admin/media", icon: "Image" },
    ],
  },
  {
    group: "Analytics",
    items: [{ label: "Statistiques", href: "/admin/analytics", icon: "BarChart3" }],
  },
  {
    group: "Système",
    items: [
      { label: "Mon compte", href: "/admin/account", icon: "KeyRound" },
      { label: "Paramètres", href: "/admin/settings", icon: "Settings" },
      { label: "Utilisateurs", href: "/admin/users", icon: "Users" },
      { label: "Audit Logs", href: "/admin/audit-logs", icon: "ScrollText" },
    ],
  },
] as const;

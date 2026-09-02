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

/** Public navigation (spec §32) — a few links are grouped to declutter.
 *  `key` maps to `dictionary.nav.*` for i18n; `label` is the FR fallback. */
type NavKey =
  | "home"
  | "profile"
  | "about"
  | "skills"
  | "experience"
  | "education"
  | "projects"
  | "services"
  | "blog"
  | "contact";

export type NavChild = { key: NavKey; label: string; href: string; desc?: string };
export type NavNode = {
  key: NavKey;
  label: string;
  href: string;
  children?: readonly NavChild[];
};

export const publicNav: readonly NavNode[] = [
  { key: "home", label: "Accueil", href: "/" },
  {
    key: "profile",
    label: "Profil",
    href: "/about",
    children: [
      { key: "about", label: "À propos", href: "/about", desc: "Parcours, philosophie, objectifs" },
      { key: "skills", label: "Compétences", href: "/skills", desc: "Stack technique par domaine" },
      { key: "experience", label: "Expérience", href: "/experience", desc: "Parcours professionnel" },
      { key: "education", label: "Formation", href: "/education", desc: "Diplômes & certifications" },
    ],
  },
  { key: "projects", label: "Projets", href: "/projects" },
  { key: "services", label: "Services", href: "/services" },
  { key: "blog", label: "Blog", href: "/blog" },
  { key: "contact", label: "Contact", href: "/contact" },
] as const;

/** Flat, de-duplicated list of every public URL (sitemap, footer). */
export const flatNav: string[] = Array.from(
  new Set(
    publicNav.flatMap((n) => [n.href, ...(n.children?.map((c) => c.href) ?? [])]),
  ),
);

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
      { label: "CV", href: "/admin/cv", icon: "FileText" },
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

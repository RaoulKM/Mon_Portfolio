import { siteConfig } from "@/config/site";
import type { ProfileWithLinks, ProjectDetail } from "@/lib/queries";

/** Render a JSON-LD script tag. */
function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function PersonJsonLd({ profile }: { profile: ProfileWithLinks | null }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Person",
        name: profile?.fullName ?? siteConfig.name,
        jobTitle: profile?.headline ?? "Développeur Full-Stack",
        description: profile?.shortBio ?? siteConfig.description,
        url: siteConfig.url,
        email: profile?.email ?? undefined,
        image: profile?.avatarUrl ?? undefined,
        sameAs: profile?.socialLinks?.map((s) => s.url) ?? [],
      }}
    />
  );
}

export function WebSiteJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: siteConfig.name,
        url: siteConfig.url,
      }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((it, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: it.name,
          item: `${siteConfig.url}${it.url}`,
        })),
      }}
    />
  );
}

export function ProjectJsonLd({ project }: { project: ProjectDetail }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: project.title,
        description: project.shortDescription,
        url: `${siteConfig.url}/projects/${project.slug}`,
        image: project.coverImage ?? undefined,
        keywords: project.technologies.map((t) => t.name).join(", "),
        dateCreated: project.startDate?.toISOString(),
        dateModified: project.updatedAt.toISOString(),
      }}
    />
  );
}

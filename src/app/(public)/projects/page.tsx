import type { Metadata } from "next";

import { pageMetadata } from "@/lib/seo/metadata";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { ProjectsExplorer } from "@/components/public/projects-explorer";
import { FadeUp } from "@/components/motion/reveal";
import { BreadcrumbJsonLd } from "@/lib/seo/jsonld";
import { getPublishedProjects } from "@/lib/queries";
import { getDictionary, getLocale, getI18n } from "@/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const t = getDictionary(await getLocale());
  return pageMetadata({
    path: "/projects",
    title: t.nav.projects,
    description: t.projectsPage.metaDescription,
  });
}

export default async function ProjectsPage() {
  const [projects, { t }] = await Promise.all([
    getPublishedProjects(),
    getI18n(),
  ]);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: t.nav.home, url: "/" },
          { name: t.nav.projects, url: "/projects" },
        ]}
      />
      <Section>
        <Container>
          <FadeUp>
            <SectionHeading
              eyebrow={t.projectsPage.eyebrow}
              title={t.projectsPage.title}
              description={t.projectsPage.description}
            />
          </FadeUp>
          <div className="mt-10">
            <ProjectsExplorer projects={projects} t={t} />
          </div>
        </Container>
      </Section>
    </>
  );
}

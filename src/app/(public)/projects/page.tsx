import type { Metadata } from "next";

import { Container, Section, SectionHeading } from "@/components/ui/section";
import { ProjectsExplorer } from "@/components/public/projects-explorer";
import { BreadcrumbJsonLd } from "@/lib/seo/jsonld";
import { getPublishedProjects } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Projets",
  description:
    "Sélection de réalisations : SaaS, applications web, mobile et expérimentations IA.",
};

export default async function ProjectsPage() {
  const projects = await getPublishedProjects();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "/" },
          { name: "Projets", url: "/projects" },
        ]}
      />
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Projets"
            title="Ce que j'ai construit"
            description="Filtrez par technologie pour explorer les réalisations."
          />
          <div className="mt-10">
            <ProjectsExplorer projects={projects} />
          </div>
        </Container>
      </Section>
    </>
  );
}

import type { Metadata } from "next";

import { Container, Section, SectionHeading } from "@/components/ui/section";
import { ExperienceTimeline } from "@/components/public/experience-timeline";
import { EmptyState } from "@/components/public/empty-state";
import { BreadcrumbJsonLd } from "@/lib/seo/jsonld";
import { getExperiences } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Expérience",
  description: "Parcours professionnel présenté en timeline.",
};

export default async function ExperiencePage() {
  const experiences = await getExperiences();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "/" },
          { name: "Expérience", url: "/experience" },
        ]}
      />
      <Section>
        <Container className="max-w-3xl">
          <SectionHeading
            eyebrow="Parcours"
            title="Expérience professionnelle"
          />
          <div className="mt-12">
            {experiences.length > 0 ? (
              <ExperienceTimeline items={experiences} />
            ) : (
              <EmptyState message="Le parcours sera bientôt disponible." />
            )}
          </div>
        </Container>
      </Section>
    </>
  );
}

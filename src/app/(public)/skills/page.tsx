import type { Metadata } from "next";

import { pageMetadata } from "@/lib/seo/metadata";

import { Container, Section, SectionHeading } from "@/components/ui/section";
import { SkillGroups } from "@/components/public/skill-groups";
import { EmptyState } from "@/components/public/empty-state";
import { BreadcrumbJsonLd } from "@/lib/seo/jsonld";
import { getSkillGroups } from "@/lib/queries";


export const metadata: Metadata = pageMetadata({
  path: "/skills",
  title: "Compétences",
  description:
    "Compétences techniques par catégorie : frontend, backend, base de données, DevOps et IA.",
});

export default async function SkillsPage() {
  const groups = await getSkillGroups();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "/" },
          { name: "Compétences", url: "/skills" },
        ]}
      />
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Compétences"
            title="Stack technique"
            description="Les technologies que j'utilise au quotidien, regroupées par domaine."
          />
          <div className="mt-10">
            {groups.length > 0 ? (
              <SkillGroups groups={groups} />
            ) : (
              <EmptyState message="Les compétences seront bientôt disponibles." />
            )}
          </div>
        </Container>
      </Section>
    </>
  );
}

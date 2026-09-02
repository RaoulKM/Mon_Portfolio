import type { Metadata } from "next";

import { pageMetadata } from "@/lib/seo/metadata";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { SkillGroups } from "@/components/public/skill-groups";
import { EmptyState } from "@/components/public/empty-state";
import { FadeUp } from "@/components/motion/reveal";
import { BreadcrumbJsonLd } from "@/lib/seo/jsonld";
import { getSkillGroups } from "@/lib/queries";
import { getDictionary, getLocale, getI18n } from "@/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const t = getDictionary(await getLocale());
  return pageMetadata({
    path: "/skills",
    title: t.nav.skills,
    description: t.skillsPage.metaDescription,
  });
}

export default async function SkillsPage() {
  const [groups, { t }] = await Promise.all([getSkillGroups(), getI18n()]);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: t.nav.home, url: "/" },
          { name: t.nav.skills, url: "/skills" },
        ]}
      />
      <Section>
        <Container>
          <FadeUp>
            <SectionHeading
              eyebrow={t.skillsPage.eyebrow}
              title={t.skillsPage.title}
              description={t.skillsPage.description}
            />
          </FadeUp>
          <div className="mt-10">
            {groups.length > 0 ? (
              <SkillGroups groups={groups} labels={t.skillCategories} />
            ) : (
              <EmptyState message={t.empty.skills} />
            )}
          </div>
        </Container>
      </Section>
    </>
  );
}

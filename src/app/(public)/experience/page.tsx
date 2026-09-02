import type { Metadata } from "next";

import { pageMetadata } from "@/lib/seo/metadata";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { ExperienceTimeline } from "@/components/public/experience-timeline";
import { EmptyState } from "@/components/public/empty-state";
import { FadeUp } from "@/components/motion/reveal";
import { BreadcrumbJsonLd } from "@/lib/seo/jsonld";
import { getExperiences } from "@/lib/queries";
import { getDictionary, getLocale, getI18n } from "@/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const t = getDictionary(await getLocale());
  return pageMetadata({
    path: "/experience",
    title: t.nav.experience,
    description: t.experiencePage.metaDescription,
  });
}

export default async function ExperiencePage() {
  const [experiences, { locale, t }] = await Promise.all([
    getExperiences(),
    getI18n(),
  ]);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: t.nav.home, url: "/" },
          { name: t.nav.experience, url: "/experience" },
        ]}
      />
      <Section>
        <Container className="max-w-3xl">
          <FadeUp>
            <SectionHeading
              eyebrow={t.experiencePage.eyebrow}
              title={t.experiencePage.title}
            />
          </FadeUp>
          <div className="mt-12">
            {experiences.length > 0 ? (
              <ExperienceTimeline
                items={experiences}
                locale={locale}
                currentLabel={t.experiencePage.current}
                presentLabel={t.common.present}
              />
            ) : (
              <EmptyState message={t.empty.experience} />
            )}
          </div>
        </Container>
      </Section>
    </>
  );
}

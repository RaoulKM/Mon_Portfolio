import type { Metadata } from "next";

import { pageMetadata } from "@/lib/seo/metadata";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { CertificationsList } from "@/components/public/certifications-list";
import { EmptyState } from "@/components/public/empty-state";
import { FadeUp } from "@/components/motion/reveal";
import { BreadcrumbJsonLd } from "@/lib/seo/jsonld";
import { getCertifications } from "@/lib/queries";
import { getDictionary, getLocale, getI18n } from "@/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const t = getDictionary(await getLocale());
  return pageMetadata({
    path: "/certifications",
    title: t.certificationsPage.title,
    description: t.certificationsPage.metaDescription,
  });
}

export default async function CertificationsPage() {
  const [certifications, { t }] = await Promise.all([
    getCertifications(),
    getI18n(),
  ]);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: t.nav.home, url: "/" },
          { name: t.nav.education, url: "/education" },
          { name: t.certificationsPage.title, url: "/certifications" },
        ]}
      />
      <Section>
        <Container>
          <FadeUp>
            <SectionHeading
              eyebrow={t.certificationsPage.eyebrow}
              title={t.certificationsPage.title}
            />
          </FadeUp>
          <div className="mt-10">
            {certifications.length > 0 ? (
              <CertificationsList items={certifications} />
            ) : (
              <EmptyState message={t.empty.certifications} />
            )}
          </div>
        </Container>
      </Section>
    </>
  );
}

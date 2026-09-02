import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { pageMetadata } from "@/lib/seo/metadata";
import { Button } from "@/components/ui/button";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { EducationList } from "@/components/public/education-list";
import { CertificationsList } from "@/components/public/certifications-list";
import { EmptyState } from "@/components/public/empty-state";
import { FadeUp } from "@/components/motion/reveal";
import { BreadcrumbJsonLd } from "@/lib/seo/jsonld";
import { getEducation, getCertifications } from "@/lib/queries";
import { getDictionary, getLocale, getI18n } from "@/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const t = getDictionary(await getLocale());
  return pageMetadata({
    path: "/education",
    title: t.nav.education,
    description: t.educationPage.metaDescription,
  });
}

export default async function EducationPage() {
  const [education, certifications, { t }] = await Promise.all([
    getEducation(),
    getCertifications(),
    getI18n(),
  ]);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: t.nav.home, url: "/" },
          { name: t.nav.education, url: "/education" },
        ]}
      />
      <Section>
        <Container className="max-w-3xl">
          <FadeUp>
            <SectionHeading
              eyebrow={t.educationPage.eyebrow}
              title={t.educationPage.title}
              description={t.educationPage.description}
            />
          </FadeUp>

          <div className="mt-10">
            {education.length > 0 ? (
              <EducationList items={education} />
            ) : (
              <EmptyState message={t.empty.education} />
            )}
          </div>

          {certifications.length > 0 && (
            <div className="mt-16">
              <h2 className="mono-eyebrow mb-6">
                {t.educationPage.certificationsHeading}
              </h2>
              <CertificationsList items={certifications} />
              <Button asChild variant="link" className="mt-4 px-0 font-mono">
                <Link href="/certifications">
                  {t.educationPage.allCertifications} <ArrowRight />
                </Link>
              </Button>
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}

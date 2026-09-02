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

export const metadata: Metadata = pageMetadata({
  path: "/education",
  title: "Formation",
  description:
    "Parcours académique, diplômes et certifications de KOM MBOUME PIERRE RAOUL.",
});

export default async function EducationPage() {
  const [education, certifications] = await Promise.all([
    getEducation(),
    getCertifications(),
  ]);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "/" },
          { name: "Formation", url: "/education" },
        ]}
      />
      <Section>
        <Container className="max-w-3xl">
          <FadeUp>
            <SectionHeading
              eyebrow="formation"
              title="Parcours académique"
              description="Diplômes, cursus et certifications."
            />
          </FadeUp>

          <div className="mt-10">
            {education.length > 0 ? (
              <EducationList items={education} />
            ) : (
              <EmptyState message="Le parcours académique sera bientôt disponible." />
            )}
          </div>

          {certifications.length > 0 && (
            <div className="mt-16">
              <h2 className="mono-eyebrow mb-6">{"// certifications"}</h2>
              <CertificationsList items={certifications} />
              <Button asChild variant="link" className="mt-4 px-0 font-mono">
                <Link href="/certifications">
                  toutes les certifications <ArrowRight />
                </Link>
              </Button>
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}

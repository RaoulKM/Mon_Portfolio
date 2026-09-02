import type { Metadata } from "next";

import { pageMetadata } from "@/lib/seo/metadata";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { CertificationsList } from "@/components/public/certifications-list";
import { EmptyState } from "@/components/public/empty-state";
import { FadeUp } from "@/components/motion/reveal";
import { BreadcrumbJsonLd } from "@/lib/seo/jsonld";
import { getCertifications } from "@/lib/queries";

export const metadata: Metadata = pageMetadata({
  path: "/certifications",
  title: "Certifications",
  description: "Certifications et accréditations vérifiables.",
});

export default async function CertificationsPage() {
  const certifications = await getCertifications();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "/" },
          { name: "Formation", url: "/education" },
          { name: "Certifications", url: "/certifications" },
        ]}
      />
      <Section>
        <Container>
          <FadeUp>
            <SectionHeading eyebrow="certifications" title="Accréditations" />
          </FadeUp>
          <div className="mt-10">
            {certifications.length > 0 ? (
              <CertificationsList items={certifications} />
            ) : (
              <EmptyState message="Les certifications seront bientôt disponibles." />
            )}
          </div>
        </Container>
      </Section>
    </>
  );
}

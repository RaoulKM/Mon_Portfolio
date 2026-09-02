import type { Metadata } from "next";

import { pageMetadata } from "@/lib/seo/metadata";

import { Container, Section, SectionHeading } from "@/components/ui/section";
import { ServicesList } from "@/components/public/services-list";
import { CtaBanner } from "@/components/public/cta";
import { EmptyState } from "@/components/public/empty-state";
import { BreadcrumbJsonLd } from "@/lib/seo/jsonld";
import { getServices } from "@/lib/queries";


export const metadata: Metadata = pageMetadata({
  path: "/services",
  title: "Services",
  description:
    "Prestations : développement web, API & backend, SaaS, UI/UX, intégration IA et DevOps.",
});

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "/" },
          { name: "Services", url: "/services" },
        ]}
      />
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Services"
            title="Prestations"
            description="De la conception au déploiement, un accompagnement full-stack."
          />
          <div className="mt-10">
            {services.length > 0 ? (
              <ServicesList services={services} />
            ) : (
              <EmptyState message="Les services seront bientôt disponibles." />
            )}
          </div>
        </Container>
      </Section>
      <CtaBanner />
    </>
  );
}

import type { Metadata } from "next";

import { pageMetadata } from "@/lib/seo/metadata";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { ServicesList } from "@/components/public/services-list";
import { CtaBanner } from "@/components/public/cta";
import { EmptyState } from "@/components/public/empty-state";
import { FadeUp } from "@/components/motion/reveal";
import { BreadcrumbJsonLd } from "@/lib/seo/jsonld";
import { getServices } from "@/lib/queries";
import { getDictionary, getLocale, getI18n } from "@/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const t = getDictionary(await getLocale());
  return pageMetadata({
    path: "/services",
    title: t.nav.services,
    description: t.servicesPage.metaDescription,
  });
}

export default async function ServicesPage() {
  const [services, { t }] = await Promise.all([getServices(), getI18n()]);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: t.nav.home, url: "/" },
          { name: t.nav.services, url: "/services" },
        ]}
      />
      <Section>
        <Container>
          <FadeUp>
            <SectionHeading
              eyebrow={t.servicesPage.eyebrow}
              title={t.servicesPage.title}
              description={t.servicesPage.description}
            />
          </FadeUp>
          <div className="mt-10">
            {services.length > 0 ? (
              <ServicesList services={services} />
            ) : (
              <EmptyState message={t.empty.services} />
            )}
          </div>
        </Container>
      </Section>
      <CtaBanner />
    </>
  );
}

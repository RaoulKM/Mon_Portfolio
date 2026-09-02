import type { Metadata } from "next";

import { pageMetadata } from "@/lib/seo/metadata";
import { BadgeCheck, ExternalLink } from "lucide-react";

import { Container, Section, SectionHeading } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/public/empty-state";
import { BreadcrumbJsonLd } from "@/lib/seo/jsonld";
import { getCertifications } from "@/lib/queries";


const dateFmt = new Intl.DateTimeFormat("fr-FR", { month: "long", year: "numeric" });

export const metadata: Metadata = pageMetadata({
  path: "/certifications",
  title: "Certifications",
  description:
    "Certifications et accréditations vérifiables.",
});

export default async function CertificationsPage() {
  const certifications = await getCertifications();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "/" },
          { name: "Certifications", url: "/certifications" },
        ]}
      />
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Certifications"
            title="Accréditations"
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {certifications.length > 0 ? (
              certifications.map((c) => (
                <Card key={c.id} className="flex flex-col p-6">
                  <div className="flex items-start gap-3">
                    <BadgeCheck className="text-accent mt-0.5 size-5 shrink-0" />
                    <div>
                      <h3 className="font-semibold">{c.name}</h3>
                      <p className="text-muted-foreground text-sm">{c.issuer}</p>
                      <p className="text-muted-foreground mt-0.5 text-xs">
                        {dateFmt.format(c.issueDate)}
                        {c.credentialId ? ` · ${c.credentialId}` : ""}
                      </p>
                    </div>
                  </div>
                  {c.description && (
                    <p className="mt-3 text-sm text-pretty">{c.description}</p>
                  )}
                  {c.credentialUrl && (
                    <a
                      href={c.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary mt-4 inline-flex items-center gap-1.5 text-sm hover:underline"
                    >
                      Voir la certification <ExternalLink className="size-3.5" />
                    </a>
                  )}
                </Card>
              ))
            ) : (
              <EmptyState message="Les certifications seront bientôt disponibles." />
            )}
          </div>
        </Container>
      </Section>
    </>
  );
}

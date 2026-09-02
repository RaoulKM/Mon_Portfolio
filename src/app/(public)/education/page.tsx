import type { Metadata } from "next";

import { pageMetadata } from "@/lib/seo/metadata";
import { GraduationCap } from "lucide-react";

import { Container, Section, SectionHeading } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/public/empty-state";
import { BreadcrumbJsonLd } from "@/lib/seo/jsonld";
import { formatDateRange } from "@/lib/utils";
import { getEducation } from "@/lib/queries";


export const metadata: Metadata = pageMetadata({
  path: "/education",
  title: "Formation",
  description:
    "Diplômes et formations complémentaires.",
});

export default async function EducationPage() {
  const education = await getEducation();

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
          <SectionHeading eyebrow="Formation" title="Diplômes & formations" />
          <div className="mt-10 space-y-4">
            {education.length > 0 ? (
              education.map((e) => (
                <Card key={e.id} className="flex gap-4 p-6">
                  <div className="bg-primary/10 text-primary flex size-11 shrink-0 items-center justify-center rounded-lg">
                    <GraduationCap className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{e.degree}</h3>
                    <p className="text-muted-foreground text-sm">
                      {e.institution}
                      {e.field ? ` · ${e.field}` : ""}
                    </p>
                    <p className="text-muted-foreground mt-0.5 text-xs">
                      {formatDateRange(e.startDate, e.endDate)}
                      {e.location ? ` · ${e.location}` : ""}
                    </p>
                    {e.description && (
                      <p className="mt-2 text-sm text-pretty">{e.description}</p>
                    )}
                  </div>
                </Card>
              ))
            ) : (
              <EmptyState message="Les formations seront bientôt disponibles." />
            )}
          </div>
        </Container>
      </Section>
    </>
  );
}

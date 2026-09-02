import type { Metadata } from "next";

import { pageMetadata } from "@/lib/seo/metadata";
import { FileDown } from "lucide-react";

import { Container, Section, SectionHeading } from "@/components/ui/section";
import { EmptyState } from "@/components/public/empty-state";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { BreadcrumbJsonLd } from "@/lib/seo/jsonld";
import { getProfile } from "@/lib/queries";


export const metadata: Metadata = pageMetadata({
  path: "/resume",
  title: "CV",
  description:
    "Télécharger le CV de KOM MBOUME PIERRE RAOUL (FR / EN).",
});

export default async function ResumePage() {
  const profile = await getProfile();

  const cvs = [
    { label: "CV — Français", url: profile?.cvUrlFr, lang: "fr" },
    { label: "CV — English", url: profile?.cvUrlEn, lang: "en" },
  ].filter((c): c is { label: string; url: string; lang: string } => Boolean(c.url));

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "/" },
          { name: "CV", url: "/resume" },
        ]}
      />
      <Section>
        <Container className="max-w-2xl">
          <SectionHeading
            eyebrow="CV"
            title="Télécharger mon CV"
            description="Disponible en français et en anglais, au format PDF."
          />
          <div className="mt-10 flex flex-col gap-3">
            {cvs.length > 0 ? (
              cvs.map((cv) => (
                <TrackedLink
                  key={cv.lang}
                  href={cv.url}
                  event="CV_DOWNLOAD"
                  entityId={cv.lang}
                  className="border-border hover:bg-muted flex items-center justify-between rounded-lg border px-5 py-4 text-sm font-medium transition-colors"
                >
                  {cv.label}
                  <FileDown className="size-4" />
                </TrackedLink>
              ))
            ) : (
              <EmptyState message="Le CV sera bientôt disponible au téléchargement." />
            )}
          </div>
        </Container>
      </Section>
    </>
  );
}

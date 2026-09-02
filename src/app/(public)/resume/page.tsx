import type { Metadata } from "next";
import { FileDown } from "lucide-react";

import { pageMetadata } from "@/lib/seo/metadata";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { EmptyState } from "@/components/public/empty-state";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { BreadcrumbJsonLd } from "@/lib/seo/jsonld";
import { getProfile } from "@/lib/queries";
import { getDictionary, getLocale, getI18n } from "@/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const t = getDictionary(await getLocale());
  return pageMetadata({
    path: "/resume",
    title: t.common.cv,
    description: t.resumePage.metaDescription,
  });
}

export default async function ResumePage() {
  const [profile, { t }] = await Promise.all([getProfile(), getI18n()]);

  const cvs = [
    { label: t.resumePage.fr, url: profile?.cvUrlFr, lang: "fr" },
    { label: t.resumePage.en, url: profile?.cvUrlEn, lang: "en" },
  ].filter((c): c is { label: string; url: string; lang: string } =>
    Boolean(c.url),
  );

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: t.nav.home, url: "/" },
          { name: t.common.cv, url: "/resume" },
        ]}
      />
      <Section>
        <Container className="max-w-2xl">
          <SectionHeading
            eyebrow={t.resumePage.eyebrow}
            title={t.resumePage.title}
            description={t.resumePage.description}
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
              <EmptyState message={t.empty.cv} />
            )}
          </div>
        </Container>
      </Section>
    </>
  );
}

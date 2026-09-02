import type { Metadata } from "next";
import { FileDown, ExternalLink } from "lucide-react";

import { pageMetadata } from "@/lib/seo/metadata";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { EmptyState } from "@/components/public/empty-state";
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
    { label: t.resumePage.fr, lang: "fr", raw: profile?.cvUrlFr },
    { label: t.resumePage.en, lang: "en", raw: profile?.cvUrlEn },
  ].filter((c): c is { label: string; lang: string; raw: string } =>
    Boolean(c.raw),
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
                <div
                  key={cv.lang}
                  className="border-border hover:border-accent/40 flex items-center justify-between gap-4 rounded-lg border px-5 py-4 transition-colors"
                >
                  <span className="text-sm font-medium">{cv.label}</span>
                  <span className="flex items-center gap-1">
                    <a
                      href={cv.raw}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground hover:bg-muted inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 font-mono text-xs transition-colors"
                    >
                      <ExternalLink className="size-3.5" />
                      {t.resumePage.view}
                    </a>
                    <a
                      href={`/cv/${cv.lang}`}
                      download
                      className="border-accent/40 bg-accent/10 text-accent hover:bg-accent/20 inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 font-mono text-xs transition-colors"
                    >
                      <FileDown className="size-3.5" />
                      {t.resumePage.download}
                    </a>
                  </span>
                </div>
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

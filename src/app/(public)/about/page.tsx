import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, CircleDot, ArrowRight } from "lucide-react";

import { pageMetadata } from "@/lib/seo/metadata";
import { Button } from "@/components/ui/button";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { StatsRow } from "@/components/public/stats-row";
import { EducationList } from "@/components/public/education-list";
import { CertificationsList } from "@/components/public/certifications-list";
import { FadeUp } from "@/components/motion/reveal";
import { BreadcrumbJsonLd } from "@/lib/seo/jsonld";
import { getProfile, getEducation, getCertifications } from "@/lib/queries";
import { getDictionary, getLocale, getI18n } from "@/i18n";

function Paragraphs({ text }: { text: string }) {
  return (
    <>
      {text.split(/\n{2,}/).map((p, i) => (
        <p key={i} className="mt-4 leading-relaxed text-pretty first:mt-0">
          {p}
        </p>
      ))}
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const t = getDictionary(await getLocale());
  return pageMetadata({
    path: "/about",
    title: t.nav.about,
    description: t.about.metaDescription,
  });
}

export default async function AboutPage() {
  const [profile, education, certifications, { t }] = await Promise.all([
    getProfile(),
    getEducation(),
    getCertifications(),
    getI18n(),
  ]);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: t.nav.home, url: "/" },
          { name: t.nav.about, url: "/about" },
        ]}
      />

      <Section>
        <Container>
          <FadeUp>
            <SectionHeading
              eyebrow={t.about.eyebrow}
              title={profile?.headline ?? t.about.fallbackHeadline}
            />

            <div className="text-muted-foreground mt-6 flex flex-wrap gap-4 font-mono text-xs">
              {profile?.location && (
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="size-4" /> {profile.location}
                </span>
              )}
              {profile?.availability && (
                <span className="text-terminal inline-flex items-center gap-1.5">
                  <CircleDot className="size-4" /> {profile.availability}
                </span>
              )}
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="mt-10 max-w-3xl text-[15px]">
              <Paragraphs text={profile?.bio ?? t.about.fallbackBio} />

              {profile?.philosophy && (
                <>
                  <h3 className="mono-eyebrow mt-10">{t.about.philosophy}</h3>
                  <Paragraphs text={profile.philosophy} />
                </>
              )}

              {profile?.objectives && (
                <>
                  <h3 className="mono-eyebrow mt-10">{t.about.objectives}</h3>
                  <Paragraphs text={profile.objectives} />
                </>
              )}
            </div>
          </FadeUp>

          <div className="mt-14">
            <StatsRow profile={profile} />
          </div>

          {education.length > 0 && (
            <FadeUp>
              <div className="mt-16 max-w-3xl">
                <div className="flex items-end justify-between">
                  <h2 className="mono-eyebrow">{`// ${t.sections.academic}`}</h2>
                  <Button asChild variant="link" className="px-0 font-mono text-xs">
                    <Link href="/education">
                      {t.common.details} <ArrowRight />
                    </Link>
                  </Button>
                </div>
                <div className="mt-6">
                  <EducationList items={education.slice(0, 3)} />
                </div>
              </div>
            </FadeUp>
          )}

          {certifications.length > 0 && (
            <FadeUp>
              <div className="mt-14 max-w-3xl">
                <h2 className="mono-eyebrow">{`// ${t.sections.certifications}`}</h2>
                <div className="mt-6">
                  <CertificationsList items={certifications.slice(0, 4)} />
                </div>
              </div>
            </FadeUp>
          )}
        </Container>
      </Section>
    </>
  );
}

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container, Section, SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Hero } from "@/components/public/hero";
import { StatsRow } from "@/components/public/stats-row";
import { SkillGroups } from "@/components/public/skill-groups";
import { ProjectCard } from "@/components/public/project-card";
import { ServicesList } from "@/components/public/services-list";
import { CtaBanner } from "@/components/public/cta";
import { EmptyState } from "@/components/public/empty-state";
import { Reveal, RevealItem, FadeUp } from "@/components/motion/reveal";
import { PersonJsonLd, WebSiteJsonLd } from "@/lib/seo/jsonld";
import { getI18n } from "@/i18n";
import {
  getProfile,
  getSkillGroups,
  getFeaturedProjects,
  getServices,
} from "@/lib/queries";

export default async function HomePage() {
  const [profile, skillGroups, featured, services, { t }] = await Promise.all([
    getProfile(),
    getSkillGroups(),
    getFeaturedProjects(3),
    getServices(),
    getI18n(),
  ]);

  return (
    <>
      <PersonJsonLd profile={profile} />
      <WebSiteJsonLd />

      <Hero profile={profile} t={t} />

      <Container>
        <StatsRow profile={profile} />
      </Container>

      {skillGroups.length > 0 && (
        <Section>
          <Container>
            <FadeUp>
              <SectionHeading
                eyebrow={t.sections.skills.eyebrow}
                title={t.sections.skills.title}
              />
            </FadeUp>
            <div className="mt-10">
              <SkillGroups
                groups={skillGroups.slice(0, 2)}
                labels={t.skillCategories}
              />
            </div>
            <Button asChild variant="link" className="mt-6 px-0 font-mono">
              <Link href="/skills">
                {t.nav.skills} <ArrowRight />
              </Link>
            </Button>
          </Container>
        </Section>
      )}

      <Section className="border-border border-y">
        <Container>
          <FadeUp>
            <SectionHeading
              eyebrow={t.sections.projects.eyebrow}
              title={t.sections.projects.title}
            />
          </FadeUp>
          <div className="mt-10">
            {featured.length > 0 ? (
              <Reveal className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {featured.map((p, i) => (
                  <RevealItem key={p.id}>
                    <ProjectCard project={p} index={i} t={t.project} />
                  </RevealItem>
                ))}
              </Reveal>
            ) : (
              <EmptyState message={t.empty.projects} />
            )}
          </div>
          <Button asChild variant="link" className="mt-6 px-0 font-mono">
            <Link href="/projects">
              {t.nav.projects} <ArrowRight />
            </Link>
          </Button>
        </Container>
      </Section>

      {services.length > 0 && (
        <Section>
          <Container>
            <FadeUp>
              <SectionHeading
                eyebrow={t.sections.services.eyebrow}
                title={t.sections.services.title}
              />
            </FadeUp>
            <div className="mt-10">
              <ServicesList services={services.slice(0, 6)} />
            </div>
          </Container>
        </Section>
      )}

      <CtaBanner />
    </>
  );
}

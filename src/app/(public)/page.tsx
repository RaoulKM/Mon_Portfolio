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
import { PersonJsonLd, WebSiteJsonLd } from "@/lib/seo/jsonld";
import {
  getProfile,
  getSkillGroups,
  getFeaturedProjects,
  getServices,
} from "@/lib/queries";

export default async function HomePage() {
  const [profile, skillGroups, featured, services] = await Promise.all([
    getProfile(),
    getSkillGroups(),
    getFeaturedProjects(3),
    getServices(),
  ]);

  return (
    <>
      <PersonJsonLd profile={profile} />
      <WebSiteJsonLd />

      <Hero profile={profile} />

      <Container>
        <StatsRow profile={profile} />
      </Container>

      {skillGroups.length > 0 && (
        <Section>
          <Container>
            <SectionHeading
              eyebrow="Compétences"
              title="Ce que je maîtrise"
              description="Un socle full-stack, du frontend au déploiement."
            />
            <div className="mt-10">
              <SkillGroups groups={skillGroups.slice(0, 2)} />
            </div>
            <Button asChild variant="link" className="mt-6 px-0">
              <Link href="/skills">
                Toutes les compétences <ArrowRight />
              </Link>
            </Button>
          </Container>
        </Section>
      )}

      <Section className="bg-muted/30">
        <Container>
          <SectionHeading
            eyebrow="Projets"
            title="Réalisations en vedette"
            description="Une sélection de ce que j'ai conçu et construit."
          />
          <div className="mt-10">
            {featured.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {featured.map((p) => (
                  <ProjectCard key={p.id} project={p} />
                ))}
              </div>
            ) : (
              <EmptyState message="Les projets seront bientôt disponibles." />
            )}
          </div>
          <Button asChild variant="link" className="mt-6 px-0">
            <Link href="/projects">
              Tous les projets <ArrowRight />
            </Link>
          </Button>
        </Container>
      </Section>

      {services.length > 0 && (
        <Section>
          <Container>
            <SectionHeading
              eyebrow="Services"
              title="Comment je peux aider"
            />
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

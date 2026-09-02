import type { Metadata } from "next";
import { MapPin, CircleDot } from "lucide-react";

import { Container, Section, SectionHeading } from "@/components/ui/section";
import { StatsRow } from "@/components/public/stats-row";
import { BreadcrumbJsonLd } from "@/lib/seo/jsonld";
import { getProfile } from "@/lib/queries";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Présentation, parcours, philosophie et objectifs de KOM MBOUME PIERRE RAOUL.",
};

function Paragraphs({ text }: { text: string }) {
  return (
    <>
      {text.split(/\n{2,}/).map((p, i) => (
        <p key={i} className="mt-4 text-pretty leading-relaxed first:mt-0">
          {p}
        </p>
      ))}
    </>
  );
}

export default async function AboutPage() {
  const profile = await getProfile();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "/" },
          { name: "À propos", url: "/about" },
        ]}
      />

      <Section>
        <Container>
          <SectionHeading
            eyebrow="À propos"
            title={profile?.headline ?? "Développeur Full-Stack"}
          />

          <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
            {profile?.location && (
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-4" /> {profile.location}
              </span>
            )}
            {profile?.availability && (
              <span className="text-accent inline-flex items-center gap-1.5">
                <CircleDot className="size-4" /> {profile.availability}
              </span>
            )}
          </div>

          <div className="mt-10 max-w-3xl text-[15px]">
            <Paragraphs
              text={
                profile?.bio ??
                "Développeur Full-Stack orienté produits numériques, SaaS, architecture logicielle et IA. J'aime construire et maintenir des applications complètes, de la base de données au déploiement."
              }
            />

            {profile?.philosophy && (
              <>
                <h3 className="mt-10 text-lg font-semibold">Philosophie</h3>
                <Paragraphs text={profile.philosophy} />
              </>
            )}

            {profile?.objectives && (
              <>
                <h3 className="mt-10 text-lg font-semibold">Objectifs</h3>
                <Paragraphs text={profile.objectives} />
              </>
            )}
          </div>

          <div className="mt-14">
            <StatsRow profile={profile} />
          </div>
        </Container>
      </Section>
    </>
  );
}

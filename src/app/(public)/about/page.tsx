import type { Metadata } from "next";

import { pageMetadata } from "@/lib/seo/metadata";
import { MapPin, CircleDot } from "lucide-react";

import { Container, Section, SectionHeading } from "@/components/ui/section";
import { StatsRow } from "@/components/public/stats-row";
import { FadeUp } from "@/components/motion/reveal";
import { BreadcrumbJsonLd } from "@/lib/seo/jsonld";
import { getProfile } from "@/lib/queries";


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

export const metadata: Metadata = pageMetadata({
  path: "/about",
  title: "À propos",
  description:
    "Présentation, parcours, philosophie et objectifs de KOM MBOUME PIERRE RAOUL.",
});

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
          <FadeUp>
            <SectionHeading
              eyebrow="about"
              title={profile?.headline ?? "Développeur Full-Stack"}
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
              <Paragraphs
                text={
                  profile?.bio ??
                  "Développeur Full-Stack orienté produits numériques, SaaS, architecture logicielle et IA. J'aime construire et maintenir des applications complètes, de la base de données au déploiement."
                }
              />

              {profile?.philosophy && (
                <>
                  <h3 className="mono-eyebrow mt-10">{"// philosophie"}</h3>
                  <Paragraphs text={profile.philosophy} />
                </>
              )}

              {profile?.objectives && (
                <>
                  <h3 className="mono-eyebrow mt-10">{"// objectifs"}</h3>
                  <Paragraphs text={profile.objectives} />
                </>
              )}
            </div>
          </FadeUp>

          <div className="mt-14">
            <StatsRow profile={profile} />
          </div>
        </Container>
      </Section>
    </>
  );
}

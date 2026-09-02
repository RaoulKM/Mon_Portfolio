import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { siteConfig } from "@/config/site";
import type { ProfileWithLinks } from "@/lib/queries";

const DEFAULT_STACK = ["Laravel", "Next.js", "React", "TypeScript"];

export function Hero({ profile }: { profile: ProfileWithLinks | null }) {
  const name = profile?.fullName ?? siteConfig.name;
  const headline = profile?.headline ?? "Développeur Full-Stack";
  const shortBio =
    profile?.shortBio ??
    "Je conçois des applications web modernes, des SaaS et des solutions numériques évolutives.";

  return (
    <Container className="grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-[1.4fr_1fr]">
      <div>
        <p className="text-accent text-sm font-semibold tracking-widest uppercase">
          {headline}
        </p>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-balance sm:text-6xl">
          {name}
        </h1>
        <p className="text-muted-foreground mt-4 text-lg">
          {DEFAULT_STACK.join(" • ")}
        </p>
        <p className="mt-6 max-w-2xl text-lg text-pretty">{shortBio}</p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Button asChild size="lg">
            <Link href="/projects">
              Voir mes projets <ArrowRight />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/contact">
              <Mail /> Me contacter
            </Link>
          </Button>
        </div>
      </div>

      <div className="relative mx-auto aspect-square w-56 sm:w-72 lg:w-full lg:max-w-sm">
        <div className="from-primary/20 to-accent/20 absolute inset-0 rounded-full bg-gradient-to-br blur-2xl" />
        {profile?.avatarUrl ? (
          <Image
            src={profile.avatarUrl}
            alt={name}
            fill
            priority
            sizes="(max-width: 1024px) 18rem, 24rem"
            className="relative rounded-full object-cover"
          />
        ) : (
          <div className="bg-muted text-muted-foreground relative flex size-full items-center justify-center rounded-full text-5xl font-bold">
            {name
              .split(" ")
              .map((w) => w[0])
              .slice(0, 2)
              .join("")}
          </div>
        )}
      </div>
    </Container>
  );
}

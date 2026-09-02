"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { Magnetic } from "@/components/motion/magnetic";
import { Typewriter } from "@/components/motion/typewriter";
import { EASE_OUT } from "@/lib/motion";
import { siteConfig } from "@/config/site";
import type { ProfileWithLinks } from "@/lib/queries";

const STACK = ["Laravel", "Next.js", "React", "TypeScript", "PostgreSQL", "Docker"];

export function Hero({ profile }: { profile: ProfileWithLinks | null }) {
  const reduce = useReducedMotion();
  const name = profile?.fullName ?? siteConfig.name;
  const headline = profile?.headline ?? "Développeur Full-Stack";
  const shortBio =
    profile?.shortBio ??
    "Je conçois des applications web modernes, des SaaS et des solutions numériques évolutives.";
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

  const fade = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18, filter: "blur(6px)" },
          animate: { opacity: 1, y: 0, filter: "blur(0px)" },
          transition: { duration: 0.7, ease: EASE_OUT, delay },
        };

  return (
    <Container className="py-16 sm:py-24">
      <div className="terminal-frame scanlines relative overflow-hidden p-1.5">
        {/* title bar */}
        <div className="border-border flex items-center gap-2 border-b px-4 py-2.5">
          <span className="size-2.5 rounded-full bg-destructive/70" />
          <span className="size-2.5 rounded-full bg-chart-5/70" />
          <span className="size-2.5 rounded-full bg-chart-4/70" />
          <span className="text-muted-foreground ml-3 font-mono text-xs">
            ~/portfolio — zsh
          </span>
        </div>

        <div className="grid items-center gap-10 p-6 sm:p-10 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <motion.p
              {...fade(0.05)}
              className="mono-eyebrow flex items-center gap-2"
            >
              <span className="text-terminal-dim">$</span> whoami
            </motion.p>

            <motion.h1
              {...fade(0.12)}
              className="mt-4 text-4xl font-extrabold tracking-tight text-balance sm:text-6xl"
            >
              {name}
            </motion.h1>

            <motion.div
              {...fade(0.2)}
              className="text-accent text-glow mt-3 font-mono text-lg sm:text-2xl"
            >
              <span className="text-terminal-dim">&gt; </span>
              <Typewriter
                phrases={[
                  headline,
                  "Architecte d'applications SaaS",
                  "Intégrateur d'IA",
                  "Ingénieur produit",
                ]}
              />
            </motion.div>

            <motion.p
              {...fade(0.28)}
              className="text-muted-foreground mt-6 max-w-xl text-lg text-pretty"
            >
              {shortBio}
            </motion.p>

            <motion.div {...fade(0.36)} className="mt-9 flex flex-wrap gap-4">
              <Magnetic>
                <Button asChild size="lg">
                  <Link href="/projects">
                    Voir mes projets <ArrowRight />
                  </Link>
                </Button>
              </Magnetic>
              <Magnetic>
                <Button asChild size="lg" variant="outline">
                  <Link href="/contact">
                    <Mail /> Me contacter
                  </Link>
                </Button>
              </Magnetic>
            </motion.div>

            {profile?.availability && (
              <motion.p
                {...fade(0.44)}
                className="text-muted-foreground mt-6 flex items-center gap-2 font-mono text-xs"
              >
                <span className="relative flex size-2">
                  <span className="bg-chart-4 absolute inline-flex size-full animate-ping rounded-full opacity-75" />
                  <span className="bg-chart-4 relative inline-flex size-2 rounded-full" />
                </span>
                {profile.availability}
              </motion.p>
            )}
          </div>

          <motion.div
            {...fade(0.3)}
            className="relative mx-auto aspect-square w-52 sm:w-64 lg:w-full lg:max-w-xs"
          >
            <div className="border-accent/30 absolute inset-0 rounded-2xl border" />
            <div className="border-accent/20 absolute -inset-3 rounded-3xl border [mask-image:linear-gradient(black,transparent)]" />
            <div className="from-primary/25 to-accent/25 absolute inset-0 rounded-2xl bg-gradient-to-br blur-2xl" />
            {profile?.avatarUrl ? (
              <Image
                src={profile.avatarUrl}
                alt={name}
                fill
                priority
                sizes="(max-width: 1024px) 16rem, 20rem"
                className="relative rounded-2xl object-cover"
              />
            ) : (
              <div className="bg-card/60 text-accent text-glow relative flex size-full items-center justify-center rounded-2xl font-mono text-5xl font-bold backdrop-blur">
                {initials}
              </div>
            )}
            <span className="border-border bg-background/80 text-terminal absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-md border px-2 py-1 font-mono text-[10px] backdrop-blur">
              online
            </span>
          </motion.div>
        </div>

        {/* tech ticker */}
        <div className="border-border text-muted-foreground overflow-hidden border-t font-mono text-xs">
          <div className="flex whitespace-nowrap py-3 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            {[0, 1].map((k) => (
              <div
                key={k}
                aria-hidden={k === 1}
                className="flex shrink-0 items-center gap-6 pr-6 animate-marquee motion-reduce:animate-none"
              >
                {STACK.map((t) => (
                  <span key={t} className="flex items-center gap-6">
                    <span className="text-terminal-dim">◇</span> {t}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}

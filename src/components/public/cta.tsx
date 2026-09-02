import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { Magnetic } from "@/components/motion/magnetic";
import { FadeUp } from "@/components/motion/reveal";

export function CtaBanner() {
  return (
    <Container className="py-20 sm:py-28">
      <FadeUp>
        <div className="terminal-frame grid-bg glow-lg scanlines relative overflow-hidden px-8 py-14 text-center sm:px-12">
          <p className="mono-eyebrow">
            <span className="text-terminal-dim">$</span> ./contact --new-project
          </p>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-balance sm:text-3xl">
            Un projet en tête ?
          </h2>
          <p className="text-muted-foreground mx-auto mt-3 max-w-xl text-pretty">
            Application web, SaaS ou intégration IA — parlons-en.
          </p>
          <div className="mt-7 flex justify-center">
            <Magnetic>
              <Button asChild size="lg" variant="terminal">
                <Link href="/contact">
                  Démarrer la conversation <ArrowRight />
                </Link>
              </Button>
            </Magnetic>
          </div>
        </div>
      </FadeUp>
    </Container>
  );
}

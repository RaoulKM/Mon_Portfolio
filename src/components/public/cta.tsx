import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { Magnetic } from "@/components/motion/magnetic";
import { FadeUp } from "@/components/motion/reveal";
import { getI18n } from "@/i18n";

export async function CtaBanner() {
  const { t } = await getI18n();

  return (
    <Container className="py-20 sm:py-28">
      <FadeUp>
        <div className="terminal-frame grid-bg glow-lg scanlines relative overflow-hidden px-8 py-14 text-center sm:px-12">
          <p className="mono-eyebrow">
            <span className="text-terminal-dim">$</span> {t.cta.eyebrow}
          </p>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-balance sm:text-3xl">
            {t.cta.title}
          </h2>
          <p className="text-muted-foreground mx-auto mt-3 max-w-xl text-pretty">
            {t.cta.text}
          </p>
          <div className="mt-7 flex justify-center">
            <Magnetic>
              <Button asChild size="lg" variant="terminal">
                <Link href="/contact">
                  {t.cta.button} <ArrowRight />
                </Link>
              </Button>
            </Magnetic>
          </div>
        </div>
      </FadeUp>
    </Container>
  );
}

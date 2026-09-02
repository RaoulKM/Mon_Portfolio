import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/section";

export function CtaBanner() {
  return (
    <Container className="py-16 sm:py-24">
      <div className="bg-primary text-primary-foreground rounded-2xl px-8 py-12 text-center sm:px-12">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Un projet en tête ?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-pretty opacity-90">
          Discutons de votre application web, SaaS ou intégration IA.
        </p>
        <Button asChild variant="secondary" size="lg" className="mt-6">
          <Link href="/contact">
            Démarrer la conversation <ArrowRight />
          </Link>
        </Button>
      </div>
    </Container>
  );
}

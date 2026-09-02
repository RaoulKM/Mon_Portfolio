import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";

import { siteConfig } from "@/config/site";

export default function HomePage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:py-32">
      <p className="text-accent text-sm font-semibold tracking-widest uppercase">
        Full-Stack Developer
      </p>
      <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-6xl">
        {siteConfig.name}
      </h1>
      <p className="text-muted-foreground mt-4 text-lg">
        Laravel • Next.js • React • TypeScript
      </p>
      <p className="mt-6 max-w-2xl text-balance text-lg">
        Je conçois des applications web modernes, des SaaS et des solutions
        numériques évolutives.
      </p>

      <div className="mt-10 flex flex-wrap gap-4">
        <Link
          href="/projects"
          className="bg-primary text-primary-foreground inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-medium"
        >
          Voir mes projets <ArrowRight className="size-4" />
        </Link>
        <Link
          href="/contact"
          className="border-border hover:bg-muted inline-flex items-center gap-2 rounded-md border px-5 py-3 text-sm font-medium"
        >
          <Mail className="size-4" /> Me contacter
        </Link>
      </div>
    </section>
  );
}

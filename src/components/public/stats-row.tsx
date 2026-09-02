import { Counter } from "@/components/motion/counter";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import type { ProfileWithLinks } from "@/lib/queries";

export function StatsRow({ profile }: { profile: ProfileWithLinks | null }) {
  const stats = [
    { value: profile?.projectsCount ?? 20, suffix: "+", label: "projets livrés" },
    { value: profile?.technologiesCount ?? 15, suffix: "+", label: "technologies" },
    { value: profile?.certificationsCount ?? 0, suffix: "", label: "certifications" },
    {
      value: profile?.yearsOfExperience ?? 3,
      suffix: "+",
      label: "années de pratique",
    },
  ].filter((s) => s.value > 0);

  if (stats.length === 0) return null;

  return (
    <Reveal className="terminal-frame grid grid-cols-2 divide-x divide-y divide-border overflow-hidden sm:grid-cols-4 sm:divide-y-0">
      {stats.map((s) => (
        <RevealItem key={s.label} className="p-6 text-center">
          <div className="text-accent text-glow font-mono text-3xl font-bold sm:text-4xl">
            <Counter value={s.value} suffix={s.suffix} />
          </div>
          <div className="text-muted-foreground mt-1 font-mono text-xs tracking-wide">
            {s.label}
          </div>
        </RevealItem>
      ))}
    </Reveal>
  );
}

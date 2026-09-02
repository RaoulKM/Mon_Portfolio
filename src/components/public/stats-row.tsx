import type { ProfileWithLinks } from "@/lib/queries";

export function StatsRow({ profile }: { profile: ProfileWithLinks | null }) {
  const stats = [
    { value: profile?.projectsCount ?? 20, suffix: "+", label: "Projets" },
    { value: profile?.technologiesCount ?? 15, suffix: "+", label: "Technologies" },
    { value: profile?.certificationsCount ?? 0, suffix: "", label: "Certifications" },
    {
      value: profile?.yearsOfExperience ?? 3,
      suffix: "+",
      label: "Années de pratique",
    },
  ].filter((s) => s.value > 0);

  if (stats.length === 0) return null;

  return (
    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label} className="bg-card p-6 text-center">
          <dd className="text-3xl font-bold tracking-tight">
            {s.value}
            {s.suffix}
          </dd>
          <dt className="text-muted-foreground mt-1 text-sm">{s.label}</dt>
        </div>
      ))}
    </dl>
  );
}

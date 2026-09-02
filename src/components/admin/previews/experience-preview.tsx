"use client";

import { Badge } from "@/components/ui/badge";
import type { FormValues } from "@/components/admin/form/admin-form";
import { PreviewFrame, Placeholder, val, list, bool } from "./shell";

function fmt(d: string) {
  if (!d) return "";
  const date = new Date(d);
  return Number.isNaN(+date)
    ? d
    : new Intl.DateTimeFormat("fr-FR", { month: "short", year: "numeric" }).format(date);
}

export function ExperiencePreview({ values }: { values: FormValues }) {
  const position = val(values, "position");
  const company = val(values, "company");
  const location = val(values, "location");
  const start = fmt(val(values, "startDate"));
  const end = bool(values, "isCurrent")
    ? "aujourd'hui"
    : fmt(val(values, "endDate")) || "aujourd'hui";
  const desc = val(values, "description");
  const resp = list(values, "responsibilities");
  const tech = list(values, "technologies");

  return (
    <PreviewFrame>
      <div className="border-border relative border-l pl-5">
        <span className="border-accent bg-background absolute -left-[7px] top-1 size-3 rounded-full border-2" />
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-semibold">
            {position || <Placeholder>Poste</Placeholder>}
          </h3>
          {bool(values, "isCurrent") && <Badge variant="accent">actuel</Badge>}
        </div>
        <p className="text-muted-foreground font-mono text-sm">
          {company || <Placeholder>Entreprise</Placeholder>}
          {location ? ` · ${location}` : ""}
        </p>
        {start && (
          <p className="text-terminal-dim mt-0.5 font-mono text-xs">
            {start} — {end}
          </p>
        )}
        {desc && <p className="mt-2 text-sm">{desc}</p>}
        {resp.length > 0 && (
          <ul className="text-muted-foreground mt-2 space-y-1 text-sm">
            {resp.map((r, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-terminal-dim">▹</span>
                {r}
              </li>
            ))}
          </ul>
        )}
        {tech.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {tech.map((t) => (
              <Badge key={t} variant="outline">
                {t}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </PreviewFrame>
  );
}

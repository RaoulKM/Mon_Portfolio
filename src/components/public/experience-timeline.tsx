import { Badge } from "@/components/ui/badge";
import { formatDateRange } from "@/lib/utils";
import type { Experience } from "@prisma/client";

export function ExperienceTimeline({ items }: { items: Experience[] }) {
  return (
    <ol className="border-border relative ml-3 border-l">
      {items.map((exp) => (
        <li key={exp.id} className="mb-10 ml-6">
          <span className="bg-primary absolute -left-[7px] mt-1.5 size-3 rounded-full ring-4 ring-background" />
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-semibold">{exp.position}</h3>
            {exp.isCurrent && <Badge variant="accent">Actuel</Badge>}
          </div>
          <p className="text-muted-foreground text-sm">
            {exp.company}
            {exp.location ? ` · ${exp.location}` : ""}
          </p>
          <p className="text-muted-foreground mt-0.5 text-xs">
            {formatDateRange(exp.startDate, exp.endDate)}
          </p>
          {exp.description && (
            <p className="mt-3 text-sm text-pretty">{exp.description}</p>
          )}
          {exp.responsibilities.length > 0 && (
            <ul className="text-muted-foreground mt-3 list-disc space-y-1 pl-5 text-sm">
              {exp.responsibilities.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          )}
          {exp.technologies.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {exp.technologies.map((t) => (
                <Badge key={t} variant="outline">
                  {t}
                </Badge>
              ))}
            </div>
          )}
        </li>
      ))}
    </ol>
  );
}

"use client";

import { GraduationCap } from "lucide-react";

import type { FormValues } from "@/components/admin/form/admin-form";
import { PreviewFrame, Placeholder, val } from "./shell";

function fmt(d: string) {
  if (!d) return "";
  const date = new Date(d);
  return Number.isNaN(+date)
    ? d
    : new Intl.DateTimeFormat("fr-FR", { month: "short", year: "numeric" }).format(date);
}

export function EducationPreview({ values }: { values: FormValues }) {
  const degree = val(values, "degree");
  const institution = val(values, "institution");
  const field = val(values, "field");
  const location = val(values, "location");
  const start = fmt(val(values, "startDate"));
  const end = fmt(val(values, "endDate")) || "aujourd'hui";
  const desc = val(values, "description");

  return (
    <PreviewFrame>
      <div className="bg-card/70 border-border flex gap-3 rounded-lg border p-4">
        <div className="bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-lg">
          <GraduationCap className="size-5" />
        </div>
        <div>
          <h3 className="font-semibold">
            {degree || <Placeholder>Diplôme</Placeholder>}
          </h3>
          <p className="text-muted-foreground text-sm">
            {institution || <Placeholder>Établissement</Placeholder>}
            {field ? ` · ${field}` : ""}
          </p>
          {start && (
            <p className="text-terminal-dim mt-0.5 font-mono text-xs">
              {start} — {end}
              {location ? ` · ${location}` : ""}
            </p>
          )}
          {desc && <p className="mt-2 text-sm">{desc}</p>}
        </div>
      </div>
    </PreviewFrame>
  );
}

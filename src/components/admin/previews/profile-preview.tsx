"use client";

import { CircleDot } from "lucide-react";

import type { FormValues } from "@/components/admin/form/admin-form";
import { PreviewFrame, Placeholder, val, num } from "./shell";

export function ProfilePreview({ values }: { values: FormValues }) {
  const name = val(values, "fullName");
  const headline = val(values, "headline");
  const bio = val(values, "shortBio");
  const avatar = val(values, "avatarUrl");
  const availability = val(values, "availability");
  const location = val(values, "location");
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("");

  const stats = [
    { v: num(values, "projectsCount"), l: "projets" },
    { v: num(values, "technologiesCount"), l: "techs" },
    { v: num(values, "yearsOfExperience"), l: "ans" },
  ].filter((s) => s.v > 0);

  return (
    <PreviewFrame label="hero">
      <div className="flex items-center gap-3">
        <div className="border-accent/30 relative size-14 overflow-hidden rounded-xl border">
          {avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={avatar} alt="" className="size-full object-cover" />
          ) : (
            <span className="bg-card text-accent flex size-full items-center justify-center font-mono text-lg font-bold">
              {initials || "··"}
            </span>
          )}
        </div>
        <div className="min-w-0">
          <p className="text-accent font-mono text-[11px] uppercase">
            {headline || <Placeholder>Titre pro</Placeholder>}
          </p>
          <h3 className="truncate text-lg font-bold">
            {name || <Placeholder>Nom complet</Placeholder>}
          </h3>
        </div>
      </div>

      <p className="text-muted-foreground mt-3 text-sm">
        {bio || <Placeholder>Bio courte…</Placeholder>}
      </p>

      <div className="text-muted-foreground mt-3 flex flex-wrap gap-3 font-mono text-[11px]">
        {location && <span>{location}</span>}
        {availability && (
          <span className="text-terminal inline-flex items-center gap-1">
            <CircleDot className="size-3" /> {availability}
          </span>
        )}
      </div>

      {stats.length > 0 && (
        <div className="border-border mt-4 grid grid-cols-3 divide-x divide-border border-t pt-3 text-center">
          {stats.map((s) => (
            <div key={s.l}>
              <div className="text-accent font-mono text-xl font-bold">{s.v}</div>
              <div className="text-muted-foreground font-mono text-[10px]">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      )}
    </PreviewFrame>
  );
}

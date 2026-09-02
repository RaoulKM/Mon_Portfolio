"use client";

import { Badge } from "@/components/ui/badge";
import type { FormValues } from "@/components/admin/form/admin-form";
import { PreviewFrame, Placeholder, val, list, bool } from "./shell";

const STATUS_LABEL: Record<string, string> = {
  PLANNED: "planifié",
  IN_PROGRESS: "en cours",
  COMPLETED: "livré",
  MAINTENANCE: "maintenance",
  ARCHIVED: "archivé",
};

export function ProjectPreview({
  values,
  technologies,
}: {
  values: FormValues;
  technologies: { id: string; name: string }[];
}) {
  const title = val(values, "title");
  const desc = val(values, "shortDescription");
  const cover = val(values, "coverImage") || list(values, "gallery")[0] || "";
  const status = val(values, "status");
  const selectedIds = new Set(
    Array.isArray(values.technologyIds)
      ? values.technologyIds
      : values.technologyIds
        ? [values.technologyIds as string]
        : [],
  );
  const techNames = technologies
    .filter((t) => selectedIds.has(t.id))
    .map((t) => t.name);

  return (
    <PreviewFrame>
      <div className="bg-card/70 border-border overflow-hidden rounded-lg border">
        <div className="bg-muted dot-bg relative aspect-video">
          {cover ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={cover} alt="" className="absolute inset-0 size-full object-cover" />
          ) : (
            <span className="text-muted-foreground/50 flex size-full items-center justify-center font-mono text-xs">
              image de couverture
            </span>
          )}
          {bool(values, "featured") && (
            <Badge variant="accent" className="absolute left-2 top-2">
              en vedette
            </Badge>
          )}
        </div>
        <div className="p-4">
          <div className="text-muted-foreground flex items-center justify-between font-mono text-[10px] uppercase">
            <span>projet</span>
            <span className="text-terminal-dim">{STATUS_LABEL[status] ?? ""}</span>
          </div>
          <h3 className="mt-1.5 font-semibold">
            {title || <Placeholder>Titre du projet</Placeholder>}
          </h3>
          <p className="text-muted-foreground mt-1.5 line-clamp-3 text-sm">
            {desc || <Placeholder>Description courte…</Placeholder>}
          </p>
          {techNames.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1">
              {techNames.slice(0, 6).map((n) => (
                <Badge key={n} variant="outline">
                  {n}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
      {!bool(values, "isPublished") && (
        <p className="text-terminal-dim mt-3 font-mono text-[11px]">
          ● brouillon — non visible sur le site
        </p>
      )}
    </PreviewFrame>
  );
}

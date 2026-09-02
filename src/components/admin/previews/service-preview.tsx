"use client";

import { Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { FormValues } from "@/components/admin/form/admin-form";
import { ICON_LIBRARY } from "@/components/admin/form/icon-picker";
import { PreviewFrame, Placeholder, val, list, bool } from "./shell";

export function ServicePreview({ values }: { values: FormValues }) {
  const title = val(values, "title");
  const desc = val(values, "description");
  const price = val(values, "price");
  const features = list(values, "features");
  const Icon = ICON_LIBRARY[val(values, "icon")] ?? Sparkles;

  return (
    <PreviewFrame>
      <div className="bg-card/70 border-border flex flex-col rounded-lg border p-5">
        <div className="border-accent/30 bg-accent/10 text-accent flex size-10 items-center justify-center rounded-lg border">
          <Icon className="size-5" />
        </div>
        <h3 className="mt-3 font-semibold">
          {title || <Placeholder>Titre du service</Placeholder>}
        </h3>
        <p className="text-muted-foreground mt-1.5 text-sm">
          {desc || <Placeholder>Description du service…</Placeholder>}
        </p>
        {features.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {features.map((f) => (
              <Badge key={f} variant="secondary">
                {f}
              </Badge>
            ))}
          </div>
        )}
        {price && (
          <p className="text-muted-foreground mt-3 font-mono text-sm">{price}</p>
        )}
      </div>
      {bool(values, "featured") && (
        <p className="text-terminal-dim mt-3 font-mono text-[11px]">
          ★ mis en avant
        </p>
      )}
    </PreviewFrame>
  );
}

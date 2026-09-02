"use client";

import type { FormValues } from "@/components/admin/form/admin-form";
import { ICON_LIBRARY } from "@/components/admin/form/icon-picker";
import { PreviewFrame, Placeholder, val, num } from "./shell";

const CAT: Record<string, string> = {
  FRONTEND: "Frontend",
  BACKEND: "Backend",
  DATABASE: "Base de données",
  DEVOPS: "DevOps / Cloud",
  AI: "IA",
  MOBILE: "Mobile",
  OTHER: "Autres",
};

export function SkillPreview({ values }: { values: FormValues }) {
  const name = val(values, "name");
  const category = val(values, "category");
  const level = Math.min(100, Math.max(0, num(values, "level", 50)));
  const color = val(values, "color");
  const Icon = ICON_LIBRARY[val(values, "icon")];

  return (
    <PreviewFrame>
      <p className="text-accent font-mono text-xs">{CAT[category] ?? "—"}</p>
      <div className="mt-3">
        <div className="mb-1.5 flex items-center justify-between font-mono text-[13px]">
          <span className="flex items-center gap-1.5">
            {Icon && <Icon className="size-3.5" />}
            {color && (
              <span
                className="size-2.5 rounded-full"
                style={{ background: color }}
              />
            )}
            {name || <Placeholder>Nom de la compétence</Placeholder>}
          </span>
          <span className="text-muted-foreground">{level}%</span>
        </div>
        <div className="bg-muted h-1.5 overflow-hidden rounded-full">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${level}%`,
              background: color || "var(--accent)",
            }}
          />
        </div>
      </div>
    </PreviewFrame>
  );
}

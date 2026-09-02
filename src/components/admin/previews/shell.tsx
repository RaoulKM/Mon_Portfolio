"use client";

import * as React from "react";
import type { FormValues } from "@/components/admin/form/admin-form";

export function val(values: FormValues, key: string): string {
  const v = values[key];
  return typeof v === "string" ? v : Array.isArray(v) ? (v[0] ?? "") : "";
}

export function list(values: FormValues, key: string): string[] {
  const v = values[key];
  if (Array.isArray(v)) return v.filter(Boolean);
  if (typeof v === "string" && v.trim()) {
    return v.split(/[\n,]/).map((s) => s.trim()).filter(Boolean);
  }
  return [];
}

export function bool(values: FormValues, key: string): boolean {
  const v = values[key];
  return v === "on" || v === "true";
}

export function num(values: FormValues, key: string, fallback = 0): number {
  const n = Number(val(values, key));
  return Number.isFinite(n) ? n : fallback;
}

/** Terminal-framed shell for every preview. */
export function PreviewFrame({
  children,
  label = "public",
}: {
  children: React.ReactNode;
  label?: string;
}) {
  return (
    <div className="terminal-frame overflow-hidden">
      <div className="border-border flex items-center gap-1.5 border-b px-3 py-2">
        <span className="bg-destructive/60 size-2 rounded-full" />
        <span className="bg-chart-5/60 size-2 rounded-full" />
        <span className="bg-chart-4/60 size-2 rounded-full" />
        <span className="text-muted-foreground ml-2 font-mono text-[10px]">
          {label}
        </span>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

export function Placeholder({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-muted-foreground/60 italic">{children}</span>
  );
}

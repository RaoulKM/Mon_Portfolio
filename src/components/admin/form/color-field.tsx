"use client";

import * as React from "react";
import { X } from "lucide-react";

const HEX = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

/** Hex color input backed by a native <input type="color"> swatch. Optional. */
export function ColorField({
  label,
  name,
  defaultValue,
  hint,
  error,
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  hint?: string;
  error?: string[];
}) {
  const [value, setValue] = React.useState(defaultValue ?? "");
  const valid = value === "" || HEX.test(value);

  return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="font-mono text-[13px] font-medium">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <div className="border-input relative size-9 shrink-0 overflow-hidden rounded-md border">
          <span
            className="absolute inset-0"
            style={{ background: valid && value ? value : "transparent" }}
          />
          {!value && (
            <span className="dot-bg absolute inset-0 opacity-60" aria-hidden />
          )}
          <input
            type="color"
            aria-label={`${label} — sélecteur`}
            value={valid && value ? value : "#3b82f6"}
            onChange={(e) => setValue(e.target.value)}
            className="absolute inset-0 cursor-pointer opacity-0"
          />
        </div>
        <input
          id={name}
          name={name}
          value={value}
          onChange={(e) => setValue(e.target.value.trim())}
          placeholder="#3178C6"
          className="border-input bg-background/60 focus-visible:border-accent/60 focus-visible:ring-ring/40 w-40 rounded-md border px-3 py-2 font-mono text-sm outline-none transition-colors focus-visible:ring-2"
        />
        {value && (
          <button
            type="button"
            onClick={() => setValue("")}
            className="text-muted-foreground hover:text-destructive"
            aria-label="Retirer la couleur"
          >
            <X className="size-4" />
          </button>
        )}
      </div>
      {hint && !error?.length && valid && (
        <p className="text-muted-foreground text-xs">{hint}</p>
      )}
      {!valid && (
        <p className="text-destructive text-xs">Format attendu : #RGB ou #RRGGBB</p>
      )}
      {error?.map((e, i) => (
        <p key={i} className="text-destructive text-xs">
          {e}
        </p>
      ))}
    </div>
  );
}

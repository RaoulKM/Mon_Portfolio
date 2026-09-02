"use client";

import * as React from "react";
import { Search, ChevronDown } from "lucide-react";

import { BRAND_OPTIONS, BrandGlyph } from "@/components/icons/brand";

/**
 * Compact searchable palette of platform icons, for the profile social-link
 * rows. Stores the chosen slug in a hidden input.
 */
export function SocialIconPicker({
  name,
  defaultValue,
}: {
  name: string;
  defaultValue?: string | null;
}) {
  const [value, setValue] = React.useState(
    (defaultValue ?? "").toLowerCase() || "link",
  );
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  const results = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return BRAND_OPTIONS;
    return BRAND_OPTIONS.filter(
      (o) => o.slug.includes(q) || o.label.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <div className="relative shrink-0" ref={ref}>
      <input type="hidden" name={name} value={value} />
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Choisir l'icône de la plateforme"
        className="border-input bg-background/60 hover:border-accent/50 flex h-[38px] items-center gap-1 rounded-md border px-2 transition-colors"
      >
        <span className="text-accent flex size-5 items-center justify-center">
          <BrandGlyph slug={value} className="size-4" />
        </span>
        <ChevronDown className="text-muted-foreground size-3.5" />
      </button>

      {open && (
        <div className="border-border bg-popover absolute z-30 mt-1 w-56 rounded-md border p-2 shadow-xl">
          <div className="border-input bg-background/60 mb-2 flex items-center gap-2 rounded-md border px-2">
            <Search className="text-muted-foreground size-3.5" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher…"
              className="w-full bg-transparent py-1.5 text-xs outline-none"
            />
          </div>
          <div className="max-h-52 overflow-y-auto">
            {results.map((o) => (
              <button
                key={o.slug}
                type="button"
                onClick={() => {
                  setValue(o.slug);
                  setOpen(false);
                  setQuery("");
                }}
                className={`hover:bg-accent/15 hover:text-accent flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left font-mono text-xs transition-colors ${
                  value === o.slug ? "bg-accent/15 text-accent" : ""
                }`}
              >
                <BrandGlyph slug={o.slug} className="size-4 shrink-0" />
                {o.label}
              </button>
            ))}
            {results.length === 0 && (
              <p className="text-muted-foreground py-3 text-center text-xs">
                Aucun résultat
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

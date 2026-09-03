"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Languages } from "lucide-react";

import { cn } from "@/lib/utils";
import { locales, localeNames, type Locale } from "@/i18n/routing";
import { setLocale } from "@/i18n/actions";

export function LocaleSwitcher({
  current,
  label = "Langue",
  variant = "compact",
}: {
  current: Locale;
  label?: string;
  /** `compact` → FR / EN toggle (navbar). `full` → named buttons (footer, menu). */
  variant?: "compact" | "full";
}) {
  const router = useRouter();
  const [pending, startTransition] = React.useTransition();

  function pick(next: Locale) {
    if (next === current || pending) return;
    startTransition(async () => {
      await setLocale(next);
      router.refresh();
    });
  }

  if (variant === "full") {
    return (
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label={label}
      >
        {locales.map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => pick(l)}
            disabled={pending}
            aria-pressed={current === l}
            className={cn(
              "inline-flex items-center gap-2 rounded-md border px-3 py-1.5 font-mono text-xs transition-colors disabled:opacity-50",
              current === l
                ? "border-accent/40 bg-accent/10 text-accent"
                : "border-border text-muted-foreground hover:text-foreground",
            )}
          >
            <span className="uppercase">{l}</span>
            <span className="opacity-80">{localeNames[l]}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div
      className="border-border flex items-center overflow-hidden rounded-md border font-mono text-[11px]"
      role="group"
      aria-label={label}
    >
      <span className="text-muted-foreground flex items-center px-1.5">
        <Languages className="size-3.5" />
      </span>
      {locales.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => pick(l)}
          disabled={pending}
          aria-pressed={current === l}
          className={cn(
            "px-2 py-1 uppercase transition-colors disabled:opacity-50",
            current === l
              ? "bg-accent/15 text-accent"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

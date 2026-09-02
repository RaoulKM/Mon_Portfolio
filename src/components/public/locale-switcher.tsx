"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Languages } from "lucide-react";

import { cn } from "@/lib/utils";
import { locales, type Locale } from "@/i18n/routing";
import { setLocale } from "@/i18n/actions";

export function LocaleSwitcher({ current }: { current: Locale }) {
  const router = useRouter();
  const [pending, startTransition] = React.useTransition();

  function pick(next: Locale) {
    if (next === current || pending) return;
    startTransition(async () => {
      await setLocale(next);
      router.refresh();
    });
  }

  return (
    <div
      className="border-border flex items-center overflow-hidden rounded-md border font-mono text-[11px]"
      role="group"
      aria-label="Langue"
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

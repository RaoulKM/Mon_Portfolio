import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import type { Service } from "@prisma/client";

function resolveIcon(name?: string | null): LucideIcon {
  if (name && name in Icons) {
    return Icons[name as keyof typeof Icons] as unknown as LucideIcon;
  }
  return Icons.Sparkles;
}

export function ServicesList({ services }: { services: Service[] }) {
  return (
    <Reveal className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service, i) => {
        const Icon = resolveIcon(service.icon);
        return (
          <RevealItem
            key={service.id}
            className="group bg-card hover:bg-surface relative flex flex-col p-6 transition-colors"
          >
            <span className="text-terminal-dim absolute right-5 top-5 font-mono text-xs">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="border-accent/30 bg-accent/10 text-accent flex size-11 items-center justify-center rounded-lg border transition-transform group-hover:-translate-y-0.5">
              <Icon className="size-5" />
            </div>
            <h3 className="mt-4 font-semibold">{service.title}</h3>
            <p className="text-muted-foreground mt-2 flex-1 text-sm text-pretty">
              {service.description}
            </p>
            {service.features.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {service.features.map((f) => (
                  <Badge key={f} variant="outline">
                    {f}
                  </Badge>
                ))}
              </div>
            )}
            {service.price && (
              <p className="text-muted-foreground mt-4 font-mono text-sm">
                {service.price}
              </p>
            )}
          </RevealItem>
        );
      })}
    </Reveal>
  );
}

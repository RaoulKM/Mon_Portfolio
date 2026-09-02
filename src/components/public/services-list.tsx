import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Service } from "@prisma/client";

function resolveIcon(name?: string | null): LucideIcon {
  if (name && name in Icons) {
    return Icons[name as keyof typeof Icons] as unknown as LucideIcon;
  }
  return Icons.Sparkles;
}

export function ServicesList({ services }: { services: Service[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => {
        const Icon = resolveIcon(service.icon);
        return (
          <Card key={service.id} className="flex flex-col p-6">
            <div className="bg-primary/10 text-primary flex size-11 items-center justify-center rounded-lg">
              <Icon className="size-5" />
            </div>
            <h3 className="mt-4 font-semibold">{service.title}</h3>
            <p className="text-muted-foreground mt-2 flex-1 text-sm text-pretty">
              {service.description}
            </p>
            {service.features.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {service.features.map((f) => (
                  <Badge key={f} variant="secondary">
                    {f}
                  </Badge>
                ))}
              </div>
            )}
            {service.price && (
              <p className="text-muted-foreground mt-4 text-sm font-medium">
                {service.price}
              </p>
            )}
          </Card>
        );
      })}
    </div>
  );
}

import { GraduationCap } from "lucide-react";

import { Card } from "@/components/ui/card";
import { formatDateRange } from "@/lib/utils";
import { getI18n } from "@/i18n";
import type { Education } from "@prisma/client";

export async function EducationList({ items }: { items: Education[] }) {
  const { locale, t } = await getI18n();

  return (
    <div className="space-y-4">
      {items.map((e) => (
        <Card key={e.id} className="flex gap-4 p-6">
          <div className="bg-primary/10 text-primary flex size-11 shrink-0 items-center justify-center rounded-lg">
            <GraduationCap className="size-5" />
          </div>
          <div>
            <h3 className="font-semibold">{e.degree}</h3>
            <p className="text-muted-foreground font-mono text-sm">
              {e.institution}
              {e.field ? ` · ${e.field}` : ""}
            </p>
            <p className="text-terminal-dim mt-0.5 font-mono text-xs">
              {formatDateRange(e.startDate, e.endDate, {
                locale,
                present: t.common.present,
              })}
              {e.location ? ` · ${e.location}` : ""}
            </p>
            {e.description && (
              <p className="mt-2 text-sm text-pretty">{e.description}</p>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}

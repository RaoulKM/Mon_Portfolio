import { BadgeCheck, ExternalLink } from "lucide-react";

import { Card } from "@/components/ui/card";
import { getI18n } from "@/i18n";
import type { Certification } from "@prisma/client";

export async function CertificationsList({ items }: { items: Certification[] }) {
  const { locale, t } = await getI18n();
  const dateFmt = new Intl.DateTimeFormat(locale === "en" ? "en-US" : "fr-FR", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map((c) => (
        <Card key={c.id} className="flex flex-col p-6">
          <div className="flex items-start gap-3">
            <BadgeCheck className="text-accent mt-0.5 size-5 shrink-0" />
            <div>
              <h3 className="font-semibold">{c.name}</h3>
              <p className="text-muted-foreground font-mono text-sm">{c.issuer}</p>
              <p className="text-terminal-dim mt-0.5 font-mono text-xs">
                {dateFmt.format(c.issueDate)}
                {c.credentialId ? ` · ${c.credentialId}` : ""}
              </p>
            </div>
          </div>
          {c.description && (
            <p className="mt-3 text-sm text-pretty">{c.description}</p>
          )}
          {c.credentialUrl && (
            <a
              href={c.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary mt-4 inline-flex items-center gap-1.5 text-sm hover:underline"
            >
              {t.certificationsPage.viewCredential}
              <ExternalLink className="size-3.5" />
            </a>
          )}
        </Card>
      ))}
    </div>
  );
}

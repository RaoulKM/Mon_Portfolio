"use client";

import { BadgeCheck, ExternalLink } from "lucide-react";

import type { FormValues } from "@/components/admin/form/admin-form";
import { PreviewFrame, Placeholder, val } from "./shell";

function fmt(d: string) {
  if (!d) return "";
  const date = new Date(d);
  return Number.isNaN(+date)
    ? d
    : new Intl.DateTimeFormat("fr-FR", { month: "long", year: "numeric" }).format(date);
}

export function CertificationPreview({ values }: { values: FormValues }) {
  const name = val(values, "name");
  const issuer = val(values, "issuer");
  const issueDate = fmt(val(values, "issueDate"));
  const credentialId = val(values, "credentialId");
  const image = val(values, "certificateImage");
  const url = val(values, "credentialUrl");
  const desc = val(values, "description");

  return (
    <PreviewFrame>
      <div className="bg-card/70 border-border flex flex-col rounded-lg border p-4">
        <div className="flex items-start gap-3">
          <BadgeCheck className="text-accent mt-0.5 size-5 shrink-0" />
          <div>
            <h3 className="font-semibold">
              {name || <Placeholder>Intitulé</Placeholder>}
            </h3>
            <p className="text-muted-foreground text-sm">
              {issuer || <Placeholder>Organisme</Placeholder>}
            </p>
            {(issueDate || credentialId) && (
              <p className="text-terminal-dim mt-0.5 font-mono text-xs">
                {[issueDate, credentialId].filter(Boolean).join(" · ")}
              </p>
            )}
          </div>
        </div>
        {image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt=""
            className="border-border mt-3 max-h-32 w-full rounded-md border object-contain"
          />
        )}
        {desc && <p className="mt-3 text-sm">{desc}</p>}
        {url && (
          <span className="text-primary mt-3 inline-flex items-center gap-1 text-sm">
            Voir la certification <ExternalLink className="size-3.5" />
          </span>
        )}
      </div>
    </PreviewFrame>
  );
}

"use client";

import type { Profile } from "@prisma/client";
import { ExternalLink } from "lucide-react";

import { AdminForm } from "@/components/admin/form/admin-form";
import { ImageField } from "@/components/admin/form/image-field";
import { saveCv } from "./actions";

function CurrentFile({ url }: { url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-muted-foreground hover:text-foreground mt-2 inline-flex items-center gap-1.5 font-mono text-xs"
    >
      <ExternalLink className="size-3.5" /> fichier actuel
    </a>
  );
}

export function CvForm({ profile }: { profile: Profile | null }) {
  return (
    <div className="max-w-xl">
      <AdminForm action={saveCv} successMessage="CV enregistré.">
        {(errors) => (
          <div className="space-y-6">
            <div>
              <ImageField
                label="CV — Français (PDF)"
                name="cvUrlFr"
                accept="application/pdf"
                defaultValue={profile?.cvUrlFr}
                error={errors.cvUrlFr}
                hint="Upload d'un PDF ou collez une URL."
              />
              {profile?.cvUrlFr && (
                <CurrentFile url={profile.cvUrlFr} />
              )}
            </div>

            <div>
              <ImageField
                label="CV — Anglais (PDF)"
                name="cvUrlEn"
                accept="application/pdf"
                defaultValue={profile?.cvUrlEn}
                error={errors.cvUrlEn}
                hint="Optionnel. Si vide, /cv/en sert le CV français."
              />
              {profile?.cvUrlEn && (
                <CurrentFile url={profile.cvUrlEn} />
              )}
            </div>

            <p className="text-muted-foreground text-xs">
              Ces fichiers alimentent les boutons « Télécharger le CV » du site
              public et la page CV. Les téléchargements sont comptés dans les
              statistiques.
            </p>
          </div>
        )}
      </AdminForm>
    </div>
  );
}

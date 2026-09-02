"use client";

import type { Profile } from "@prisma/client";
import { FileDown, ExternalLink } from "lucide-react";

import { AdminForm } from "@/components/admin/form/admin-form";
import { ImageField } from "@/components/admin/form/image-field";
import { saveCv } from "./actions";

function CurrentFile({ url, lang }: { url: string; lang: "fr" | "en" }) {
  return (
    <div className="text-muted-foreground mt-2 flex flex-wrap items-center gap-3 font-mono text-xs">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-foreground inline-flex items-center gap-1.5"
      >
        <ExternalLink className="size-3.5" /> fichier actuel
      </a>
      <a
        href={`/cv/${lang}`}
        className="text-accent inline-flex items-center gap-1.5 hover:underline"
      >
        <FileDown className="size-3.5" /> tester /cv/{lang}
      </a>
    </div>
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
                <CurrentFile url={profile.cvUrlFr} lang="fr" />
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
                <CurrentFile url={profile.cvUrlEn} lang="en" />
              )}
            </div>

            <p className="text-muted-foreground text-xs">
              Les boutons « Télécharger le CV » du site public et la page{" "}
              <code className="text-accent">/resume</code> utilisent ces
              fichiers. Le téléchargement passe par{" "}
              <code className="text-accent">/cv/fr</code> et{" "}
              <code className="text-accent">/cv/en</code> (comptés dans les
              statistiques).
            </p>
          </div>
        )}
      </AdminForm>
    </div>
  );
}

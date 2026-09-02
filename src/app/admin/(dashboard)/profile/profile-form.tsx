"use client";

import * as React from "react";
import type { Profile, SocialLink } from "@prisma/client";
import { Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AdminForm } from "@/components/admin/form/admin-form";
import { TextField, TextareaField } from "@/components/admin/form/fields";
import { saveProfile } from "./actions";

type ProfileWithLinks = Profile & { socialLinks: SocialLink[] };

export function ProfileForm({ profile }: { profile: ProfileWithLinks | null }) {
  const [links, setLinks] = React.useState<{ platform: string; url: string }[]>(
    profile?.socialLinks.map((s) => ({ platform: s.platform, url: s.url })) ?? [
      { platform: "GitHub", url: "" },
      { platform: "LinkedIn", url: "" },
    ],
  );

  return (
    <AdminForm
      action={saveProfile}
      successMessage="Profil enregistré."
      submitLabel="Enregistrer les modifications"
    >
      {(errors) => (
        <>
          <div className="grid gap-6 sm:grid-cols-2">
            <TextField
              label="Nom complet"
              name="fullName"
              required
              defaultValue={profile?.fullName}
              error={errors.fullName}
            />
            <TextField
              label="Titre professionnel"
              name="headline"
              required
              defaultValue={profile?.headline}
              error={errors.headline}
            />
          </div>

          <TextareaField
            label="Bio courte"
            name="shortBio"
            required
            rows={2}
            defaultValue={profile?.shortBio}
            error={errors.shortBio}
          />
          <TextareaField
            label="Bio"
            name="bio"
            required
            rows={5}
            defaultValue={profile?.bio}
            error={errors.bio}
          />
          <div className="grid gap-6 sm:grid-cols-2">
            <TextareaField
              label="Philosophie"
              name="philosophy"
              rows={3}
              defaultValue={profile?.philosophy}
            />
            <TextareaField
              label="Objectifs"
              name="objectives"
              rows={3}
              defaultValue={profile?.objectives}
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <TextField label="Avatar (URL)" name="avatarUrl" defaultValue={profile?.avatarUrl} />
            <TextField label="Localisation" name="location" defaultValue={profile?.location} />
            <TextField
              label="Disponibilité"
              name="availability"
              defaultValue={profile?.availability}
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              defaultValue={profile?.email}
              error={errors.email}
            />
            <TextField label="Téléphone" name="phone" defaultValue={profile?.phone} />
            <TextField label="CV — FR (URL)" name="cvUrlFr" defaultValue={profile?.cvUrlFr} />
            <TextField label="CV — EN (URL)" name="cvUrlEn" defaultValue={profile?.cvUrlEn} />
          </div>

          <div className="grid gap-6 sm:grid-cols-4">
            <TextField
              label="Années d'expérience"
              name="yearsOfExperience"
              type="number"
              defaultValue={profile?.yearsOfExperience ?? 0}
            />
            <TextField
              label="Nb projets"
              name="projectsCount"
              type="number"
              defaultValue={profile?.projectsCount ?? 0}
            />
            <TextField
              label="Nb technologies"
              name="technologiesCount"
              type="number"
              defaultValue={profile?.technologiesCount ?? 0}
            />
            <TextField
              label="Nb certifications"
              name="certificationsCount"
              type="number"
              defaultValue={profile?.certificationsCount ?? 0}
            />
          </div>

          <div className="border-border border-t pt-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-medium">Réseaux sociaux</span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setLinks((l) => [...l, { platform: "", url: "" }])}
              >
                <Plus /> Ajouter
              </Button>
            </div>
            <div className="space-y-2">
              {links.map((link, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    name="social_platform"
                    defaultValue={link.platform}
                    placeholder="Plateforme"
                    className="border-input bg-background w-40 rounded-md border px-3 py-2 text-sm"
                  />
                  <input
                    name="social_url"
                    defaultValue={link.url}
                    placeholder="https://…"
                    className="border-input bg-background flex-1 rounded-md border px-3 py-2 text-sm"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setLinks((l) => l.filter((_, idx) => idx !== i))}
                  >
                    <X className="size-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </AdminForm>
  );
}

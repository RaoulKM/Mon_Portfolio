"use client";

import * as React from "react";
import type { Profile, SocialLink } from "@prisma/client";
import { Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AdminForm } from "@/components/admin/form/admin-form";
import { TextField, TextareaField } from "@/components/admin/form/fields";
import { ImageField } from "@/components/admin/form/image-field";
import { SocialIconPicker } from "@/components/admin/form/social-icon-picker";
import { WhatsappIcon } from "@/components/icons/brand";
import { ProfilePreview } from "@/components/admin/previews/profile-preview";
import { saveProfile } from "./actions";

type ProfileWithLinks = Profile & { socialLinks: SocialLink[] };
type LinkRow = { platform: string; url: string; icon: string };

export function ProfileForm({ profile }: { profile: ProfileWithLinks | null }) {
  const [links, setLinks] = React.useState<LinkRow[]>(
    profile?.socialLinks.map((s) => ({
      platform: s.platform,
      url: s.url,
      icon: s.icon ?? s.platform.toLowerCase(),
    })) ?? [
      { platform: "GitHub", url: "", icon: "github" },
      { platform: "LinkedIn", url: "", icon: "linkedin" },
    ],
  );

  return (
    <AdminForm
      action={saveProfile}
      successMessage="Profil enregistré."
      submitLabel="Enregistrer les modifications"
      preview={(v) => <ProfilePreview values={v} />}
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

          <ImageField
            label="Avatar"
            name="avatarUrl"
            defaultValue={profile?.avatarUrl}
            error={errors.avatarUrl}
          />

          <div className="grid gap-6 sm:grid-cols-2">
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
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <ImageField
              label="CV — Français (PDF)"
              name="cvUrlFr"
              accept="application/pdf,image/*"
              defaultValue={profile?.cvUrlFr}
              error={errors.cvUrlFr}
            />
            <ImageField
              label="CV — Anglais (PDF)"
              name="cvUrlEn"
              accept="application/pdf,image/*"
              defaultValue={profile?.cvUrlEn}
              error={errors.cvUrlEn}
            />
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
              <span className="font-mono text-[13px] font-medium">
                Réseaux sociaux
              </span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  setLinks((l) => [...l, { platform: "", url: "", icon: "link" }])
                }
              >
                <Plus /> Ajouter
              </Button>
            </div>
            <div className="space-y-2">
              {links.map((link, i) => (
                <div key={i} className="flex gap-2">
                  <SocialIconPicker name="social_icon" defaultValue={link.icon} />
                  <input
                    name="social_platform"
                    defaultValue={link.platform}
                    placeholder="Plateforme"
                    className="border-input bg-background/60 w-36 rounded-md border px-3 py-2 text-sm"
                  />
                  <input
                    name="social_url"
                    defaultValue={link.url}
                    placeholder="https://…"
                    className="border-input bg-background/60 flex-1 rounded-md border px-3 py-2 font-mono text-xs"
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

            {/* WhatsApp direct contact */}
            <div className="border-border bg-[#25D366]/5 mt-4 rounded-lg border border-dashed p-4">
              <p className="flex items-center gap-2 font-mono text-[13px] font-medium">
                <WhatsappIcon className="size-4 text-[#25D366]" />
                Contact WhatsApp
              </p>
              <p className="text-muted-foreground mt-1 text-xs">
                Un bouton « Discuter sur WhatsApp » apparaîtra sur le site avec ce
                message pré-rempli.
              </p>
              <div className="mt-3 grid gap-3">
                <TextField
                  label="Numéro (format international, ex : +237 6 XX XX XX XX)"
                  name="whatsappNumber"
                  defaultValue={profile?.whatsappNumber}
                />
                <TextareaField
                  label="Message pré-rempli"
                  name="whatsappMessage"
                  rows={2}
                  defaultValue={
                    profile?.whatsappMessage ??
                    "Bonjour Raoul, je vous contacte au sujet de "
                  }
                />
              </div>
            </div>
          </div>
        </>
      )}
    </AdminForm>
  );
}

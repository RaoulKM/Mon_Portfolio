"use client";

import { AdminForm } from "@/components/admin/form/admin-form";
import {
  TextField,
  TextareaField,
  SelectField,
} from "@/components/admin/form/fields";
import { Card } from "@/components/ui/card";
import { locales, localeNames } from "@/i18n/routing";
import { saveSetting } from "./actions";

type SettingsMap = Record<string, Record<string, unknown>>;

function str(v: unknown): string {
  if (Array.isArray(v)) return v.join(", ");
  return v == null ? "" : String(v);
}

export function SettingsForms({ settings }: { settings: SettingsMap }) {
  const field = (key: string, name: string) => str(settings[key]?.[name]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="p-6">
        <h2 className="mb-4 font-semibold">Général</h2>
        <AdminForm action={saveSetting} successMessage="Général enregistré.">
          {() => (
            <>
              <input type="hidden" name="_key" value="general" />
              <TextField label="Nom du site" name="siteName" defaultValue={field("general", "siteName")} />
              <TextField
                label="Description du site"
                name="siteDescription"
                defaultValue={field("general", "siteDescription")}
              />
              <TextField label="Fuseau horaire" name="timezone" defaultValue={field("general", "timezone")} />
              <SelectField
                label="Langue par défaut du site"
                name="language"
                defaultValue={field("general", "language") || "fr"}
                options={locales.map((l) => ({ value: l, label: localeNames[l] }))}
              />
            </>
          )}
        </AdminForm>
      </Card>

      <Card className="p-6">
        <h2 className="mb-4 font-semibold">SEO</h2>
        <AdminForm action={saveSetting} successMessage="SEO enregistré.">
          {() => (
            <>
              <input type="hidden" name="_key" value="seo" />
              <TextField label="Titre par défaut" name="defaultTitle" defaultValue={field("seo", "defaultTitle")} />
              <TextField
                label="Description par défaut"
                name="defaultDescription"
                defaultValue={field("seo", "defaultDescription")}
              />
              <TextareaField
                label="Mots-clés (séparés par virgule)"
                name="keywords"
                rows={2}
                defaultValue={field("seo", "keywords")}
              />
              <TextField label="Image OG (URL)" name="ogImage" defaultValue={field("seo", "ogImage")} />
            </>
          )}
        </AdminForm>
      </Card>

      <Card className="p-6">
        <h2 className="mb-4 font-semibold">Réseaux sociaux</h2>
        <AdminForm action={saveSetting} successMessage="Réseaux enregistrés.">
          {() => (
            <>
              <input type="hidden" name="_key" value="social" />
              <TextField label="GitHub" name="github" defaultValue={field("social", "github")} />
              <TextField label="LinkedIn" name="linkedin" defaultValue={field("social", "linkedin")} />
              <TextField label="X / Twitter" name="x" defaultValue={field("social", "x")} />
              <TextField label="Instagram" name="instagram" defaultValue={field("social", "instagram")} />
              <TextField label="YouTube" name="youtube" defaultValue={field("social", "youtube")} />
            </>
          )}
        </AdminForm>
      </Card>

      <Card className="p-6">
        <h2 className="mb-4 font-semibold">Contact</h2>
        <AdminForm action={saveSetting} successMessage="Contact enregistré.">
          {() => (
            <>
              <input type="hidden" name="_key" value="contact" />
              <TextField
                label="Email de contact"
                name="contactEmail"
                defaultValue={field("contact", "contactEmail")}
              />
              <TextField
                label="Email de notification"
                name="notificationEmail"
                defaultValue={field("contact", "notificationEmail")}
              />
            </>
          )}
        </AdminForm>
      </Card>
    </div>
  );
}

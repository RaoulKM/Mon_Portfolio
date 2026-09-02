"use client";

import type { Experience } from "@prisma/client";

import { AdminForm } from "@/components/admin/form/admin-form";
import {
  TextField,
  TextareaField,
  SwitchField,
} from "@/components/admin/form/fields";
import { ImageField } from "@/components/admin/form/image-field";
import { ExperiencePreview } from "@/components/admin/previews/experience-preview";
import { saveExperience } from "./actions";

const isoDate = (d?: Date | null) =>
  d ? new Date(d).toISOString().slice(0, 10) : "";

export function ExperienceForm({ experience }: { experience?: Experience | null }) {
  return (
    <AdminForm
      action={saveExperience}
      redirectTo="/admin/experience"
      successMessage={experience ? "Expérience mise à jour." : "Expérience créée."}
      submitLabel={experience ? "Enregistrer" : "Créer"}
      preview={(v) => <ExperiencePreview values={v} />}
    >
      {(errors) => (
        <>
          {experience && <input type="hidden" name="id" value={experience.id} />}
          <div className="grid gap-6 sm:grid-cols-2">
            <TextField
              label="Poste"
              name="position"
              required
              defaultValue={experience?.position}
              error={errors.position}
            />
            <TextField
              label="Entreprise"
              name="company"
              required
              defaultValue={experience?.company}
              error={errors.company}
            />
            <TextField label="Lieu" name="location" defaultValue={experience?.location} />
            <ImageField label="Logo" name="logo" defaultValue={experience?.logo} error={errors.logo} />
            <TextField
              label="Début"
              name="startDate"
              type="date"
              required
              defaultValue={isoDate(experience?.startDate)}
              error={errors.startDate}
            />
            <TextField
              label="Fin"
              name="endDate"
              type="date"
              defaultValue={isoDate(experience?.endDate)}
            />
            <TextField
              label="Ordre d'affichage"
              name="displayOrder"
              type="number"
              defaultValue={experience?.displayOrder ?? 0}
            />
          </div>
          <TextareaField
            label="Description"
            name="description"
            rows={3}
            defaultValue={experience?.description}
          />
          <TextareaField
            label="Responsabilités (une par ligne)"
            name="responsibilities"
            rows={4}
            defaultValue={experience?.responsibilities.join("\n")}
          />
          <TextField
            label="Technologies (séparées par virgule)"
            name="technologies"
            defaultValue={experience?.technologies.join(", ")}
          />
          <div className="border-border flex flex-wrap gap-6 border-t pt-4">
            <SwitchField
              label="Poste actuel"
              name="isCurrent"
              defaultChecked={experience?.isCurrent ?? false}
            />
            <SwitchField
              label="Visible sur le site"
              name="isVisible"
              defaultChecked={experience?.isVisible ?? true}
            />
          </div>
        </>
      )}
    </AdminForm>
  );
}

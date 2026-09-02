"use client";

import type { Education } from "@prisma/client";

import { AdminForm } from "@/components/admin/form/admin-form";
import {
  TextField,
  TextareaField,
  SwitchField,
} from "@/components/admin/form/fields";
import { ImageField } from "@/components/admin/form/image-field";
import { EducationPreview } from "@/components/admin/previews/education-preview";
import { saveEducation } from "./actions";

const isoDate = (d?: Date | null) =>
  d ? new Date(d).toISOString().slice(0, 10) : "";

export function EducationForm({ education }: { education?: Education | null }) {
  return (
    <AdminForm
      action={saveEducation}
      redirectTo="/admin/education"
      successMessage={education ? "Formation mise à jour." : "Formation créée."}
      submitLabel={education ? "Enregistrer" : "Créer"}
      preview={(v) => <EducationPreview values={v} />}
    >
      {(errors) => (
        <>
          {education && <input type="hidden" name="id" value={education.id} />}
          <div className="grid gap-6 sm:grid-cols-2">
            <TextField
              label="Diplôme"
              name="degree"
              required
              defaultValue={education?.degree}
              error={errors.degree}
            />
            <TextField
              label="Établissement"
              name="institution"
              required
              defaultValue={education?.institution}
              error={errors.institution}
            />
            <TextField label="Domaine" name="field" defaultValue={education?.field} />
            <TextField label="Lieu" name="location" defaultValue={education?.location} />
            <ImageField label="Logo" name="logo" defaultValue={education?.logo} error={errors.logo} />
            <TextField
              label="Début"
              name="startDate"
              type="date"
              required
              defaultValue={isoDate(education?.startDate)}
              error={errors.startDate}
            />
            <TextField
              label="Fin"
              name="endDate"
              type="date"
              defaultValue={isoDate(education?.endDate)}
            />
            <TextField
              label="Ordre d'affichage"
              name="displayOrder"
              type="number"
              defaultValue={education?.displayOrder ?? 0}
            />
          </div>
          <TextareaField
            label="Description"
            name="description"
            rows={3}
            defaultValue={education?.description}
          />
          <SwitchField
            label="Visible sur le site"
            name="isVisible"
            defaultChecked={education?.isVisible ?? true}
          />
        </>
      )}
    </AdminForm>
  );
}

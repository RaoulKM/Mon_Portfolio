"use client";

import type { Skill } from "@prisma/client";

import { AdminForm } from "@/components/admin/form/admin-form";
import {
  TextField,
  TextareaField,
  SelectField,
  SwitchField,
} from "@/components/admin/form/fields";
import { IconPicker } from "@/components/admin/form/icon-picker";
import { ColorField } from "@/components/admin/form/color-field";
import { SkillPreview } from "@/components/admin/previews/skill-preview";
import { saveSkill } from "./actions";

const CATEGORIES = [
  { value: "FRONTEND", label: "Frontend" },
  { value: "BACKEND", label: "Backend" },
  { value: "DATABASE", label: "Base de données" },
  { value: "DEVOPS", label: "DevOps / Cloud" },
  { value: "AI", label: "IA" },
  { value: "MOBILE", label: "Mobile" },
  { value: "OTHER", label: "Autres" },
];

export function SkillForm({ skill }: { skill?: Skill | null }) {
  return (
    <AdminForm
      action={saveSkill}
      redirectTo="/admin/skills"
      successMessage={skill ? "Compétence mise à jour." : "Compétence créée."}
      submitLabel={skill ? "Enregistrer" : "Créer"}
      preview={(v) => <SkillPreview values={v} />}
    >
      {(errors) => (
        <>
          {skill && <input type="hidden" name="id" value={skill.id} />}
          <div className="grid gap-6 sm:grid-cols-2">
            <TextField
              label="Nom"
              name="name"
              required
              defaultValue={skill?.name}
              error={errors.name}
            />
            <SelectField
              label="Catégorie"
              name="category"
              options={CATEGORIES}
              defaultValue={skill?.category ?? "FRONTEND"}
            />
            <TextField
              label="Niveau (0-100)"
              name="level"
              type="number"
              min={0}
              max={100}
              defaultValue={skill?.level ?? 50}
              error={errors.level}
            />
            <TextField
              label="Années d'expérience"
              name="years"
              type="number"
              step="0.5"
              defaultValue={skill?.years ?? ""}
            />
            <IconPicker label="Icône" name="icon" defaultValue={skill?.icon} />
            <ColorField
              label="Couleur"
              name="color"
              defaultValue={skill?.color}
              hint="Sélecteur ou #hex"
              error={errors.color}
            />
            <TextField
              label="Ordre d'affichage"
              name="displayOrder"
              type="number"
              defaultValue={skill?.displayOrder ?? 0}
            />
          </div>
          <TextareaField
            label="Description"
            name="description"
            rows={3}
            defaultValue={skill?.description}
          />
          <SwitchField
            label="Visible sur le site"
            name="isVisible"
            defaultChecked={skill?.isVisible ?? true}
          />
        </>
      )}
    </AdminForm>
  );
}

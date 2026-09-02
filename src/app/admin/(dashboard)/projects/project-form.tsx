"use client";

import type { Project, Technology, Category } from "@prisma/client";

import { AdminForm } from "@/components/admin/form/admin-form";
import {
  TextField,
  TextareaField,
  SelectField,
  SwitchField,
  CheckboxGroupField,
} from "@/components/admin/form/fields";
import { ImageField } from "@/components/admin/form/image-field";
import { ProjectPreview } from "@/components/admin/previews/project-preview";
import { saveProject } from "./actions";

const STATUS = [
  { value: "PLANNED", label: "Planifié" },
  { value: "IN_PROGRESS", label: "En cours" },
  { value: "COMPLETED", label: "Terminé" },
  { value: "MAINTENANCE", label: "Maintenance" },
  { value: "ARCHIVED", label: "Archivé" },
];

function isoDate(d: Date | null | undefined) {
  return d ? new Date(d).toISOString().slice(0, 10) : "";
}

export function ProjectForm({
  project,
  technologies,
  categories,
}: {
  project?: (Project & { technologies: Technology[] }) | null;
  technologies: Technology[];
  categories: Category[];
}) {
  return (
    <AdminForm
      action={saveProject}
      redirectTo="/admin/projects"
      successMessage={project ? "Projet mis à jour." : "Projet créé."}
      submitLabel={project ? "Enregistrer" : "Créer le projet"}
      preview={(v) => <ProjectPreview values={v} technologies={technologies} />}
    >
      {(errors) => (
        <>
          {project && <input type="hidden" name="id" value={project.id} />}

          <div className="grid gap-6 sm:grid-cols-2">
            <TextField
              label="Titre"
              name="title"
              required
              defaultValue={project?.title}
              error={errors.title}
            />
            <TextField
              label="Slug"
              name="slug"
              required
              defaultValue={project?.slug}
              hint="Ex: agripulse"
              error={errors.slug}
            />
          </div>

          <TextareaField
            label="Description courte"
            name="shortDescription"
            required
            rows={2}
            defaultValue={project?.shortDescription}
            error={errors.shortDescription}
          />
          <TextareaField
            label="Description"
            name="description"
            required
            rows={5}
            defaultValue={project?.description}
            error={errors.description}
          />

          <div className="grid gap-6 sm:grid-cols-2">
            <TextareaField label="Problème" name="problem" defaultValue={project?.problem} />
            <TextareaField label="Solution" name="solution" defaultValue={project?.solution} />
            <TextareaField
              label="Architecture"
              name="architecture"
              defaultValue={project?.architecture}
            />
            <TextareaField
              label="Défis techniques"
              name="challenges"
              defaultValue={project?.challenges}
            />
          </div>
          <TextareaField label="Résultats" name="results" defaultValue={project?.results} />

          <div className="grid gap-6 sm:grid-cols-2">
            <ImageField
              label="Image de couverture"
              name="coverImage"
              defaultValue={project?.coverImage}
              error={errors.coverImage}
            />
            <div className="grid gap-6">
              <TextField label="Lien GitHub" name="githubUrl" defaultValue={project?.githubUrl} />
              <TextField label="Lien démo" name="liveUrl" defaultValue={project?.liveUrl} />
            </div>
          </div>

          <ImageField
            label="Galerie"
            name="gallery"
            multiple
            defaultValue={project?.gallery.join("\n")}
            hint="Plusieurs images — upload ou URL"
          />

          <div className="grid gap-6 sm:grid-cols-3">
            <TextField
              label="Début"
              name="startDate"
              type="date"
              defaultValue={isoDate(project?.startDate)}
            />
            <TextField
              label="Fin"
              name="endDate"
              type="date"
              defaultValue={isoDate(project?.endDate)}
            />
            <TextField
              label="Ordre d'affichage"
              name="displayOrder"
              type="number"
              defaultValue={project?.displayOrder ?? 0}
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <SelectField
              label="Statut"
              name="status"
              options={STATUS}
              defaultValue={project?.status ?? "IN_PROGRESS"}
            />
            <SelectField
              label="Catégorie"
              name="categoryId"
              options={[
                { value: "", label: "— Aucune —" },
                ...categories.map((c) => ({ value: c.id, label: c.name })),
              ]}
              defaultValue={project?.categoryId ?? ""}
            />
          </div>

          {technologies.length > 0 && (
            <CheckboxGroupField
              label="Technologies"
              name="technologyIds"
              options={technologies.map((t) => ({ value: t.id, label: t.name }))}
              defaultValue={project?.technologies.map((t) => t.id) ?? []}
            />
          )}

          <div className="grid gap-6 sm:grid-cols-2">
            <TextField label="SEO — titre" name="seoTitle" defaultValue={project?.seoTitle} />
            <TextField
              label="SEO — description"
              name="seoDescription"
              defaultValue={project?.seoDescription}
            />
          </div>

          <div className="border-border flex flex-wrap gap-6 border-t pt-4">
            <SwitchField
              label="Publié"
              name="isPublished"
              defaultChecked={project?.isPublished ?? false}
            />
            <SwitchField
              label="En vedette"
              name="featured"
              defaultChecked={project?.featured ?? false}
            />
          </div>
        </>
      )}
    </AdminForm>
  );
}

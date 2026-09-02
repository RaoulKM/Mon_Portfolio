"use client";

import type { Service } from "@prisma/client";

import { AdminForm } from "@/components/admin/form/admin-form";
import {
  TextField,
  TextareaField,
  SwitchField,
} from "@/components/admin/form/fields";
import { IconPicker } from "@/components/admin/form/icon-picker";
import { saveService } from "./actions";

export function ServiceForm({ service }: { service?: Service | null }) {
  return (
    <AdminForm
      action={saveService}
      redirectTo="/admin/services"
      successMessage={service ? "Service mis à jour." : "Service créé."}
      submitLabel={service ? "Enregistrer" : "Créer"}
    >
      {(errors) => (
        <>
          {service && <input type="hidden" name="id" value={service.id} />}
          <div className="grid gap-6 sm:grid-cols-2">
            <TextField
              label="Titre"
              name="title"
              required
              defaultValue={service?.title}
              error={errors.title}
            />
            <TextField
              label="Slug"
              name="slug"
              required
              defaultValue={service?.slug}
              error={errors.slug}
            />
            <IconPicker
              label="Icône"
              name="icon"
              defaultValue={service?.icon}
              hint="Cherchez dans la palette"
            />
            <TextField label="Tarif (optionnel)" name="price" defaultValue={service?.price} />
            <TextField
              label="Ordre d'affichage"
              name="displayOrder"
              type="number"
              defaultValue={service?.displayOrder ?? 0}
            />
          </div>
          <TextareaField
            label="Description"
            name="description"
            required
            rows={4}
            defaultValue={service?.description}
            error={errors.description}
          />
          <TextareaField
            label="Points forts (un par ligne)"
            name="features"
            rows={4}
            defaultValue={service?.features.join("\n")}
          />
          <div className="border-border flex flex-wrap gap-6 border-t pt-4">
            <SwitchField
              label="En vedette"
              name="featured"
              defaultChecked={service?.featured ?? false}
            />
            <SwitchField
              label="Visible sur le site"
              name="isVisible"
              defaultChecked={service?.isVisible ?? true}
            />
          </div>
        </>
      )}
    </AdminForm>
  );
}

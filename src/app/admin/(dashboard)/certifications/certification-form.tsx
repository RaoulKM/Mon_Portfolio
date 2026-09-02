"use client";

import type { Certification } from "@prisma/client";

import { AdminForm } from "@/components/admin/form/admin-form";
import {
  TextField,
  TextareaField,
  SwitchField,
} from "@/components/admin/form/fields";
import { ImageField } from "@/components/admin/form/image-field";
import { CertificationPreview } from "@/components/admin/previews/certification-preview";
import { saveCertification } from "./actions";

const isoDate = (d?: Date | null) =>
  d ? new Date(d).toISOString().slice(0, 10) : "";

export function CertificationForm({
  certification,
}: {
  certification?: Certification | null;
}) {
  return (
    <AdminForm
      action={saveCertification}
      redirectTo="/admin/certifications"
      successMessage={
        certification ? "Certification mise à jour." : "Certification créée."
      }
      submitLabel={certification ? "Enregistrer" : "Créer"}
      preview={(v) => <CertificationPreview values={v} />}
    >
      {(errors) => (
        <>
          {certification && (
            <input type="hidden" name="id" value={certification.id} />
          )}
          <div className="grid gap-6 sm:grid-cols-2">
            <TextField
              label="Intitulé"
              name="name"
              required
              defaultValue={certification?.name}
              error={errors.name}
            />
            <TextField
              label="Organisme"
              name="issuer"
              required
              defaultValue={certification?.issuer}
              error={errors.issuer}
            />
            <TextField
              label="Date d'obtention"
              name="issueDate"
              type="date"
              required
              defaultValue={isoDate(certification?.issueDate)}
              error={errors.issueDate}
            />
            <TextField
              label="Date d'expiration"
              name="expirationDate"
              type="date"
              defaultValue={isoDate(certification?.expirationDate)}
            />
            <TextField
              label="Identifiant"
              name="credentialId"
              defaultValue={certification?.credentialId}
            />
            <TextField
              label="URL de vérification"
              name="credentialUrl"
              defaultValue={certification?.credentialUrl}
            />
            <TextField
              label="Ordre d'affichage"
              name="displayOrder"
              type="number"
              defaultValue={certification?.displayOrder ?? 0}
            />
          </div>
          <ImageField
            label="Image du certificat"
            name="certificateImage"
            defaultValue={certification?.certificateImage}
            error={errors.certificateImage}
          />
          <TextareaField
            label="Description"
            name="description"
            rows={3}
            defaultValue={certification?.description}
          />
          <SwitchField
            label="Visible sur le site"
            name="isVisible"
            defaultChecked={certification?.isVisible ?? true}
          />
        </>
      )}
    </AdminForm>
  );
}

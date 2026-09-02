"use client";

import { AdminForm } from "@/components/admin/form/admin-form";
import { TextField } from "@/components/admin/form/fields";
import { changePassword } from "./actions";

export function PasswordForm() {
  return (
    <AdminForm
      action={changePassword}
      successMessage="Mot de passe mis à jour."
      submitLabel="Mettre à jour le mot de passe"
    >
      {(errors) => (
        <>
          <TextField
            label="Mot de passe actuel"
            name="currentPassword"
            type="password"
            required
            autoComplete="current-password"
            error={errors.currentPassword}
          />
          <TextField
            label="Nouveau mot de passe"
            name="newPassword"
            type="password"
            required
            autoComplete="new-password"
            hint="8 caractères minimum"
            error={errors.newPassword}
          />
          <TextField
            label="Confirmer le nouveau mot de passe"
            name="confirmPassword"
            type="password"
            required
            autoComplete="new-password"
            error={errors.confirmPassword}
          />
        </>
      )}
    </AdminForm>
  );
}

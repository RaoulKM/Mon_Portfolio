import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";

import { requireUser } from "@/lib/auth/guard";
import { AdminPageHeader } from "@/components/admin/page-header";
import { Card } from "@/components/ui/card";
import { PasswordForm } from "./password-form";

export const metadata: Metadata = { title: "Mon compte" };

export default async function AccountPage() {
  const user = await requireUser();

  return (
    <>
      <AdminPageHeader
        title="Mon compte"
        description="Identifiants et sécurité de connexion."
      />

      <div className="grid max-w-2xl gap-6">
        <Card className="p-6">
          <h2 className="mono-eyebrow mb-4">identité</h2>
          <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 font-mono text-sm">
            <dt className="text-muted-foreground">nom</dt>
            <dd>{user.name ?? "—"}</dd>
            <dt className="text-muted-foreground">email</dt>
            <dd>{user.email}</dd>
            <dt className="text-muted-foreground">rôle</dt>
            <dd className="text-accent">{user.role}</dd>
          </dl>
        </Card>

        <Card className="p-6">
          <h2 className="mono-eyebrow mb-1 flex items-center gap-2">
            <ShieldCheck className="size-4" /> changer le mot de passe
          </h2>
          <p className="text-muted-foreground mb-5 text-sm">
            Vous serez toujours connecté après le changement.
          </p>
          <PasswordForm />
        </Card>
      </div>
    </>
  );
}

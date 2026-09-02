"use client";

import * as React from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Copy } from "lucide-react";
import type { Media } from "@prisma/client";

import { AdminForm } from "@/components/admin/form/admin-form";
import { TextField } from "@/components/admin/form/fields";
import { DeleteButton } from "@/components/admin/delete-button";
import { Card } from "@/components/ui/card";
import { saveMedia, deleteMedia } from "./actions";

export function AddMediaForm() {
  return (
    <Card className="p-6">
      <h2 className="mb-1 font-semibold">Ajouter un média</h2>
      <p className="text-muted-foreground mb-4 text-sm">
        L&apos;upload direct nécessite un fournisseur de stockage (Phase 3+). En
        attendant, référencez une URL externe (Cloudinary, S3…).
      </p>
      <AdminForm action={saveMedia} successMessage="Média ajouté.">
        {(errors) => (
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="Nom de fichier" name="filename" required error={errors.filename} />
            <TextField label="URL" name="url" required error={errors.url} />
            <TextField
              label="Type MIME"
              name="mimeType"
              required
              defaultValue="image/png"
              error={errors.mimeType}
            />
            <TextField label="Taille (octets)" name="size" type="number" defaultValue={0} />
            <TextField label="Texte alternatif" name="alt" />
            <TextField label="Dossier" name="folder" />
          </div>
        )}
      </AdminForm>
    </Card>
  );
}

export function MediaGrid({ items }: { items: Media[] }) {
  const copy = (url: string) => {
    navigator.clipboard.writeText(url).then(
      () => toast.success("URL copiée."),
      () => toast.error("Copie impossible."),
    );
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((m) => (
        <Card key={m.id} className="overflow-hidden">
          <div className="bg-muted relative aspect-video">
            {m.mimeType.startsWith("image/") ? (
              <Image
                src={m.url}
                alt={m.alt ?? m.filename}
                fill
                sizes="(max-width: 1024px) 50vw, 33vw"
                className="object-cover"
              />
            ) : (
              <div className="text-muted-foreground flex size-full items-center justify-center text-xs">
                {m.mimeType}
              </div>
            )}
          </div>
          <div className="p-3">
            <p className="truncate text-sm font-medium" title={m.filename}>
              {m.filename}
            </p>
            <div className="mt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={() => copy(m.url)}
                className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-xs"
              >
                <Copy className="size-3.5" /> Copier l&apos;URL
              </button>
              <DeleteButton action={deleteMedia} id={m.id} label={m.filename} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

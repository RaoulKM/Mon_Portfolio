"use client";

import * as React from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Copy, UploadCloud, Loader2, Link2 } from "lucide-react";
import type { Media } from "@prisma/client";

import { cn } from "@/lib/utils";
import { AdminForm } from "@/components/admin/form/admin-form";
import { TextField } from "@/components/admin/form/fields";
import { DeleteButton } from "@/components/admin/delete-button";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { saveMedia, deleteMedia } from "./actions";

type Tab = "upload" | "url";

export function MediaAdder() {
  const [tab, setTab] = React.useState<Tab>("upload");

  return (
    <Card className="p-6">
      <div className="border-border mb-5 flex gap-1 border-b font-mono text-xs">
        <TabButton active={tab === "upload"} onClick={() => setTab("upload")}>
          <UploadCloud className="size-4" /> Upload
        </TabButton>
        <TabButton active={tab === "url"} onClick={() => setTab("url")}>
          <Link2 className="size-4" /> URL externe
        </TabButton>
      </div>
      {tab === "upload" ? <Dropzone /> : <UrlForm />}
    </Card>
  );
}

function TabButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center gap-1.5 border-b-2 px-3 py-2 transition-colors",
        active
          ? "border-accent text-accent"
          : "text-muted-foreground hover:text-foreground border-transparent",
      )}
    >
      {children}
    </button>
  );
}

function Dropzone() {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [busy, setBusy] = React.useState(false);
  const [drag, setDrag] = React.useState(false);

  async function send(files: FileList | File[]) {
    const list = Array.from(files);
    if (list.length === 0) return;
    setBusy(true);
    const fd = new FormData();
    for (const f of list) fd.append("files", f);
    try {
      const res = await fetch("/api/admin/media/upload", {
        method: "POST",
        body: fd,
      });
      const body = await res.json().catch(() => null);
      if (!res.ok) {
        toast.error(body?.error?.message ?? "Upload impossible.");
      } else {
        toast.success(
          `${body.data.length} fichier${body.data.length > 1 ? "s" : ""} ajouté${
            body.data.length > 1 ? "s" : ""
          }.`,
        );
        // refresh server component tree
        window.location.reload();
      }
    } catch {
      toast.error("Erreur réseau pendant l'upload.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDrag(true);
      }}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDrag(false);
        send(e.dataTransfer.files);
      }}
      onClick={() => inputRef.current?.click()}
      className={cn(
        "flex cursor-pointer flex-col items-center gap-2 rounded-lg border border-dashed p-10 text-center transition-colors",
        drag ? "border-accent bg-accent/5" : "border-border hover:border-accent/50",
      )}
    >
      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/*,application/pdf"
        className="hidden"
        onChange={(e) => e.target.files && send(e.target.files)}
      />
      {busy ? (
        <Loader2 className="text-accent size-6 animate-spin" />
      ) : (
        <UploadCloud className="text-muted-foreground size-6" />
      )}
      <p className="font-mono text-sm">
        {busy ? "Envoi en cours…" : "Glissez des fichiers ou cliquez"}
      </p>
      <p className="text-muted-foreground text-xs">
        PNG, JPG, WebP, SVG, PDF — 8 Mo max
      </p>
    </div>
  );
}

function UrlForm() {
  return (
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
  );
}

export function MediaGrid({ items }: { items: Media[] }) {
  const copy = (url: string) => {
    const abs = url.startsWith("http") ? url : `${window.location.origin}${url}`;
    navigator.clipboard.writeText(abs).then(
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
                className="object-contain"
              />
            ) : (
              <div className="text-muted-foreground flex size-full items-center justify-center font-mono text-xs">
                {m.mimeType}
              </div>
            )}
            <span className="bg-background/80 text-terminal-dim absolute left-2 top-2 rounded border border-border px-1.5 py-0.5 font-mono text-[10px] backdrop-blur">
              {m.provider}
            </span>
          </div>
          <div className="p-3">
            <p className="truncate font-mono text-sm" title={m.filename}>
              {m.filename}
            </p>
            <p className="text-muted-foreground text-xs">
              {(m.size / 1024).toFixed(0)} Ko
            </p>
            <div className="mt-2 flex items-center justify-between">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => copy(m.url)}
              >
                <Copy className="size-3.5" /> Copier
              </Button>
              <DeleteButton action={deleteMedia} id={m.id} label={m.filename} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

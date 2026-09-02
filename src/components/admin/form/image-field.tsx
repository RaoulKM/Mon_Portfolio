"use client";

import * as React from "react";
import { toast } from "sonner";
import { UploadCloud, Loader2, X, Link2, Plus } from "lucide-react";

import { cn } from "@/lib/utils";

async function uploadFiles(files: File[]): Promise<string[]> {
  const fd = new FormData();
  for (const f of files) fd.append("files", f);
  const res = await fetch("/api/admin/media/upload", { method: "POST", body: fd });
  const body = await res.json().catch(() => null);
  if (!res.ok) throw new Error(body?.error?.message ?? "Upload impossible.");
  return (body.data as { url: string }[]).map((m) => m.url);
}

const isImage = (url: string) =>
  /\.(png|jpe?g|webp|avif|gif|svg)(\?|$)/i.test(url) || url.startsWith("data:image");

/**
 * Upload-and/or-URL field. `multiple` stores a newline-joined list in a single
 * hidden input (matches the `imageListField` schema); single stores one value.
 */
export function ImageField({
  label,
  name,
  defaultValue,
  multiple = false,
  hint,
  error,
  accept = "image/*",
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  multiple?: boolean;
  hint?: string;
  error?: string[];
  accept?: string;
}) {
  const initial = (defaultValue ?? "")
    .split(/[\n,]/)
    .map((s) => s.trim())
    .filter(Boolean);

  const [urls, setUrls] = React.useState<string[]>(initial);
  const [busy, setBusy] = React.useState(false);
  const [drag, setDrag] = React.useState(false);
  const [showUrl, setShowUrl] = React.useState(false);
  const [urlDraft, setUrlDraft] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const value = multiple ? urls.join("\n") : (urls[0] ?? "");

  const setOne = (next: string[]) => setUrls(multiple ? next : next.slice(-1));

  async function onFiles(list: FileList | File[]) {
    const files = Array.from(list);
    if (files.length === 0) return;
    setBusy(true);
    try {
      const uploaded = await uploadFiles(multiple ? files : files.slice(0, 1));
      setOne([...urls, ...uploaded]);
      toast.success(
        uploaded.length > 1 ? `${uploaded.length} fichiers ajoutés.` : "Fichier ajouté.",
      );
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Upload impossible.");
    } finally {
      setBusy(false);
    }
  }

  function addUrl() {
    const u = urlDraft.trim();
    if (!/^(https?:\/\/|\/)/.test(u)) {
      toast.error("URL invalide.");
      return;
    }
    setOne([...urls, u]);
    setUrlDraft("");
    setShowUrl(false);
  }

  return (
    <div className="space-y-1.5">
      <label className="font-mono text-[13px] font-medium">{label}</label>
      <input type="hidden" name={name} value={value} />

      {/* previews */}
      {urls.length > 0 && (
        <div
          className={cn(
            "grid gap-2",
            multiple ? "grid-cols-3 sm:grid-cols-4" : "grid-cols-1",
          )}
        >
          {urls.map((url, i) => (
            <div
              key={`${url}-${i}`}
              className="border-border bg-muted group relative aspect-video overflow-hidden rounded-md border"
            >
              {isImage(url) ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={url}
                  alt=""
                  className="absolute inset-0 size-full object-contain"
                />
              ) : (
                <span className="text-muted-foreground flex size-full items-center justify-center font-mono text-[10px] break-all p-2">
                  {url.split("/").pop()}
                </span>
              )}
              <button
                type="button"
                onClick={() => setUrls(urls.filter((_, idx) => idx !== i))}
                className="bg-background/80 absolute right-1 top-1 rounded p-0.5 opacity-0 backdrop-blur transition-opacity group-hover:opacity-100"
                aria-label="Retirer"
              >
                <X className="text-destructive size-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* dropzone (hidden once single value set unless multiple) */}
      {(multiple || urls.length === 0) && (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDrag(true);
          }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDrag(false);
            onFiles(e.dataTransfer.files);
          }}
          onClick={() => inputRef.current?.click()}
          className={cn(
            "flex cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed px-4 py-4 text-center font-mono text-xs transition-colors",
            drag
              ? "border-accent bg-accent/5"
              : "border-border hover:border-accent/50 text-muted-foreground",
          )}
        >
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            multiple={multiple}
            className="hidden"
            onChange={(e) => e.target.files && onFiles(e.target.files)}
          />
          {busy ? (
            <Loader2 className="text-accent size-4 animate-spin" />
          ) : (
            <UploadCloud className="size-4" />
          )}
          {busy ? "Envoi…" : multiple ? "Ajouter des fichiers" : "Uploader un fichier"}
        </div>
      )}

      {/* URL entry */}
      {showUrl ? (
        <div className="flex gap-2">
          <input
            value={urlDraft}
            onChange={(e) => setUrlDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addUrl())}
            placeholder="https://… ou /uploads/…"
            className="border-input bg-background/60 flex-1 rounded-md border px-3 py-1.5 font-mono text-xs outline-none"
          />
          <button
            type="button"
            onClick={addUrl}
            className="border-accent/40 bg-accent/10 text-accent rounded-md border px-3 text-xs"
          >
            <Plus className="size-3.5" />
          </button>
        </div>
      ) : (
        (multiple || urls.length === 0) && (
          <button
            type="button"
            onClick={() => setShowUrl(true)}
            className="text-muted-foreground hover:text-accent inline-flex items-center gap-1 font-mono text-[11px]"
          >
            <Link2 className="size-3" /> ou coller une URL
          </button>
        )
      )}

      {hint && !error?.length && (
        <p className="text-muted-foreground text-xs">{hint}</p>
      )}
      {error?.map((e, i) => (
        <p key={i} className="text-destructive text-xs">
          {e}
        </p>
      ))}
    </div>
  );
}

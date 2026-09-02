import "server-only";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomBytes } from "node:crypto";

import type { StorageProvider, StoredFile } from "./index";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

function safeName(original: string): string {
  const ext = path.extname(original).toLowerCase().replace(/[^.a-z0-9]/g, "");
  const base = path
    .basename(original, path.extname(original))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
    .slice(0, 60);
  return `${base || "file"}-${randomBytes(4).toString("hex")}${ext}`;
}

/** Writes uploads to /public/uploads and serves them from /uploads/<name>. */
export class LocalStorageProvider implements StorageProvider {
  readonly name = "local";

  async upload(file: File): Promise<StoredFile> {
    await mkdir(UPLOAD_DIR, { recursive: true });
    const filename = safeName(file.name || "upload");
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(path.join(UPLOAD_DIR, filename), buffer);

    return {
      url: `/uploads/${filename}`,
      filename,
      mimeType: file.type || "application/octet-stream",
      size: buffer.byteLength,
      provider: "local",
    };
  }

  async delete(url: string): Promise<void> {
    if (!url.startsWith("/uploads/")) return;
    try {
      const { unlink } = await import("node:fs/promises");
      await unlink(path.join(UPLOAD_DIR, path.basename(url)));
    } catch {
      /* already gone */
    }
  }
}

/**
 * Storage abstraction (spec §5).
 *
 * The app never talks to Cloudinary / S3 / local disk directly — it goes
 * through a `StorageProvider`. Swap the implementation via `STORAGE_PROVIDER`
 * without touching call sites.
 */

export interface StoredFile {
  url: string;
  filename: string;
  mimeType: string;
  size: number;
  width?: number;
  height?: number;
  provider: string;
}

export interface StorageProvider {
  readonly name: string;
  upload(file: File, opts?: { folder?: string }): Promise<StoredFile>;
  delete(url: string): Promise<void>;
}

class LocalStorageProvider implements StorageProvider {
  readonly name = "local";

  async upload(): Promise<StoredFile> {
    throw new Error(
      "LocalStorageProvider.upload not implemented — configure a real provider (Phase 3).",
    );
  }

  async delete(): Promise<void> {
    // no-op placeholder
  }
}

let cached: StorageProvider | null = null;

export function getStorage(): StorageProvider {
  if (cached) return cached;

  const provider = process.env.STORAGE_PROVIDER ?? "local";
  switch (provider) {
    case "cloudinary":
    case "s3":
      // Implemented in Phase 3 — fall back to local for now.
      cached = new LocalStorageProvider();
      break;
    default:
      cached = new LocalStorageProvider();
  }
  return cached;
}

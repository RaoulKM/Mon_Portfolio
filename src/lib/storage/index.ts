import "server-only";

import { LocalStorageProvider } from "./local";

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

let cached: StorageProvider | null = null;

export function getStorage(): StorageProvider {
  if (cached) return cached;

  const provider = process.env.STORAGE_PROVIDER ?? "local";
  if (provider === "cloudinary" || provider === "s3") {
    // TODO(Phase 6): real cloud providers. Fall back to local disk for now.
    console.warn(`[storage] "${provider}" not implemented — using local disk`);
  }

  cached = new LocalStorageProvider();
  return cached;
}

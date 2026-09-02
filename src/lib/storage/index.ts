import "server-only";

import { LocalStorageProvider } from "./local";
import { CloudinaryStorageProvider } from "./cloudinary";

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

function hasCloudinaryCreds() {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET,
  );
}

export function getStorage(): StorageProvider {
  if (cached) return cached;

  const provider = process.env.STORAGE_PROVIDER ?? "local";

  if (provider === "cloudinary") {
    if (hasCloudinaryCreds()) {
      cached = new CloudinaryStorageProvider();
      return cached;
    }
    console.warn(
      "[storage] STORAGE_PROVIDER=cloudinary but credentials are missing — using local disk",
    );
  } else if (provider === "s3") {
    console.warn('[storage] "s3" not implemented — using local disk');
  }

  cached = new LocalStorageProvider();
  return cached;
}

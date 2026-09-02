import "server-only";
import { v2 as cloudinary } from "cloudinary";

import type { StorageProvider, StoredFile } from "./index";

let configured = false;

function configure() {
  if (configured) return;
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
  configured = true;
}

const FOLDER = process.env.CLOUDINARY_FOLDER || "portfolio";

/** Derive `{ public_id, resource_type }` from a stored secure_url. */
function parseRef(url: string): { publicId: string; resourceType: string } | null {
  const m = url.match(
    /\/(image|video|raw)\/upload\/(?:v\d+\/)?(.+?)(?:\.[a-z0-9]+)?$/i,
  );
  if (!m) return null;
  return { resourceType: m[1], publicId: decodeURIComponent(m[2]) };
}

export class CloudinaryStorageProvider implements StorageProvider {
  readonly name = "cloudinary";

  async upload(file: File, opts?: { folder?: string }): Promise<StoredFile> {
    configure();
    const buffer = Buffer.from(await file.arrayBuffer());
    const dataUri = `data:${file.type || "application/octet-stream"};base64,${buffer.toString("base64")}`;

    const res = await cloudinary.uploader.upload(dataUri, {
      folder: [FOLDER, opts?.folder].filter(Boolean).join("/"),
      resource_type: "auto",
      use_filename: true,
      unique_filename: true,
      overwrite: false,
    });

    return {
      url: res.secure_url,
      filename: `${res.original_filename ?? "file"}.${res.format ?? ""}`.replace(/\.$/, ""),
      mimeType: file.type || `${res.resource_type}/${res.format ?? "bin"}`,
      size: res.bytes ?? buffer.byteLength,
      width: res.width,
      height: res.height,
      provider: "cloudinary",
    };
  }

  async delete(url: string): Promise<void> {
    configure();
    const ref = parseRef(url);
    if (!ref) return;
    try {
      await cloudinary.uploader.destroy(ref.publicId, {
        resource_type: ref.resourceType,
        invalidate: true,
      });
    } catch {
      /* already gone */
    }
  }
}

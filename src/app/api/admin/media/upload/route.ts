import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { apiRequire } from "@/lib/auth/guard";
import { getStorage } from "@/lib/storage";
import { logAudit } from "@/lib/admin/audit";
import {
  created,
  fail,
  forbidden,
  serverError,
  unauthorized,
} from "@/lib/api/response";

const MAX_BYTES = 8 * 1024 * 1024; // 8 MB
const ALLOWED = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/avif",
  "image/gif",
  "image/svg+xml",
  "application/pdf",
];

export async function POST(req: Request) {
  const { user, error } = await apiRequire("MANAGE_MEDIA");
  if (error === "unauthorized") return unauthorized();
  if (error === "forbidden") return forbidden();

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return fail("Requête multipart invalide", 400);
  }

  const files = form.getAll("files").filter((f): f is File => f instanceof File);
  const folder = (form.get("folder") as string) || null;
  if (files.length === 0) return fail("Aucun fichier fourni", 400);

  const storage = getStorage();
  const results = [];

  try {
    for (const file of files) {
      if (file.size > MAX_BYTES) {
        return fail(`"${file.name}" dépasse 8 Mo`, 413);
      }
      if (file.type && !ALLOWED.includes(file.type)) {
        return fail(`Type non autorisé : ${file.type}`, 415);
      }

      const stored = await storage.upload(file, { folder: folder ?? undefined });
      const media = await prisma.media.create({
        data: {
          filename: stored.filename,
          url: stored.url,
          mimeType: stored.mimeType,
          size: stored.size,
          width: stored.width ?? null,
          height: stored.height ?? null,
          folder,
          provider: stored.provider,
        },
      });
      results.push(media);
    }

    await logAudit({
      action: "MEDIA_UPLOADED",
      entity: "Media",
      userId: user.id,
      metadata: { count: results.length },
    });
    revalidatePath("/admin/media");
    return created(results);
  } catch (err) {
    return serverError(err);
  }
}

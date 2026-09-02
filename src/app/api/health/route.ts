import { prisma } from "@/lib/prisma";
import { ok, serverError } from "@/lib/api/response";

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return ok({ status: "ok", db: "up" });
  } catch (err) {
    return serverError(err);
  }
}

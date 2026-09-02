import { ZodError } from "zod";

import { prisma } from "@/lib/prisma";
import { projectSchema } from "@/lib/validation/project";
import { apiRequire } from "@/lib/auth/guard";
import { slugify } from "@/lib/utils";
import {
  created,
  fromZodError,
  forbidden,
  ok,
  serverError,
  unauthorized,
} from "@/lib/api/response";

/** Public: list published projects. */
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      where: { isPublished: true },
      orderBy: [{ featured: "desc" }, { displayOrder: "asc" }, { createdAt: "desc" }],
      include: { technologies: true, category: true },
    });
    return ok(projects);
  } catch (err) {
    return serverError(err);
  }
}

/** Admin: create a project (spec §23, §37 — protected). */
export async function POST(req: Request) {
  const { user, error } = await apiRequire("MANAGE_PROJECTS");
  if (error === "unauthorized") return unauthorized();
  if (error === "forbidden") return forbidden();

  try {
    const input = projectSchema.parse(await req.json());
    const { technologyIds, categoryId, slug, ...rest } = input;

    const project = await prisma.project.create({
      data: {
        ...rest,
        slug: slug || slugify(input.title),
        category: categoryId ? { connect: { id: categoryId } } : undefined,
        technologies: technologyIds.length
          ? { connect: technologyIds.map((id) => ({ id })) }
          : undefined,
      },
    });

    await prisma.auditLog.create({
      data: {
        action: "PROJECT_CREATED",
        entity: "Project",
        entityId: project.id,
        userId: user.id,
      },
    });

    return created(project);
  } catch (err) {
    if (err instanceof ZodError) return fromZodError(err);
    return serverError(err);
  }
}

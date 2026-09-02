import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { ProjectListItem } from "@/lib/queries";

export function ProjectCard({ project }: { project: ProjectListItem }) {
  return (
    <Card className="group flex flex-col overflow-hidden transition-shadow hover:shadow-lg">
      <Link href={`/projects/${project.slug}`} className="block">
        <div className="bg-muted relative aspect-video overflow-hidden">
          {project.coverImage ? (
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="text-muted-foreground flex size-full items-center justify-center text-2xl font-bold">
              {project.title}
            </div>
          )}
          {project.featured && (
            <Badge variant="accent" className="absolute left-3 top-3">
              En vedette
            </Badge>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold">
            <Link href={`/projects/${project.slug}`} className="hover:underline">
              {project.title}
            </Link>
          </h3>
          <ArrowUpRight className="text-muted-foreground size-4 shrink-0" />
        </div>

        <p className="text-muted-foreground mt-2 line-clamp-3 flex-1 text-sm">
          {project.shortDescription}
        </p>

        {project.technologies.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 5).map((t) => (
              <Badge key={t.id} variant="outline">
                {t.name}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}

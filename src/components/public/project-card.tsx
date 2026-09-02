import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { TiltCard } from "@/components/motion/tilt-card";
import type { ProjectListItem } from "@/lib/queries";

const STATUS_LABEL: Record<string, string> = {
  PLANNED: "planifié",
  IN_PROGRESS: "en cours",
  COMPLETED: "livré",
  MAINTENANCE: "maintenance",
  ARCHIVED: "archivé",
};

export function ProjectCard({
  project,
  index,
}: {
  project: ProjectListItem;
  index?: number;
}) {
  return (
    <TiltCard className="h-full">
      <div className="group bg-card/70 border-border hover:border-accent/50 relative flex h-full flex-col overflow-hidden rounded-xl border backdrop-blur transition-colors duration-300 hover:shadow-[0_0_40px_-12px_var(--glow-color)]">
        <Link href={`/projects/${project.slug}`} className="block">
          <div className="bg-muted relative aspect-video overflow-hidden">
            {project.coverImage ? (
              <Image
                src={project.coverImage}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="dot-bg text-muted-foreground flex size-full items-center justify-center font-mono text-xl font-bold">
                {project.title}
              </div>
            )}
            <div className="absolute left-3 top-3 flex gap-2">
              {typeof index === "number" && (
                <span className="bg-background/80 text-terminal-dim rounded border border-border px-1.5 py-0.5 font-mono text-[10px] backdrop-blur">
                  {String(index + 1).padStart(2, "0")}
                </span>
              )}
              {project.featured && (
                <Badge variant="accent">en vedette</Badge>
              )}
            </div>
          </div>
        </Link>

        <div className="flex flex-1 flex-col p-5">
          <div className="text-muted-foreground flex items-center justify-between font-mono text-[11px] uppercase tracking-wide">
            <span>{project.category?.name ?? "projet"}</span>
            <span className="text-terminal-dim">
              {STATUS_LABEL[project.status] ?? ""}
            </span>
          </div>

          <h3 className="mt-2 flex items-start justify-between gap-2 font-semibold">
            <Link href={`/projects/${project.slug}`} className="link-underline">
              {project.title}
            </Link>
            <ArrowUpRight className="text-muted-foreground group-hover:text-accent size-4 shrink-0 transition-colors" />
          </h3>

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
      </div>
    </TiltCard>
  );
}

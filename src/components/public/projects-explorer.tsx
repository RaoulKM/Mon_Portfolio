"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { ProjectCard } from "@/components/public/project-card";
import { EmptyState } from "@/components/public/empty-state";
import type { ProjectListItem } from "@/lib/queries";

export function ProjectsExplorer({ projects }: { projects: ProjectListItem[] }) {
  const technologies = React.useMemo(() => {
    const names = new Set<string>();
    for (const p of projects) for (const t of p.technologies) names.add(t.name);
    return Array.from(names).sort();
  }, [projects]);

  const [active, setActive] = React.useState<string | null>(null);

  const filtered = active
    ? projects.filter((p) => p.technologies.some((t) => t.name === active))
    : projects;

  if (projects.length === 0) {
    return <EmptyState message="Les projets seront bientôt disponibles." />;
  }

  return (
    <div>
      {technologies.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
          <Chip active={active === null} onClick={() => setActive(null)}>
            Tous
          </Chip>
          {technologies.map((name) => (
            <Chip
              key={name}
              active={active === name}
              onClick={() => setActive(name)}
            >
              {name}
            </Chip>
          ))}
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </div>
  );
}

function Chip({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1 text-sm transition-colors",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border hover:bg-muted",
      )}
    >
      {children}
    </button>
  );
}

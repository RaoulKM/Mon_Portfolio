"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";
import { ProjectCard } from "@/components/public/project-card";
import { EmptyState } from "@/components/public/empty-state";
import type { ProjectListItem } from "@/lib/queries";

export function ProjectsExplorer({ projects }: { projects: ProjectListItem[] }) {
  const reduce = useReducedMotion();
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
        <div className="mb-8 flex flex-wrap gap-2 font-mono text-xs">
          <Chip active={active === null} onClick={() => setActive(null)}>
            ./tous
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

      <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((p, i) => (
            <motion.div
              key={p.id}
              layout
              initial={reduce ? false : { opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, delay: Math.min(i * 0.04, 0.3) }}
            >
              <ProjectCard project={p} index={i} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
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
        "rounded-md border px-3 py-1 transition-colors",
        active
          ? "border-accent/50 bg-accent/15 text-accent"
          : "border-border text-muted-foreground hover:border-accent/40 hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

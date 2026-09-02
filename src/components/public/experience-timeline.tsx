"use client";

import * as React from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { formatDateRange } from "@/lib/utils";
import type { Experience } from "@prisma/client";
import type { Locale } from "@/i18n/routing";

export function ExperienceTimeline({
  items,
  locale,
  currentLabel,
  presentLabel,
}: {
  items: Experience[];
  locale: Locale;
  currentLabel: string;
  presentLabel: string;
}) {
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <ol ref={ref} className="relative ml-3 space-y-12">
      {/* base rail */}
      <div className="bg-border absolute inset-y-0 left-0 w-px" />
      {/* progress rail */}
      {!reduce && (
        <motion.div
          className="from-accent to-primary absolute left-0 top-0 w-px bg-gradient-to-b"
          style={{ height }}
        />
      )}

      {items.map((exp, i) => (
        <motion.li
          key={exp.id}
          className="ml-6"
          initial={reduce ? false : { opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: i * 0.05 }}
        >
          <span className="border-accent bg-background absolute -left-[7px] mt-1.5 size-3.5 rounded-full border-2 shadow-[0_0_12px_var(--glow-color)]" />
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-semibold">{exp.position}</h3>
            {exp.isCurrent && <Badge variant="accent">{currentLabel}</Badge>}
          </div>
          <p className="text-muted-foreground font-mono text-sm">
            {exp.company}
            {exp.location ? ` · ${exp.location}` : ""}
          </p>
          <p className="text-terminal-dim mt-0.5 font-mono text-xs">
            {formatDateRange(exp.startDate, exp.endDate, {
              locale,
              present: presentLabel,
            })}
          </p>
          {exp.description && (
            <p className="mt-3 text-sm text-pretty">{exp.description}</p>
          )}
          {exp.responsibilities.length > 0 && (
            <ul className="text-muted-foreground mt-3 space-y-1 text-sm">
              {exp.responsibilities.map((r, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="text-terminal-dim">▹</span>
                  {r}
                </li>
              ))}
            </ul>
          )}
          {exp.technologies.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {exp.technologies.map((t) => (
                <Badge key={t} variant="outline">
                  {t}
                </Badge>
              ))}
            </div>
          )}
        </motion.li>
      ))}
    </ol>
  );
}

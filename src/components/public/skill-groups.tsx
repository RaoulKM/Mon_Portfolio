"use client";

import { motion, useReducedMotion } from "framer-motion";

import { Card } from "@/components/ui/card";
import { EASE_OUT } from "@/lib/motion";
import type { SkillGroup } from "@/lib/queries";

export function SkillGroups({ groups }: { groups: SkillGroup[] }) {
  const reduce = useReducedMotion();

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {groups.map((group, gi) => (
        <motion.div
          key={group.category}
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: gi * 0.06 }}
        >
          <Card className="hover:border-accent/40 h-full p-6 transition-colors">
            <h3 className="flex items-center gap-2 font-mono text-sm">
              <span className="text-terminal-dim">{String(gi + 1).padStart(2, "0")}</span>
              <span className="text-accent">{group.label}</span>
            </h3>
            <ul className="mt-5 space-y-4">
              {group.skills.map((skill, si) => {
                const pct = Math.min(100, Math.max(0, skill.level));
                return (
                  <li key={skill.id}>
                    <div className="mb-1.5 flex items-center justify-between font-mono text-[13px]">
                      <span>{skill.name}</span>
                      <span className="text-muted-foreground">{pct}%</span>
                    </div>
                    <div className="bg-muted h-1.5 overflow-hidden rounded-full">
                      <motion.div
                        className="from-primary to-accent h-full rounded-full bg-gradient-to-r"
                        initial={reduce ? false : { width: 0 }}
                        whileInView={{ width: `${pct}%` }}
                        viewport={{ once: true, amount: 1 }}
                        transition={{
                          duration: 0.9,
                          delay: 0.15 + si * 0.05,
                          ease: EASE_OUT,
                        }}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

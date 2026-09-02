import * as React from "react";
import { cn } from "@/lib/utils";

export function AdminTable({
  head,
  children,
  className,
}: {
  head: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="border-border bg-card/50 overflow-x-auto rounded-xl border backdrop-blur-sm">
      <table className={cn("w-full min-w-[640px] text-sm", className)}>
        <thead className="border-border text-terminal-dim border-b text-left font-mono text-[11px] tracking-wider uppercase">
          <tr className="[&>th]:px-4 [&>th]:py-3 [&>th]:font-medium">{head}</tr>
        </thead>
        <tbody className="divide-border divide-y [&>tr]:transition-colors [&>tr:hover]:bg-muted/40 [&>tr>td]:px-4 [&>tr>td]:py-3">
          {children}
        </tbody>
      </table>
    </div>
  );
}

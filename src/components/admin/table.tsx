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
    <div className="border-border overflow-x-auto rounded-xl border">
      <table className={cn("w-full text-sm", className)}>
        <thead className="bg-muted/50 text-muted-foreground text-left text-xs uppercase tracking-wide">
          <tr className="[&>th]:px-4 [&>th]:py-3 [&>th]:font-medium">{head}</tr>
        </thead>
        <tbody className="divide-border divide-y [&>tr>td]:px-4 [&>tr>td]:py-3">
          {children}
        </tbody>
      </table>
    </div>
  );
}

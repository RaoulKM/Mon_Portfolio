import { ArrowDownRight, ArrowUpRight, Minus, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Counter } from "@/components/motion/counter";

export function StatCard({
  label,
  value,
  delta,
  icon: Icon,
  invertDelta = false,
}: {
  label: string;
  value: number | null | undefined;
  delta?: number | null;
  icon?: LucideIcon;
  invertDelta?: boolean;
}) {
  const good =
    delta == null || delta === 0
      ? null
      : invertDelta
        ? delta < 0
        : delta > 0;

  return (
    <div className="border-border bg-card/60 rounded-xl border p-5 backdrop-blur-sm">
      <div className="text-muted-foreground flex items-center justify-between font-mono text-[11px] tracking-wide uppercase">
        <span className="flex items-center gap-2">
          {Icon && <Icon className="size-3.5" />}
          {label}
        </span>
        {delta != null && (
          <span
            className={cn(
              "flex items-center gap-0.5",
              good === null && "text-muted-foreground",
              good === true && "text-chart-4",
              good === false && "text-destructive",
            )}
          >
            {delta === 0 ? (
              <Minus className="size-3" />
            ) : delta > 0 ? (
              <ArrowUpRight className="size-3" />
            ) : (
              <ArrowDownRight className="size-3" />
            )}
            {Math.abs(delta)}%
          </span>
        )}
      </div>
      <p className="mt-2 font-mono text-3xl font-bold tracking-tight">
        {value == null ? "—" : <Counter value={value} />}
      </p>
    </div>
  );
}

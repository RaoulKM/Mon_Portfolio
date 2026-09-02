"use client";

interface TooltipEntry {
  color?: string;
  name?: string | number;
  value?: string | number;
}
interface Props {
  active?: boolean;
  label?: string | number;
  payload?: TooltipEntry[];
}

/** Themed tooltip shared by every chart. */
export function ChartTooltip({ active, payload, label }: Props) {
  if (!active || !payload?.length) return null;
  return (
    <div className="border-border bg-popover text-popover-foreground rounded-md border px-3 py-2 font-mono text-xs shadow-lg">
      {label != null && (
        <p className="text-muted-foreground mb-1">{String(label)}</p>
      )}
      {payload.map((entry, i) => (
        <p key={i} className="flex items-center gap-2">
          <span
            className="size-2 rounded-full"
            style={{ background: entry.color }}
          />
          <span className="text-muted-foreground">{entry.name}</span>
          <span className="ml-auto font-medium">{entry.value}</span>
        </p>
      ))}
    </div>
  );
}

export const AXIS_PROPS = {
  tick: { fontSize: 11, fontFamily: "var(--font-mono)", fill: "var(--muted-foreground)" },
  tickLine: false,
  axisLine: false,
} as const;

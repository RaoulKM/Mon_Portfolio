"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import { ChartTooltip } from "./chart-tooltip";

const PALETTE = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)"];

export function DeviceDonut({
  data,
}: {
  data: { device: string; count: number }[];
}) {
  const total = data.reduce((s, d) => s + d.count, 0);

  if (total === 0) {
    return (
      <div className="text-muted-foreground flex h-64 items-center justify-center font-mono text-sm">
        Pas encore de données appareil.
      </div>
    );
  }

  return (
    <div className="flex h-64 items-center gap-6">
      <div className="h-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip content={<ChartTooltip />} />
            <Pie
              data={data}
              dataKey="count"
              nameKey="device"
              innerRadius="58%"
              outerRadius="88%"
              paddingAngle={2}
              stroke="var(--card)"
            >
              {data.map((_, i) => (
                <Cell key={i} fill={PALETTE[i % PALETTE.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <ul className="space-y-2 font-mono text-xs">
        {data.map((d, i) => (
          <li key={d.device} className="flex items-center gap-2">
            <span
              className="size-2.5 rounded-full"
              style={{ background: PALETTE[i % PALETTE.length] }}
            />
            <span className="capitalize">{d.device}</span>
            <span className="text-muted-foreground ml-auto">
              {Math.round((d.count / total) * 100)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { ChartTooltip, AXIS_PROPS } from "./chart-tooltip";
import type { TimePoint } from "@/lib/queries/analytics";

export function TrendArea({ data }: { data: TimePoint[] }) {
  if (data.length === 0) {
    return (
      <div className="text-muted-foreground flex h-72 items-center justify-center font-mono text-sm">
        Aucune donnée sur la période.
      </div>
    );
  }

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
          <defs>
            <linearGradient id="fillViews" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--chart-2)" stopOpacity={0.35} />
              <stop offset="100%" stopColor="var(--chart-2)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="fillVisitors" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.25} />
              <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 3" />
          <XAxis dataKey="label" {...AXIS_PROPS} minTickGap={24} />
          <YAxis {...AXIS_PROPS} width={44} allowDecimals={false} />
          <Tooltip content={<ChartTooltip />} cursor={{ stroke: "var(--border)" }} />
          <Area
            type="monotone"
            dataKey="visitors"
            name="Visiteurs"
            stroke="var(--chart-1)"
            strokeWidth={1.5}
            fill="url(#fillVisitors)"
          />
          <Area
            type="monotone"
            dataKey="views"
            name="Pages vues"
            stroke="var(--chart-2)"
            strokeWidth={2}
            fill="url(#fillViews)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

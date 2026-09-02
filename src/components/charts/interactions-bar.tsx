"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { ChartTooltip, AXIS_PROPS } from "./chart-tooltip";

const PALETTE = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
  "var(--chart-2)",
];

export function InteractionsBar({
  data,
}: {
  data: { label: string; count: number }[];
}) {
  if (data.every((d) => d.count === 0)) {
    return (
      <div className="text-muted-foreground flex h-64 items-center justify-center font-mono text-sm">
        Aucune interaction sur la période.
      </div>
    );
  }

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 4, right: 16, bottom: 4, left: 8 }}
        >
          <CartesianGrid horizontal={false} stroke="var(--border)" strokeDasharray="3 3" />
          <XAxis type="number" {...AXIS_PROPS} allowDecimals={false} />
          <YAxis
            type="category"
            dataKey="label"
            {...AXIS_PROPS}
            width={92}
          />
          <Tooltip content={<ChartTooltip />} cursor={{ fill: "var(--muted)" }} />
          <Bar dataKey="count" name="Total" radius={[0, 4, 4, 0]} barSize={18}>
            {data.map((_, i) => (
              <Cell key={i} fill={PALETTE[i % PALETTE.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/** Infinite horizontal scroller; content is duplicated for a seamless loop. */
export function Marquee({
  children,
  className,
  reverse,
}: {
  children: React.ReactNode;
  className?: string;
  reverse?: boolean;
}) {
  return (
    <div
      className={cn(
        "group relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
        className,
      )}
    >
      {[0, 1].map((i) => (
        <div
          key={i}
          aria-hidden={i === 1}
          className="flex shrink-0 items-center gap-8 pr-8 animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none"
          style={reverse ? { animationDirection: "reverse" } : undefined}
        >
          {children}
        </div>
      ))}
    </div>
  );
}

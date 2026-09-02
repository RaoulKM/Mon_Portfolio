"use client";

import type { AnalyticsEventType } from "@prisma/client";
import { trackEvent } from "@/lib/analytics/client";

/** External anchor that logs an interaction event on click (§21). */
export function TrackedLink({
  event,
  entityId,
  children,
  ...props
}: React.ComponentProps<"a"> & {
  event: AnalyticsEventType;
  entityId?: string;
}) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      {...props}
      onClick={(e) => {
        trackEvent({ eventType: event, entityId, path: props.href });
        props.onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}

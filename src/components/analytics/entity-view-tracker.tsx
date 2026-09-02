"use client";

import { useEffect } from "react";
import type { AnalyticsEventType } from "@prisma/client";

import { trackEvent } from "@/lib/analytics/client";

/** Fires a one-off view event for a specific entity (project / article). */
export function EntityViewTracker({
  event,
  entityId,
  path,
}: {
  event: AnalyticsEventType;
  entityId: string;
  path: string;
}) {
  useEffect(() => {
    trackEvent({ eventType: event, entityId, path });
  }, [event, entityId, path]);

  return null;
}

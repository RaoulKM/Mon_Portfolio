"use client";

import type { AnalyticsEventType } from "@prisma/client";

const SESSION_KEY = "kmpr_sid";

function sessionId(): string | undefined {
  if (typeof window === "undefined") return undefined;
  try {
    let id = sessionStorage.getItem(SESSION_KEY);
    if (!id) {
      id = crypto.randomUUID();
      sessionStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return undefined;
  }
}

export interface ClientEvent {
  eventType: AnalyticsEventType;
  path?: string;
  entityId?: string;
}

/** Fire-and-forget analytics beacon to the internal endpoint (§22). */
export function trackEvent(event: ClientEvent): void {
  if (typeof window === "undefined") return;

  const payload = JSON.stringify({
    ...event,
    sessionId: sessionId(),
    referrer: document.referrer || undefined,
  });

  try {
    if (navigator.sendBeacon) {
      navigator.sendBeacon(
        "/api/analytics/events",
        new Blob([payload], { type: "application/json" }),
      );
      return;
    }
  } catch {
    /* fall through to fetch */
  }

  void fetch("/api/analytics/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: payload,
    keepalive: true,
  }).catch(() => {});
}

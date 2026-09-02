import "server-only";
import type { AnalyticsEventType } from "@prisma/client";

import { prisma } from "@/lib/prisma";

/**
 * Internal analytics tracker (spec §22).
 * Deliberately stores no direct PII — coarse device/browser/country only.
 */
export interface TrackInput {
  eventType: AnalyticsEventType;
  path?: string;
  entityId?: string;
  sessionId?: string;
  country?: string;
  device?: string;
  browser?: string;
  referrer?: string;
}

export async function track(input: TrackInput): Promise<void> {
  try {
    await prisma.analyticsEvent.create({ data: input });
  } catch (err) {
    // Analytics must never break a user-facing request.
    console.error("[analytics] failed to record event", err);
  }
}

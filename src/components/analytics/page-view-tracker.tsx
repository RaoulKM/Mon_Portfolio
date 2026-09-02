"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { trackEvent } from "@/lib/analytics/client";

/** Records a PAGE_VIEW on every client navigation (mounted in the public layout). */
export function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/admin")) return;
    trackEvent({ eventType: "PAGE_VIEW", path: pathname });
  }, [pathname]);

  return null;
}

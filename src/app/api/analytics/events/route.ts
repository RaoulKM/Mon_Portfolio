import { z, ZodError } from "zod";

import { rateLimit, clientIp } from "@/lib/api/rate-limit";
import { track } from "@/lib/analytics";
import { parseBrowser, parseDevice } from "@/lib/analytics/ua";
import { fail, fromZodError, noContent, serverError, tooManyRequests } from "@/lib/api/response";

const eventSchema = z.object({
  eventType: z.enum([
    "PAGE_VIEW",
    "PROJECT_VIEW",
    "ARTICLE_VIEW",
    "GITHUB_CLICK",
    "LIVE_DEMO_CLICK",
    "CV_DOWNLOAD",
    "CONTACT_SUBMIT",
    "SOCIAL_CLICK",
  ]),
  path: z.string().max(512).optional(),
  entityId: z.string().max(64).optional(),
  sessionId: z.string().max(64).optional(),
  referrer: z.string().max(512).optional(),
});

export async function POST(req: Request) {
  const ip = clientIp(req);
  const limit = rateLimit(`analytics:${ip}`, { limit: 60, windowMs: 60_000 });
  if (!limit.success) return tooManyRequests();

  try {
    const data = eventSchema.parse(await req.json());
    const ua = req.headers.get("user-agent");
    await track({
      ...data,
      device: parseDevice(ua),
      browser: parseBrowser(ua),
    });
    return noContent();
  } catch (err) {
    if (err instanceof ZodError) return fromZodError(err);
    if (err instanceof SyntaxError) return fail("Corps de requête invalide", 400);
    return serverError(err);
  }
}

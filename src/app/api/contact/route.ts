import { ZodError } from "zod";

import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/validation/contact";
import { rateLimit, clientIp } from "@/lib/api/rate-limit";
import { created, fail, fromZodError, serverError, tooManyRequests } from "@/lib/api/response";
import { sendEmail } from "@/lib/email";
import { getSiteSettings } from "@/lib/queries/settings";
import { track } from "@/lib/analytics";

export async function POST(req: Request) {
  const ip = clientIp(req);

  const limit = rateLimit(`contact:${ip}`, { limit: 5, windowMs: 10 * 60_000 });
  if (!limit.success) return tooManyRequests();

  try {
    const body = await req.json();
    const data = contactSchema.parse(body);

    // Honeypot — silently accept but drop.
    if (data.website && data.website.length > 0) {
      return created({ ok: true });
    }

    const message = await prisma.contactMessage.create({
      data: {
        name: data.name,
        email: data.email,
        company: data.company || null,
        subject: data.subject || null,
        message: data.message,
        ip,
        userAgent: req.headers.get("user-agent") ?? null,
      },
    });

    const settings = await getSiteSettings();
    const notifyTo =
      settings.contact.notificationEmail ||
      settings.contact.contactEmail ||
      process.env.EMAIL_FROM ||
      "admin@localhost";

    const notifyBody = [
      `De : ${data.name} <${data.email}>`,
      data.company ? `Société : ${data.company}` : null,
      `Objet : ${data.subject || "(sans objet)"}`,
      "",
      data.message,
    ]
      .filter((line): line is string => line !== null)
      .join("\n");

    await Promise.allSettled([
      sendEmail({
        to: notifyTo,
        replyTo: data.email,
        subject: `Nouveau message — ${data.subject || "(sans objet)"}`,
        text: notifyBody,
      }),
      track({ eventType: "CONTACT_SUBMIT", path: "/contact" }),
    ]);

    return created({ id: message.id });
  } catch (err) {
    if (err instanceof ZodError) return fromZodError(err);
    if (err instanceof SyntaxError) return fail("Corps de requête invalide", 400);
    return serverError(err);
  }
}

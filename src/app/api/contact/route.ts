import { ZodError } from "zod";

import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/validation/contact";
import { rateLimit, clientIp } from "@/lib/api/rate-limit";
import { created, fail, fromZodError, serverError, tooManyRequests } from "@/lib/api/response";
import { sendEmail } from "@/lib/email";
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

    await Promise.allSettled([
      sendEmail({
        to: process.env.EMAIL_FROM ?? "admin@localhost",
        subject: `Nouveau message: ${data.subject || "(sans objet)"}`,
        text: `${data.name} <${data.email}>\n\n${data.message}`,
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

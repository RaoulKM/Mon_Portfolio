/**
 * Email abstraction (spec §18).
 * Phase 1 ships a console transport; a real SMTP / provider transport is
 * wired in a later phase via EMAIL_SERVER / EMAIL_FROM.
 */

export interface EmailMessage {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

export async function sendEmail(message: EmailMessage): Promise<void> {
  if (!process.env.EMAIL_SERVER) {
    console.info("[email:console]", {
      from: process.env.EMAIL_FROM ?? "no-reply@localhost",
      ...message,
    });
    return;
  }

  // TODO(Phase 3): real transport (nodemailer / Resend / etc.)
  throw new Error("Email transport configured but not implemented yet.");
}

/**
 * Email abstraction (spec §18).
 *
 * Transport is chosen from the environment:
 *  - `EMAIL_SERVER` set  → real SMTP transport (nodemailer). Accepts a
 *    connection URL, e.g. `smtp://user:pass@smtp.gmail.com:587`
 *    (Gmail: use an App Password, host smtp.gmail.com, port 587).
 *  - otherwise           → console transport (development / preview).
 *
 * `EMAIL_FROM` is the envelope sender ("Name <address>" is allowed).
 */
import "server-only";
import type Nodemailer from "nodemailer";

export interface EmailMessage {
  to: string;
  subject: string;
  text: string;
  html?: string;
  /** Where replies from the recipient should go (e.g. the owner's inbox). */
  replyTo?: string;
}

type Transporter = ReturnType<typeof Nodemailer.createTransport>;

let transporterPromise: Promise<Transporter> | null = null;

async function getTransporter(): Promise<Transporter> {
  if (!transporterPromise) {
    transporterPromise = import("nodemailer").then((m) =>
      m.default.createTransport(process.env.EMAIL_SERVER as string),
    );
  }
  return transporterPromise;
}

export function isEmailConfigured(): boolean {
  return Boolean(process.env.EMAIL_SERVER);
}

export async function sendEmail(message: EmailMessage): Promise<void> {
  const from = process.env.EMAIL_FROM ?? "no-reply@localhost";

  if (!isEmailConfigured()) {
    console.info("[email:console]", { from, ...message });
    return;
  }

  const transporter = await getTransporter();
  await transporter.sendMail({
    from,
    to: message.to,
    subject: message.subject,
    text: message.text,
    html: message.html,
    replyTo: message.replyTo,
  });
}

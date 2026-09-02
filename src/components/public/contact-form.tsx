"use client";

import * as React from "react";
import { Loader2, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { contactSchema } from "@/lib/validation/contact";
import { trackEvent } from "@/lib/analytics/client";
import type { Dictionary } from "@/i18n/dictionaries/fr";

type FieldErrors = Partial<Record<string, string>>;

export function ContactForm({ t }: { t: Dictionary["contact"] }) {
  const [status, setStatus] = React.useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [errors, setErrors] = React.useState<FieldErrors>({});
  const [formError, setFormError] = React.useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    setFormError(null);

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      company: String(fd.get("company") ?? ""),
      subject: String(fd.get("subject") ?? ""),
      message: String(fd.get("message") ?? ""),
      website: String(fd.get("website") ?? ""), // honeypot
    };

    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      const fe: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        fe[String(issue.path[0])] = issue.message;
      }
      setErrors(fe);
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        setFormError(body?.error?.message ?? t.error);
        setStatus("error");
        return;
      }
      trackEvent({ eventType: "CONTACT_SUBMIT", path: "/contact" });
      setStatus("sent");
      form.reset();
    } catch {
      setFormError(t.error);
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="border-border bg-card flex flex-col items-center gap-3 rounded-xl border p-10 text-center">
        <CheckCircle2 className="text-accent size-8" />
        <p className="font-medium">{t.sent}</p>
        <p className="text-muted-foreground text-sm">{t.sentHint}</p>
        <Button variant="outline" size="sm" onClick={() => setStatus("idle")}>
          {t.sendAnother}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t.name} name="name" error={errors.name} required />
        <Field
          label={t.email}
          name="email"
          type="email"
          error={errors.email}
          required
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t.company} name="company" error={errors.company} />
        <Field label={t.subject} name="subject" error={errors.subject} />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="message" className="text-sm font-medium">
          {t.message} <span className="text-destructive">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          className="border-input bg-background focus-visible:ring-ring w-full rounded-md border px-3 py-2 text-sm outline-none focus-visible:ring-2"
        />
        {errors.message && (
          <p className="text-destructive text-xs">{errors.message}</p>
        )}
      </div>

      {formError && <p className="text-destructive text-sm">{formError}</p>}

      <Button type="submit" disabled={status === "sending"}>
        {status === "sending" && <Loader2 className="animate-spin" />}
        {status === "sending" ? t.sending : t.send}
      </Button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  error,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  error?: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="text-sm font-medium">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="border-input bg-background focus-visible:ring-ring w-full rounded-md border px-3 py-2 text-sm outline-none focus-visible:ring-2"
      />
      {error && <p className="text-destructive text-xs">{error}</p>}
    </div>
  );
}

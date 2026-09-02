"use client";

import * as React from "react";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Reply, Check } from "lucide-react";

import { cn } from "@/lib/utils";
import type { ActionResult } from "@/lib/admin/action";
import { replyToMessage } from "./actions";

const dtFmt = new Intl.DateTimeFormat("fr-FR", {
  dateStyle: "medium",
  timeStyle: "short",
});

export function ReplyForm({
  id,
  to,
  name,
  subject,
  repliedAt,
}: {
  id: string;
  to: string;
  name: string;
  subject: string;
  repliedAt?: string | null;
}) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [state, formAction, pending] = useActionState<ActionResult | null, FormData>(
    replyToMessage,
    null,
  );

  React.useEffect(() => {
    if (!state) return;
    if (state.ok) {
      toast.success(state.message ?? "Réponse envoyée.");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOpen(false);
      router.refresh();
    } else if (!state.fieldErrors) {
      toast.error(state.message);
    }
  }, [state, router]);

  const fieldErrors =
    state && !state.ok && state.fieldErrors ? state.fieldErrors : {};

  const replySubject = /^re:/i.test(subject) ? subject : `RE: ${subject}`;
  const greeting = `Bonjour ${name},\n\n\n\n—\n`;

  return (
    <div className="border-border/60 mt-4 border-t pt-3">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs transition-colors",
            open
              ? "border-accent/50 text-accent"
              : "border-border hover:bg-muted",
          )}
        >
          <Reply className="size-3.5" />
          {repliedAt ? "Répondre à nouveau" : "Répondre"}
        </button>
        {repliedAt && (
          <span className="text-muted-foreground inline-flex items-center gap-1 text-xs">
            <Check className="size-3.5 text-emerald-500" />
            Répondu le {dtFmt.format(new Date(repliedAt))}
          </span>
        )}
      </div>

      {open && (
        <form action={formAction} className="mt-3 space-y-2">
          <input type="hidden" name="id" value={id} />
          <p className="text-muted-foreground font-mono text-xs">
            À&nbsp;: <span className="text-foreground">{to}</span>
          </p>
          <div>
            <input
              name="subject"
              defaultValue={replySubject}
              placeholder="Objet"
              className="border-border bg-background focus:border-accent w-full rounded-md border px-3 py-2 text-sm outline-none"
            />
            {fieldErrors.subject && (
              <p className="text-destructive mt-1 text-xs">
                {fieldErrors.subject[0]}
              </p>
            )}
          </div>
          <div>
            <textarea
              name="body"
              rows={7}
              defaultValue={greeting}
              placeholder="Votre réponse…"
              className="border-border bg-background focus:border-accent w-full resize-y rounded-md border px-3 py-2 text-sm outline-none"
            />
            {fieldErrors.body && (
              <p className="text-destructive mt-1 text-xs">
                {fieldErrors.body[0]}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="submit"
              disabled={pending}
              className="bg-accent text-accent-foreground inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium disabled:opacity-50"
            >
              {pending && <Loader2 className="size-4 animate-spin" />}
              Envoyer
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="border-border hover:bg-muted rounded-md border px-3 py-1.5 text-sm"
            >
              Annuler
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

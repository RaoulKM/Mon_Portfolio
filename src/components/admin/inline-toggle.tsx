"use client";

import * as React from "react";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import type { ActionResult } from "@/lib/admin/action";

type ServerAction = (
  prev: ActionResult | null,
  formData: FormData,
) => Promise<ActionResult>;

/** A pill toggle bound to a server action `{ id, field, value }`. */
export function InlineToggle({
  action,
  id,
  field,
  value,
  onLabel = "Oui",
  offLabel = "Non",
}: {
  action: ServerAction;
  id: string;
  field: string;
  value: boolean;
  onLabel?: string;
  offLabel?: string;
}) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState<ActionResult | null, FormData>(
    action,
    null,
  );

  React.useEffect(() => {
    if (!state) return;
    if (state.ok) router.refresh();
    else toast.error(state.message);
  }, [state, router]);

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="field" value={field} />
      <input type="hidden" name="value" value={(!value).toString()} />
      <button
        type="submit"
        disabled={pending}
        className={cn(
          "rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors disabled:opacity-50",
          value
            ? "bg-accent/15 text-accent"
            : "bg-muted text-muted-foreground hover:bg-muted/80",
        )}
      >
        {value ? onLabel : offLabel}
      </button>
    </form>
  );
}

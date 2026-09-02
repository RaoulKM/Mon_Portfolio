"use client";

import * as React from "react";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { MessageStatus } from "@prisma/client";

import { cn } from "@/lib/utils";
import type { ActionResult } from "@/lib/admin/action";
import { setMessageStatus } from "./actions";

const NEXT: { label: string; status: MessageStatus }[] = [
  { label: "Lu", status: "READ" },
  { label: "Non lu", status: "UNREAD" },
  { label: "Archiver", status: "ARCHIVED" },
  { label: "Spam", status: "SPAM" },
];

export function MessageStatusButtons({
  id,
  current,
}: {
  id: string;
  current: MessageStatus;
}) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState<ActionResult | null, FormData>(
    setMessageStatus,
    null,
  );

  React.useEffect(() => {
    if (!state) return;
    if (state.ok) router.refresh();
    else toast.error(state.message);
  }, [state, router]);

  return (
    <form action={formAction} className="flex flex-wrap gap-1">
      <input type="hidden" name="id" value={id} />
      {NEXT.filter((n) => n.status !== current).map((n) => (
        <button
          key={n.status}
          type="submit"
          name="status"
          value={n.status}
          disabled={pending}
          className={cn(
            "border-border hover:bg-muted rounded-md border px-2 py-1 text-xs disabled:opacity-50",
          )}
        >
          {n.label}
        </button>
      ))}
    </form>
  );
}

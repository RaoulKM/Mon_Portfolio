"use client";

import * as React from "react";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Trash2, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { ActionResult } from "@/lib/admin/action";

type ServerAction = (
  prev: ActionResult | null,
  formData: FormData,
) => Promise<ActionResult>;

export function DeleteButton({
  action,
  id,
  label,
  compact = true,
}: {
  action: ServerAction;
  id: string;
  label: string;
  compact?: boolean;
}) {
  const router = useRouter();
  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const [state, formAction, pending] = useActionState<ActionResult | null, FormData>(
    action,
    null,
  );

  React.useEffect(() => {
    if (!state) return;
    if (state.ok) {
      toast.success(state.message ?? "Supprimé.");
      dialogRef.current?.close();
      router.refresh();
    } else {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        size={compact ? "sm" : "default"}
        onClick={() => dialogRef.current?.showModal()}
        aria-label={`Supprimer ${label}`}
      >
        <Trash2 className="text-destructive size-4" />
        {!compact && "Supprimer"}
      </Button>

      <dialog
        ref={dialogRef}
        className="bg-card text-card-foreground border-border m-auto max-w-sm rounded-xl border p-6 shadow-xl backdrop:bg-black/50"
      >
        <h2 className="font-semibold">Confirmer la suppression</h2>
        <p className="text-muted-foreground mt-2 text-sm">
          Supprimer «&nbsp;{label}&nbsp;» ? Cette action est irréversible.
        </p>
        <form action={formAction} className="mt-5 flex justify-end gap-3">
          <input type="hidden" name="id" value={id} />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => dialogRef.current?.close()}
          >
            Annuler
          </Button>
          <Button type="submit" variant="destructive" size="sm" disabled={pending}>
            {pending && <Loader2 className="animate-spin" />}
            Supprimer
          </Button>
        </form>
      </dialog>
    </>
  );
}

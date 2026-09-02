"use client";

import * as React from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { ActionResult } from "@/lib/admin/action";

type FieldErrors = Record<string, string[]>;
type ServerAction = (
  prev: ActionResult | null,
  formData: FormData,
) => Promise<ActionResult>;

export function SubmitButton({ children = "Enregistrer" }: { children?: React.ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending && <Loader2 className="animate-spin" />}
      {children}
    </Button>
  );
}

export function AdminForm({
  action,
  redirectTo,
  successMessage = "Enregistré.",
  submitLabel,
  children,
}: {
  action: ServerAction;
  redirectTo?: string;
  successMessage?: string;
  submitLabel?: string;
  children: (errors: FieldErrors) => React.ReactNode;
}) {
  const router = useRouter();
  const [state, formAction] = useActionState<ActionResult | null, FormData>(
    action,
    null,
  );

  React.useEffect(() => {
    if (!state) return;
    if (state.ok) {
      toast.success(state.message ?? successMessage);
      if (redirectTo) router.push(redirectTo);
      else router.refresh();
    } else if (!state.fieldErrors) {
      toast.error(state.message);
    }
  }, [state, redirectTo, router, successMessage]);

  const fieldErrors: FieldErrors =
    state && !state.ok && state.fieldErrors ? state.fieldErrors : {};

  return (
    <form action={formAction} className="space-y-6">
      {children(fieldErrors)}
      {state && !state.ok && (
        <p className="text-destructive text-sm">{state.message}</p>
      )}
      <div className="flex gap-3">
        <SubmitButton>{submitLabel}</SubmitButton>
      </div>
    </form>
  );
}

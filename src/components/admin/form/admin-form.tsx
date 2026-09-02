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
export type FormValues = Record<string, string | string[]>;
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

function readValues(form: HTMLFormElement): FormValues {
  const out: FormValues = {};
  const fd = new FormData(form);
  for (const key of new Set(fd.keys())) {
    const all = fd.getAll(key).filter((v): v is string => typeof v === "string");
    out[key] = all.length > 1 ? all : (all[0] ?? "");
  }
  return out;
}

export function AdminForm({
  action,
  redirectTo,
  successMessage = "Enregistré.",
  submitLabel,
  children,
  preview,
}: {
  action: ServerAction;
  redirectTo?: string;
  successMessage?: string;
  submitLabel?: string;
  children: (errors: FieldErrors) => React.ReactNode;
  /** Right-hand live preview; receives the current form values. */
  preview?: (values: FormValues) => React.ReactNode;
}) {
  const router = useRouter();
  const formRef = React.useRef<HTMLFormElement>(null);
  const [state, formAction] = useActionState<ActionResult | null, FormData>(
    action,
    null,
  );
  const [values, setValues] = React.useState<FormValues>({});

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

  // Live-preview sync: native `input` events for typing, plus a light poll
  // to catch programmatic fields (icon picker, colour, image upload).
  React.useEffect(() => {
    if (!preview) return;
    const form = formRef.current;
    if (!form) return;

    let last = "";
    const sync = () => {
      const next = readValues(form);
      const sig = JSON.stringify(next);
      if (sig !== last) {
        last = sig;
        setValues(next);
      }
    };
    sync();
    form.addEventListener("input", sync);
    const id = window.setInterval(sync, 300);
    return () => {
      form.removeEventListener("input", sync);
      window.clearInterval(id);
    };
  }, [preview]);

  const fieldErrors: FieldErrors =
    state && !state.ok && state.fieldErrors ? state.fieldErrors : {};

  const formEl = (
    <form ref={formRef} action={formAction} className="space-y-6">
      {children(fieldErrors)}
      {state && !state.ok && (
        <p className="text-destructive text-sm">{state.message}</p>
      )}
      <div className="flex gap-3">
        <SubmitButton>{submitLabel}</SubmitButton>
      </div>
    </form>
  );

  if (!preview) return formEl;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
      {formEl}
      <aside className="lg:order-last">
        <div className="lg:sticky lg:top-24">
          <p className="mono-eyebrow mb-3">{"// aperçu en direct"}</p>
          {preview(values)}
        </div>
      </aside>
    </div>
  );
}

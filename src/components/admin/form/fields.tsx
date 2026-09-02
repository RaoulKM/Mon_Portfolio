"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const inputCls =
  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60";

function FieldWrapper({
  label,
  name,
  required,
  hint,
  error,
  children,
}: {
  label: string;
  name: string;
  required?: boolean;
  hint?: string;
  error?: string[];
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="text-sm font-medium">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      {children}
      {hint && !error?.length && (
        <p className="text-muted-foreground text-xs">{hint}</p>
      )}
      {error?.map((e, i) => (
        <p key={i} className="text-destructive text-xs">
          {e}
        </p>
      ))}
    </div>
  );
}

type BaseProps = {
  label: string;
  name: string;
  required?: boolean;
  hint?: string;
  error?: string[];
  defaultValue?: string | number | null;
};

export function TextField({
  label,
  name,
  required,
  hint,
  error,
  defaultValue,
  type = "text",
  ...rest
}: BaseProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "defaultValue" | "name">) {
  return (
    <FieldWrapper label={label} name={name} required={required} hint={hint} error={error}>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue ?? undefined}
        className={inputCls}
        {...rest}
      />
    </FieldWrapper>
  );
}

export function TextareaField({
  label,
  name,
  required,
  hint,
  error,
  defaultValue,
  rows = 5,
}: BaseProps & { rows?: number }) {
  return (
    <FieldWrapper label={label} name={name} required={required} hint={hint} error={error}>
      <textarea
        id={name}
        name={name}
        rows={rows}
        required={required}
        defaultValue={defaultValue ?? undefined}
        className={cn(inputCls, "resize-y")}
      />
    </FieldWrapper>
  );
}

export function SelectField({
  label,
  name,
  required,
  hint,
  error,
  defaultValue,
  options,
}: BaseProps & { options: { value: string; label: string }[] }) {
  return (
    <FieldWrapper label={label} name={name} required={required} hint={hint} error={error}>
      <select
        id={name}
        name={name}
        defaultValue={defaultValue ?? options[0]?.value}
        className={inputCls}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </FieldWrapper>
  );
}

export function SwitchField({
  label,
  name,
  hint,
  defaultChecked,
}: {
  label: string;
  name: string;
  hint?: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex items-start gap-3 py-1">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="border-input mt-0.5 size-4 rounded"
      />
      <span>
        <span className="text-sm font-medium">{label}</span>
        {hint && <span className="text-muted-foreground block text-xs">{hint}</span>}
      </span>
    </label>
  );
}

/** Multi-select rendered as a checkbox grid (technologies, etc.). */
export function CheckboxGroupField({
  label,
  name,
  hint,
  options,
  defaultValue = [],
}: {
  label: string;
  name: string;
  hint?: string;
  options: { value: string; label: string }[];
  defaultValue?: string[];
}) {
  return (
    <FieldWrapper label={label} name={name} hint={hint}>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {options.map((o) => (
          <label key={o.value} className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name={name}
              value={o.value}
              defaultChecked={defaultValue.includes(o.value)}
              className="border-input size-4 rounded"
            />
            {o.label}
          </label>
        ))}
      </div>
    </FieldWrapper>
  );
}

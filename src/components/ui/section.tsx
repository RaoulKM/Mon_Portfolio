import * as React from "react";
import { cn } from "@/lib/utils";

export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-4", className)} {...props} />
  );
}

export function Section({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section className={cn("py-16 sm:py-24", className)} {...props} />
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow && (
        <p className="text-accent text-sm font-semibold tracking-widest uppercase">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="text-muted-foreground mt-4 text-lg">{description}</p>
      )}
    </div>
  );
}

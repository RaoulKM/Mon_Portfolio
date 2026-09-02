import { Construction } from "lucide-react";

/** Temporary section shell — real content arrives in Phase 2 (spec §58). */
export function PagePlaceholder({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
      {description && (
        <p className="text-muted-foreground mt-3 max-w-2xl">{description}</p>
      )}
      <div className="border-border text-muted-foreground mt-10 flex items-center gap-3 rounded-lg border border-dashed p-6 text-sm">
        <Construction className="size-5 shrink-0" />
        Section en cours de construction — contenu administrable disponible en Phase 2.
      </div>
    </section>
  );
}

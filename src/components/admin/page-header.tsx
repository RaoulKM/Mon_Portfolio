export function AdminPageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="mono-eyebrow">
          <span className="text-terminal-dim">~/admin</span> / {title.toLowerCase()}
        </p>
        <h1 className="mt-1.5 text-2xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="text-muted-foreground mt-1 text-sm">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}

export function AdminPlaceholder({ note }: { note?: string }) {
  return (
    <div className="terminal-frame text-muted-foreground p-10 text-center font-mono text-sm">
      <span className="text-terminal-dim">$</span>{" "}
      {note ?? "Interface CRUD à implémenter en Phase 3."}
    </div>
  );
}

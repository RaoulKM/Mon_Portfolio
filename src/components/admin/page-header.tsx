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
    <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
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
    <div className="border-border text-muted-foreground rounded-lg border border-dashed p-10 text-center text-sm">
      {note ?? "Interface CRUD à implémenter en Phase 3."}
    </div>
  );
}

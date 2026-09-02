import { Inbox } from "lucide-react";

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="border-border text-muted-foreground flex flex-col items-center gap-3 rounded-lg border border-dashed p-12 text-center text-sm">
      <Inbox className="size-6" />
      {message}
    </div>
  );
}

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="terminal-frame text-muted-foreground flex flex-col items-center gap-3 p-12 text-center font-mono text-sm">
      <span className="text-terminal-dim">
        {"$ query --status"} <span className="animate-blink">_</span>
      </span>
      {message}
    </div>
  );
}

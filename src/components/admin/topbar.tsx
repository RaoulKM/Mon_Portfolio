import Link from "next/link";
import { LogOut, ExternalLink, Mail } from "lucide-react";

import { signOut } from "@/lib/auth";
import { ThemeToggle } from "@/components/theme-toggle";

export function AdminTopbar({
  email,
  unreadMessages = 0,
}: {
  email?: string | null;
  unreadMessages?: number;
}) {
  return (
    <header className="border-border bg-background/70 sticky top-0 z-30 flex h-16 items-center justify-between border-b px-4 backdrop-blur-xl md:px-6">
      <div className="text-muted-foreground font-mono text-xs">
        <span className="text-terminal-dim">{email ?? "admin"}</span>
        <span className="text-terminal-dim">:~$</span>{" "}
        <span className="animate-blink">_</span>
      </div>
      <div className="flex items-center gap-2">
        <Link
          href="/admin/messages?status=UNREAD"
          aria-label={`Messages non lus : ${unreadMessages}`}
          className="border-border hover:border-accent/50 hover:text-accent relative inline-flex size-9 items-center justify-center rounded-md border transition-colors"
        >
          <Mail className="size-4" />
          {unreadMessages > 0 && (
            <span className="bg-accent text-accent-foreground absolute -right-1.5 -top-1.5 inline-flex min-w-4 items-center justify-center rounded-full px-1 text-[9px] font-bold tabular-nums shadow-[0_0_12px_-2px_var(--glow-color)]">
              {unreadMessages > 99 ? "99+" : unreadMessages}
            </span>
          )}
        </Link>
        <Link
          href="/"
          target="_blank"
          className="border-border hover:border-accent/50 hover:text-accent inline-flex items-center gap-2 rounded-md border px-3 py-1.5 font-mono text-xs transition-colors"
        >
          <ExternalLink className="size-4" /> site
        </Link>
        <ThemeToggle />
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/admin/login" });
          }}
        >
          <button
            type="submit"
            className="border-border hover:border-destructive/50 hover:text-destructive inline-flex items-center gap-2 rounded-md border px-3 py-1.5 font-mono text-xs transition-colors"
          >
            <LogOut className="size-4" /> logout
          </button>
        </form>
      </div>
    </header>
  );
}

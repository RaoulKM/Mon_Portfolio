import Link from "next/link";
import { LogOut, ExternalLink, Mail } from "lucide-react";

import { signOut } from "@/lib/auth";
import { ThemeToggle } from "@/components/theme-toggle";
import { AdminMobileNav } from "@/components/admin/mobile-nav";

export function AdminTopbar({
  email,
  unreadMessages = 0,
}: {
  email?: string | null;
  unreadMessages?: number;
}) {
  return (
    <header className="border-border bg-background/70 sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b px-4 backdrop-blur-xl md:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <AdminMobileNav unreadMessages={unreadMessages} />
        <div className="text-muted-foreground hidden truncate font-mono text-xs sm:block">
          <span className="text-terminal-dim">{email ?? "admin"}</span>
          <span className="text-terminal-dim">:~$</span>{" "}
          <span className="animate-blink">_</span>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <Link
          href="/admin/messages?status=UNREAD"
          aria-label={`Messages non lus : ${unreadMessages}`}
          className="border-border hover:border-accent/50 hover:text-accent relative inline-flex size-9 items-center justify-center rounded-md border transition-colors"
        >
          <Mail className="size-4" />
          {unreadMessages > 0 && (
            <span className="bg-accent text-accent-foreground absolute -top-1.5 -right-1.5 inline-flex min-w-4 items-center justify-center rounded-full px-1 text-[9px] font-bold tabular-nums shadow-[0_0_12px_-2px_var(--glow-color)]">
              {unreadMessages > 99 ? "99+" : unreadMessages}
            </span>
          )}
        </Link>
        <Link
          href="/"
          target="_blank"
          className="border-border hover:border-accent/50 hover:text-accent inline-flex items-center gap-2 rounded-md border px-2.5 py-1.5 font-mono text-xs transition-colors sm:px-3"
        >
          <ExternalLink className="size-4" />
          <span className="hidden sm:inline">site</span>
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
            className="border-border hover:border-destructive/50 hover:text-destructive inline-flex items-center gap-2 rounded-md border px-2.5 py-1.5 font-mono text-xs transition-colors sm:px-3"
          >
            <LogOut className="size-4" />
            <span className="hidden sm:inline">logout</span>
          </button>
        </form>
      </div>
    </header>
  );
}

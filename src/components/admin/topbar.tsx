import Link from "next/link";
import { LogOut, ExternalLink } from "lucide-react";

import { signOut } from "@/lib/auth";
import { ThemeToggle } from "@/components/theme-toggle";

export function AdminTopbar({ email }: { email?: string | null }) {
  return (
    <header className="border-border bg-background/80 sticky top-0 z-30 flex h-16 items-center justify-between border-b px-4 backdrop-blur md:px-6">
      <div className="text-muted-foreground text-sm">{email}</div>
      <div className="flex items-center gap-2">
        <Link
          href="/"
          target="_blank"
          className="border-border hover:bg-muted inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm"
        >
          <ExternalLink className="size-4" /> Voir le site
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
            className="border-border hover:bg-muted inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm"
          >
            <LogOut className="size-4" /> Déconnexion
          </button>
        </form>
      </div>
    </header>
  );
}

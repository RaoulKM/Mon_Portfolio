import { Terminal } from "lucide-react";

import { AdminNavList } from "@/components/admin/nav-list";

export function AdminSidebar({
  unreadMessages = 0,
}: {
  unreadMessages?: number;
}) {
  return (
    <aside className="border-border bg-card/60 sticky top-0 hidden h-screen w-64 shrink-0 flex-col overflow-y-auto border-r backdrop-blur md:flex">
      <div className="border-border bg-card/60 sticky top-0 z-10 flex h-16 items-center gap-2 border-b px-6 backdrop-blur">
        <span className="border-accent/40 bg-accent/10 text-accent flex size-8 items-center justify-center rounded-md border">
          <Terminal className="size-4" />
        </span>
        <span className="font-mono font-bold tracking-tight">admin</span>
      </div>

      <AdminNavList unreadMessages={unreadMessages} />
    </aside>
  );
}

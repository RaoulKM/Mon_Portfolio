import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth/guard";
import { AdminSidebar } from "@/components/admin/sidebar";
import { AdminTopbar } from "@/components/admin/topbar";
import { Toaster } from "@/components/ui/toaster";

export default async function DashboardLayout({
  children,
}: LayoutProps<"/admin">) {
  const user = await requireUser();

  const unreadMessages = await prisma.contactMessage
    .count({ where: { status: "UNREAD" } })
    .catch(() => 0);

  return (
    <div className="relative flex min-h-screen">
      {/* subtle backdrop */}
      <div
        aria-hidden
        className="dot-bg pointer-events-none fixed inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
      />

      <AdminSidebar unreadMessages={unreadMessages} />
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminTopbar email={user.email} unreadMessages={unreadMessages} />
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
      <Toaster />
    </div>
  );
}

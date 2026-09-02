import type { Metadata } from "next";
import Link from "next/link";
import type { MessageStatus } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/auth/guard";
import { cn } from "@/lib/utils";
import { AdminPageHeader, AdminPlaceholder } from "@/components/admin/page-header";
import { DeleteButton } from "@/components/admin/delete-button";
import { MessageStatusButtons } from "./message-actions";
import { ReplyForm } from "./reply-form";
import { deleteMessage } from "./actions";

export const metadata: Metadata = { title: "Messages" };

const TABS: { key: MessageStatus; label: string }[] = [
  { key: "UNREAD", label: "Non lus" },
  { key: "READ", label: "Lus" },
  { key: "ARCHIVED", label: "Archivés" },
  { key: "SPAM", label: "Spam" },
];

const dtFmt = new Intl.DateTimeFormat("fr-FR", { dateStyle: "medium", timeStyle: "short" });

export default async function MessagesAdminPage({
  searchParams,
}: PageProps<"/admin/messages">) {
  await requirePermission("MANAGE_MESSAGES");
  const sp = await searchParams;
  const status = (TABS.find((t) => t.key === sp.status)?.key ?? "UNREAD") as MessageStatus;

  const [messages, counts] = await Promise.all([
    prisma.contactMessage
      .findMany({ where: { status }, orderBy: { createdAt: "desc" } })
      .catch(() => null),
    prisma.contactMessage
      .groupBy({ by: ["status"], _count: true })
      .catch(() => [] as { status: MessageStatus; _count: number }[]),
  ]);

  const countFor = (s: MessageStatus) =>
    counts.find((c) => c.status === s)?._count ?? 0;

  return (
    <>
      <AdminPageHeader
        title="Messages"
        description="Messages de contact reçus."
      />

      <div className="border-border mb-6 flex flex-wrap gap-1 border-b">
        {TABS.map((t) => (
          <Link
            key={t.key}
            href={`/admin/messages?status=${t.key}`}
            className={cn(
              "border-b-2 px-3 py-2 text-sm",
              status === t.key
                ? "border-primary text-primary font-medium"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            {t.label}
            <span className="text-muted-foreground ml-1.5 text-xs">
              {countFor(t.key)}
            </span>
          </Link>
        ))}
      </div>

      {messages === null ? (
        <AdminPlaceholder note="Base de données indisponible." />
      ) : messages.length === 0 ? (
        <AdminPlaceholder note="Aucun message dans cette catégorie." />
      ) : (
        <div className="space-y-4">
          {messages.map((m) => (
            <div key={m.id} className="bg-card border-border rounded-xl border p-5">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-medium">
                    {m.name}{" "}
                    <a
                      href={`mailto:${m.email}`}
                      className="text-muted-foreground text-sm font-normal hover:underline"
                    >
                      &lt;{m.email}&gt;
                    </a>
                  </p>
                  {(m.company || m.subject) && (
                    <p className="text-muted-foreground text-xs">
                      {[m.company, m.subject].filter(Boolean).join(" · ")}
                    </p>
                  )}
                </div>
                <span className="text-muted-foreground text-xs">
                  {dtFmt.format(m.createdAt)}
                </span>
              </div>

              <p className="mt-3 text-sm whitespace-pre-wrap">{m.message}</p>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                <MessageStatusButtons id={m.id} current={m.status} />
                <DeleteButton
                  action={deleteMessage}
                  id={m.id}
                  label={`message de ${m.name}`}
                />
              </div>

              <ReplyForm
                id={m.id}
                to={m.email}
                name={m.name}
                subject={m.subject || "votre message"}
                repliedAt={m.repliedAt?.toISOString() ?? null}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}

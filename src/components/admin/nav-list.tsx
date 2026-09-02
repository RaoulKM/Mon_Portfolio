"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  User,
  FolderGit2,
  Sparkles,
  Briefcase,
  GraduationCap,
  BadgeCheck,
  Handshake,
  Newspaper,
  Quote,
  Mail,
  Image as ImageIcon,
  BarChart3,
  Settings,
  Users,
  ScrollText,
  KeyRound,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { adminNav } from "@/config/site";

const ICONS: Record<string, LucideIcon> = {
  LayoutDashboard,
  User,
  FolderGit2,
  Sparkles,
  Briefcase,
  GraduationCap,
  BadgeCheck,
  Handshake,
  Newspaper,
  Quote,
  Mail,
  Image: ImageIcon,
  BarChart3,
  Settings,
  Users,
  ScrollText,
  KeyRound,
};

/**
 * Shared navigation list for the admin area — rendered both in the desktop
 * sidebar and the mobile drawer.
 */
export function AdminNavList({
  unreadMessages = 0,
  onNavigate,
  layoutId = "admin-nav-active",
}: {
  unreadMessages?: number;
  /** Called when a link is activated (used to close the mobile drawer). */
  onNavigate?: () => void;
  /** Distinct id per instance so desktop + drawer don't fight over the pill. */
  layoutId?: string;
}) {
  const pathname = usePathname();

  return (
    <nav className="flex-1 space-y-6 p-4">
      {adminNav.map((section, i) => (
        <div key={i} className="space-y-1">
          {section.group && (
            <p className="text-terminal-dim px-2 font-mono text-[10px] tracking-[0.2em] uppercase">
              {section.group}
            </p>
          )}
          {section.items.map((item) => {
            const Icon = ICONS[item.icon] ?? LayoutDashboard;
            const active =
              pathname === item.href || pathname.startsWith(item.href + "/");
            const badge =
              item.href === "/admin/messages" && unreadMessages > 0
                ? unreadMessages
                : null;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                className={cn(
                  "relative flex items-center gap-3 rounded-md px-2.5 py-2 font-mono text-[13px] transition-colors",
                  active
                    ? "text-accent"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {active && (
                  <motion.span
                    layoutId={layoutId}
                    className="bg-accent/10 border-accent/30 absolute inset-0 rounded-md border shadow-[0_0_18px_-6px_var(--glow-color)]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <Icon className="relative size-4 shrink-0" />
                <span className="relative">{item.label}</span>
                {badge != null && (
                  <span className="bg-accent text-accent-foreground relative ml-auto inline-flex min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold tabular-nums shadow-[0_0_14px_-2px_var(--glow-color)]">
                    {badge > 99 ? "99+" : badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );
}

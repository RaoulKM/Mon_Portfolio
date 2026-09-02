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
  Terminal,
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

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="border-border bg-card/60 sticky top-0 hidden h-screen w-64 shrink-0 flex-col overflow-y-auto border-r backdrop-blur md:flex">
      <div className="border-border bg-card/60 sticky top-0 z-10 flex h-16 items-center gap-2 border-b px-6 backdrop-blur">
        <span className="border-accent/40 bg-accent/10 text-accent flex size-8 items-center justify-center rounded-md border">
          <Terminal className="size-4" />
        </span>
        <span className="font-mono font-bold tracking-tight">admin</span>
      </div>

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
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative flex items-center gap-3 rounded-md px-2.5 py-2 font-mono text-[13px] transition-colors",
                    active
                      ? "text-accent"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="admin-nav-active"
                      className="bg-accent/10 border-accent/30 absolute inset-0 rounded-md border shadow-[0_0_18px_-6px_var(--glow-color)]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <Icon className="relative size-4 shrink-0" />
                  <span className="relative">{item.label}</span>
                </Link>
              );
            })}
          </div>
        ))}
      </nav>
    </aside>
  );
}

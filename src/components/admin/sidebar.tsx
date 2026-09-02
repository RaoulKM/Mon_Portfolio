"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
};

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="border-border bg-card hidden w-64 shrink-0 border-r md:block">
      <div className="border-border flex h-16 items-center border-b px-6 font-bold tracking-tight">
        Admin
      </div>
      <nav className="space-y-6 p-4">
        {adminNav.map((section, i) => (
          <div key={i} className="space-y-1">
            {section.group && (
              <p className="text-muted-foreground px-2 text-xs font-semibold tracking-wider uppercase">
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
                    "flex items-center gap-3 rounded-md px-2 py-2 text-sm transition-colors",
                    active
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted",
                  )}
                >
                  <Icon className="size-4 shrink-0" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>
    </aside>
  );
}

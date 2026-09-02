"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, FileDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { publicNav, siteConfig } from "@/config/site";
import { ThemeToggle } from "@/components/theme-toggle";

export function Navbar({ cvUrl = "/resume" }: { cvUrl?: string }) {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="border-border bg-background/80 sticky top-0 z-40 border-b backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="font-bold tracking-tight">
          {siteConfig.shortName}
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {publicNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "hover:bg-muted rounded-md px-3 py-2 text-sm transition-colors",
                isActive(item.href) && "text-primary font-medium",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={cvUrl}
            className="bg-primary text-primary-foreground hidden items-center gap-2 rounded-md px-3 py-2 text-sm font-medium sm:inline-flex"
          >
            <FileDown className="size-4" /> CV
          </Link>
          <ThemeToggle />
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            className="border-border inline-flex size-9 items-center justify-center rounded-md border md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-border border-t px-4 py-2 md:hidden">
          {publicNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "hover:bg-muted block rounded-md px-3 py-2 text-sm",
                isActive(item.href) && "text-primary font-medium",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

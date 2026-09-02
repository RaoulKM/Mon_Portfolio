"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, FileDown, Terminal } from "lucide-react";

import { cn } from "@/lib/utils";
import { publicNav, siteConfig } from "@/config/site";
import { ThemeToggle } from "@/components/theme-toggle";

export function Navbar({ cvUrl = "/resume" }: { cvUrl?: string }) {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-colors duration-300",
        scrolled
          ? "border-border bg-background/70 border-b backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="group flex items-center gap-2 font-bold tracking-tight">
          <span className="border-accent/40 bg-accent/10 text-accent flex size-8 items-center justify-center rounded-md border transition-transform group-hover:rotate-6">
            <Terminal className="size-4" />
          </span>
          <span className="font-mono">{siteConfig.shortName}</span>
        </Link>

        <nav className="hidden items-center gap-0.5 md:flex">
          {publicNav.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-md px-3 py-2 font-mono text-[13px] transition-colors",
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="bg-accent/10 border-accent/30 absolute inset-0 rounded-md border"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={cvUrl}
            className="border-accent/40 bg-accent/10 text-accent hover:bg-accent/20 hidden items-center gap-2 rounded-md border px-3 py-2 font-mono text-xs tracking-wide uppercase transition-colors sm:inline-flex"
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

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="border-border bg-background/90 overflow-hidden border-t backdrop-blur-xl md:hidden"
          >
            <div className="px-4 py-2">
              {publicNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "hover:bg-muted block rounded-md px-3 py-2 font-mono text-sm",
                    isActive(item.href) && "text-accent",
                  )}
                >
                  <span className="text-terminal-dim mr-2">$</span>
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

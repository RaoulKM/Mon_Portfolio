"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, FileDown, Terminal, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { publicNav, siteConfig, type NavNode } from "@/config/site";
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

  const groupActive = (node: NavNode) =>
    node.children
      ? node.children.some((c) => isActive(c.href))
      : isActive(node.href);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-colors duration-300",
        scrolled
          ? "border-border bg-background/70 border-b backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-2 font-bold tracking-tight">
          <span className="border-accent/40 bg-accent/10 text-accent flex size-8 items-center justify-center rounded-md border transition-transform group-hover:rotate-6">
            <Terminal className="size-4" />
          </span>
          <span className="font-mono">{siteConfig.shortName}</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {publicNav.map((node) =>
            node.children ? (
              <div key={node.href} className="group/dd relative">
                <Link
                  href={node.href}
                  className={cn(
                    "flex items-center gap-1 rounded-md px-3 py-2 font-mono text-[13px] transition-colors",
                    groupActive(node)
                      ? "text-accent"
                      : "text-muted-foreground group-hover/dd:text-foreground",
                  )}
                >
                  {node.label}
                  <ChevronDown className="size-3.5 transition-transform group-hover/dd:rotate-180" />
                </Link>

                <div className="invisible absolute left-1/2 top-full w-64 -translate-x-1/2 pt-2 opacity-0 transition-[opacity,transform] duration-200 group-hover/dd:visible group-hover/dd:opacity-100 group-focus-within/dd:visible group-focus-within/dd:opacity-100">
                  <div className="border-border bg-popover/95 rounded-lg border p-1.5 shadow-xl backdrop-blur-xl">
                    {node.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        className={cn(
                          "block rounded-md px-3 py-2 transition-colors",
                          isActive(c.href)
                            ? "bg-accent/10 text-accent"
                            : "hover:bg-muted",
                        )}
                      >
                        <span className="font-mono text-[13px]">{c.label}</span>
                        {c.desc && (
                          <span className="text-muted-foreground block text-xs">
                            {c.desc}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={node.href}
                href={node.href}
                className={cn(
                  "relative rounded-md px-3 py-2 font-mono text-[13px] transition-colors",
                  isActive(node.href)
                    ? "text-accent"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {isActive(node.href) && (
                  <motion.span
                    layoutId="nav-active"
                    className="bg-accent/10 border-accent/30 absolute inset-0 rounded-md border"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative">{node.label}</span>
              </Link>
            ),
          )}
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
            className="border-border bg-background/95 overflow-hidden border-t backdrop-blur-xl md:hidden"
          >
            <div className="px-4 py-2">
              {publicNav.map((node) => (
                <div key={node.href}>
                  <Link
                    href={node.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block rounded-md px-3 py-2 font-mono text-sm",
                      groupActive(node) ? "text-accent" : "hover:bg-muted",
                    )}
                  >
                    <span className="text-terminal-dim mr-2">$</span>
                    {node.label}
                  </Link>
                  {node.children && (
                    <div className="border-border/60 ml-5 border-l pl-3">
                      {node.children.map((c) => (
                        <Link
                          key={c.href}
                          href={c.href}
                          onClick={() => setOpen(false)}
                          className={cn(
                            "block rounded-md px-3 py-1.5 font-mono text-[13px]",
                            isActive(c.href)
                              ? "text-accent"
                              : "text-muted-foreground hover:bg-muted",
                          )}
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

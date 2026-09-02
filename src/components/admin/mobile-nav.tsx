"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Terminal } from "lucide-react";

import { AdminNavList } from "@/components/admin/nav-list";
import { EASE_OUT } from "@/lib/motion";

/**
 * Mobile navigation: a hamburger button (shown below `md`) that opens a
 * left slide-over drawer with the full admin nav.
 */
export function AdminMobileNav({
  unreadMessages = 0,
}: {
  unreadMessages?: number;
}) {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  // Safety net: close if the route changes while the drawer is open
  // (e.g. browser back/forward). Link clicks already close it via onNavigate.
  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
  }, [pathname]);

  // Lock body scroll + close on Escape while open.
  React.useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Ouvrir le menu"
        aria-expanded={open}
        className="border-border hover:border-accent/50 hover:text-accent inline-flex size-9 items-center justify-center rounded-md border transition-colors md:hidden"
      >
        <Menu className="size-4" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <button
              type="button"
              aria-label="Fermer le menu"
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />
            <motion.aside
              className="border-border bg-card absolute inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col overflow-y-auto border-r shadow-2xl"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.25, ease: EASE_OUT }}
            >
              <div className="border-border flex h-16 items-center gap-2 border-b px-6">
                <span className="border-accent/40 bg-accent/10 text-accent flex size-8 items-center justify-center rounded-md border">
                  <Terminal className="size-4" />
                </span>
                <span className="font-mono font-bold tracking-tight">admin</span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Fermer le menu"
                  className="border-border hover:border-accent/50 hover:text-accent ml-auto inline-flex size-8 items-center justify-center rounded-md border transition-colors"
                >
                  <X className="size-4" />
                </button>
              </div>

              <AdminNavList
                unreadMessages={unreadMessages}
                onNavigate={() => setOpen(false)}
                layoutId="admin-nav-active-mobile"
              />
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

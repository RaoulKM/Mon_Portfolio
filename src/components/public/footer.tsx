import Link from "next/link";
import { siteConfig, publicNav } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-border mt-24 border-t">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} {siteConfig.name}. Tous droits réservés.
        </p>
        <nav className="flex flex-wrap gap-x-4 gap-y-1">
          {publicNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}

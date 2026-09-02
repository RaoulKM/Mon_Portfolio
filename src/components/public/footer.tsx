import Link from "next/link";

import { siteConfig, publicNav } from "@/config/site";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { BrandGlyph, WhatsappIcon } from "@/components/icons/brand";

// Flat list of every page for the footer (top-level + grouped children).
const footerLinks = Array.from(
  new Map(
    publicNav.flatMap((n) => [
      [n.href, n.label] as const,
      ...(n.children?.map((c) => [c.href, c.label] as const) ?? []),
    ]),
  ),
).map(([href, label]) => ({ href, label }));

type SocialLink = { id: string; platform: string; url: string; icon: string | null };

export function Footer({
  name = siteConfig.name,
  socialLinks = [],
  whatsappUrl = null,
}: {
  name?: string;
  socialLinks?: SocialLink[];
  whatsappUrl?: string | null;
}) {
  return (
    <footer className="border-border relative mt-28 border-t">
      <div className="grid-bg absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="relative mx-auto max-w-6xl px-4 py-12">
        <p className="text-terminal font-mono text-sm">
          <span className="text-terminal-dim">visitor@portfolio</span>:~$ echo
          &quot;merci de votre visite&quot;
        </p>

        <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-muted-foreground font-mono text-xs">
            © {new Date().getFullYear()} {name} — built with Next.js
          </p>

          <nav className="flex flex-wrap gap-x-4 gap-y-1">
            {footerLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-muted-foreground hover:text-accent font-mono text-xs transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {(socialLinks.length > 0 || whatsappUrl) && (
            <div className="flex gap-2">
              {socialLinks.map((s) => (
                <TrackedLink
                  key={s.id}
                  href={s.url}
                  event="SOCIAL_CLICK"
                  entityId={s.platform}
                  aria-label={s.platform}
                  className="border-border hover:border-accent/50 hover:text-accent inline-flex size-9 items-center justify-center rounded-md border transition-colors"
                >
                  <BrandGlyph slug={s.icon ?? s.platform} className="size-4" />
                </TrackedLink>
              ))}
              {whatsappUrl && (
                <TrackedLink
                  href={whatsappUrl}
                  event="SOCIAL_CLICK"
                  entityId="whatsapp"
                  aria-label="WhatsApp"
                  className="border-border inline-flex size-9 items-center justify-center rounded-md border transition-colors hover:border-[#25D366]/60 hover:text-[#25D366]"
                >
                  <WhatsappIcon className="size-4" />
                </TrackedLink>
              )}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}

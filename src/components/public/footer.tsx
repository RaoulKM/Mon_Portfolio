import Link from "next/link";
import { ArrowUp, Mail, FileDown, MessageSquare } from "lucide-react";

import { siteConfig, publicNav } from "@/config/site";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { LocaleSwitcher } from "@/components/public/locale-switcher";
import { BrandGlyph, WhatsappIcon } from "@/components/icons/brand";
import type { Locale } from "@/i18n/routing";
import type { Dictionary } from "@/i18n/dictionaries/fr";

type SocialLink = { id: string; platform: string; url: string; icon: string | null };

const profilGroup = publicNav.find((n) => n.href === "/about");
const exploreKeys = ["/projects", "/services", "/blog"];

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="text-muted-foreground hover:text-accent block py-1 font-mono text-[13px] transition-colors"
    >
      <span className="text-terminal-dim mr-1.5">›</span>
      {label}
    </Link>
  );
}

export function Footer({
  name = siteConfig.name,
  headline,
  availability,
  email,
  socialLinks = [],
  whatsappUrl = null,
  cvUrl,
  locale,
  t,
}: {
  name?: string;
  headline?: string | null;
  availability?: string | null;
  email?: string | null;
  socialLinks?: SocialLink[];
  whatsappUrl?: string | null;
  cvUrl?: string | null;
  locale: Locale;
  t: Dictionary;
}) {
  const year = new Date().getFullYear();
  const nav = t.nav;
  const f = t.footer;
  const exploreLinks = publicNav
    .filter((n) => exploreKeys.includes(n.href))
    .map((n) => ({ href: n.href, label: nav[n.key] }));

  return (
    <footer className="border-border relative mt-28 border-t">
      <div className="grid-bg pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />
      <div className="relative mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 font-bold tracking-tight">
              <span className="border-accent/40 bg-accent/10 text-accent flex size-8 items-center justify-center rounded-md border font-mono">
                {">_"}
              </span>
              <span className="font-mono">{siteConfig.shortName}</span>
            </Link>
            <p className="text-muted-foreground mt-4 max-w-xs text-sm text-pretty">
              {headline
                ? `${name} — ${headline}.`
                : t.common.tagline}
            </p>

            {availability && (
              <p className="text-muted-foreground mt-4 flex items-center gap-2 font-mono text-xs">
                <span className="relative flex size-2">
                  <span className="bg-chart-4 absolute inline-flex size-full animate-ping rounded-full opacity-75" />
                  <span className="bg-chart-4 relative inline-flex size-2 rounded-full" />
                </span>
                {availability}
              </p>
            )}

            {(socialLinks.length > 0 || whatsappUrl) && (
              <div className="mt-5 flex flex-wrap gap-2">
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

          {/* Profil */}
          <div>
            <p className="mono-eyebrow mb-2">{f.profile}</p>
            {profilGroup?.children?.map((c) => (
              <FooterLink key={c.href} href={c.href} label={nav[c.key]} />
            ))}
          </div>

          {/* Explorer */}
          <div>
            <p className="mono-eyebrow mb-2">{f.explore}</p>
            {exploreLinks.map((l) => (
              <FooterLink key={l.href} href={l.href} label={l.label} />
            ))}
          </div>

          {/* Contact + language */}
          <div>
            <p className="mono-eyebrow mb-2">{f.contact}</p>
            <Link
              href="/contact"
              className="text-muted-foreground hover:text-accent flex items-center gap-2 py-1 font-mono text-[13px] transition-colors"
            >
              <MessageSquare className="size-3.5" /> {nav.contact}
            </Link>
            {email && (
              <a
                href={`mailto:${email}`}
                className="text-muted-foreground hover:text-accent flex items-center gap-2 py-1 font-mono text-[13px] transition-colors"
              >
                <Mail className="size-3.5" /> {email}
              </a>
            )}
            {whatsappUrl && (
              <TrackedLink
                href={whatsappUrl}
                event="SOCIAL_CLICK"
                entityId="whatsapp"
                className="py-1 font-mono text-[13px] text-[#25D366]/90 transition-colors hover:text-[#25D366] flex items-center gap-2"
              >
                <WhatsappIcon className="size-3.5" /> WhatsApp
              </TrackedLink>
            )}
            <a
              href={cvUrl || "/resume"}
              className="text-muted-foreground hover:text-accent flex items-center gap-2 py-1 font-mono text-[13px] transition-colors"
            >
              <FileDown className="size-3.5" /> {f.downloadCv}
            </a>

            <p className="mono-eyebrow mt-6 mb-2">{t.common.language}</p>
            <LocaleSwitcher
              current={locale}
              label={t.common.language}
              variant="full"
            />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-border mt-12 flex flex-col gap-4 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-terminal font-mono text-xs">
            <span className="text-terminal-dim">visitor@portfolio</span>:~$ echo
            &quot;{f.thanks}&quot;
            <span className="animate-blink"> _</span>
          </p>
          <div className="text-muted-foreground flex items-center gap-4 font-mono text-xs">
            <span>
              © {year} {name}
            </span>
            <span className="text-terminal-dim">·</span>
            <span>Next.js · Prisma · Tailwind</span>
            <a
              href="#top"
              aria-label="Top"
              className="border-border hover:border-accent/50 hover:text-accent inline-flex size-7 items-center justify-center rounded-md border transition-colors"
            >
              <ArrowUp className="size-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

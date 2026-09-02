import Link from "next/link";
import { Globe } from "lucide-react";
import type { ComponentType, SVGProps } from "react";

import { siteConfig, publicNav } from "@/config/site";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { GithubIcon, LinkedinIcon, XIcon } from "@/components/icons/brand";

type IconComp = ComponentType<SVGProps<SVGSVGElement>>;

const SOCIAL_ICONS: Record<string, IconComp> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  twitter: XIcon,
  x: XIcon,
  globe: Globe,
  website: Globe,
};

type SocialLink = { id: string; platform: string; url: string; icon: string | null };

export function Footer({
  name = siteConfig.name,
  socialLinks = [],
}: {
  name?: string;
  socialLinks?: SocialLink[];
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
            {publicNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-muted-foreground hover:text-accent font-mono text-xs transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {socialLinks.length > 0 && (
            <div className="flex gap-2">
              {socialLinks.map((s) => {
                const Icon =
                  SOCIAL_ICONS[(s.icon ?? s.platform).toLowerCase()] ?? Globe;
                return (
                  <TrackedLink
                    key={s.id}
                    href={s.url}
                    event="SOCIAL_CLICK"
                    entityId={s.platform}
                    aria-label={s.platform}
                    className="border-border hover:border-accent/50 hover:text-accent inline-flex size-9 items-center justify-center rounded-md border transition-colors"
                  >
                    <Icon className="size-4" />
                  </TrackedLink>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}

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
    <footer className="border-border mt-24 border-t">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} {name}. Tous droits réservés.
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
                  className="border-border hover:bg-muted inline-flex size-9 items-center justify-center rounded-md border transition-colors"
                >
                  <Icon className="size-4" />
                </TrackedLink>
              );
            })}
          </div>
        )}
      </div>
    </footer>
  );
}

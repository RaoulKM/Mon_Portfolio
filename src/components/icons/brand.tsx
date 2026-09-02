import * as React from "react";
import { Globe, Rss, Mail, Link as LinkIcon } from "lucide-react";

// lucide-react 1.x dropped brand marks, so platform icons are inlined here
// as single-path SVGs (24×24, currentColor).
type IconProps = React.SVGProps<SVGSVGElement>;
export type BrandIcon = React.ComponentType<IconProps>;

const base = {
  width: 16,
  height: 16,
  viewBox: "0 0 24 24",
  fill: "currentColor",
  "aria-hidden": true,
} as const;

const make = (d: string): BrandIcon =>
  function Brand(props: IconProps) {
    return (
      <svg {...base} {...props}>
        <path d={d} />
      </svg>
    );
  };

export const GithubIcon = make(
  "M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.79 2.73 1.27 3.4.97.1-.76.4-1.27.74-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.5 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.28 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z",
);
export const LinkedinIcon = make(
  "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.8 0 0 .78 0 1.75v20.5C0 23.2.8 24 1.77 24h20.45c.98 0 1.78-.8 1.78-1.75V1.75C24 .78 23.2 0 22.22 0Z",
);
export const XIcon = make(
  "M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.46l8.6-9.83L0 1.15h7.6l5.24 6.93 6.06-6.93Zm-1.29 19.5h2.04L6.48 3.24H4.3l13.31 17.41Z",
);
export const InstagramIcon = make(
  "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.31-1.46.72-2.13 1.38A5.9 5.9 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.79.72 1.46 1.38 2.13.67.66 1.34 1.07 2.13 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.9 5.9 0 0 0 2.13-1.38 5.9 5.9 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.9 5.9 0 0 0-1.38-2.13A5.9 5.9 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0Zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88Z",
);
export const YoutubeIcon = make(
  "M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z",
);
export const FacebookIcon = make(
  "M24 12a12 12 0 1 0-13.9 11.9v-8.4H7v-3.5h3.1V9.4c0-3 1.8-4.7 4.6-4.7 1.3 0 2.7.24 2.7.24v3h-1.5c-1.5 0-2 .93-2 1.9v2.3h3.4l-.5 3.5h-2.9v8.4A12 12 0 0 0 24 12Z",
);
export const GitlabIcon = make(
  "M23.6 9.6 22 4.6a.86.86 0 0 0-1.64-.05L18.13 11H5.87L3.63 4.55A.86.86 0 0 0 2 4.6L.4 9.6a1.72 1.72 0 0 0 .62 1.92L12 20l10.98-8.48a1.72 1.72 0 0 0 .62-1.92Z",
);
export const DiscordIcon = make(
  "M20.3 4.5A19.8 19.8 0 0 0 15.4 3l-.24.5a15 15 0 0 1 4.3 2.2 20 20 0 0 0-16.9 0 15 15 0 0 1 4.3-2.2L6.6 3a19.7 19.7 0 0 0-4.9 1.5C.4 8.3-.3 12 0 15.7a20 20 0 0 0 6 3l.5-.7a14 14 0 0 1-2.3-1.1l.6-.4a14 14 0 0 0 12.4 0l.6.4a14 14 0 0 1-2.3 1.1l.5.7a20 20 0 0 0 6-3c.4-4.3-.6-8-2.7-11.2ZM8 13.3c-1.1 0-2-1-2-2.3s.9-2.3 2-2.3 2 1 2 2.3-.9 2.3-2 2.3Zm8 0c-1.1 0-2-1-2-2.3s.9-2.3 2-2.3 2 1 2 2.3-.9 2.3-2 2.3Z",
);
export const TelegramIcon = make(
  "M23.9 3.5 20.3 20.2c-.27 1.2-.98 1.5-2 .93l-5.5-4-2.65 2.55c-.3.3-.54.54-1.1.54l.4-5.56L19.4 6.6c.44-.4-.1-.6-.68-.22L6.2 13.5l-5.44-1.7c-1.18-.37-1.2-1.18.25-1.75L22.38 1.3c.98-.36 1.84.22 1.52 2.2Z",
);
export const TwitchIcon = make(
  "M2.15 0 .5 4.2v16.1h5.55V24h3.1l3.1-3.7h4.65L23.5 14V0H2.15Zm19.3 13-3.7 3.7h-5.55l-3.1 3.1v-3.1H4.6V1.85h16.85V13ZM17.75 5.55h-1.85v5.55h1.85V5.55Zm-4.95 0h-1.85v5.55h1.85V5.55Z",
);
export const MediumIcon = make(
  "M13.54 12a6.77 6.77 0 1 1-13.54 0 6.77 6.77 0 0 1 13.54 0Zm7.42 0c0 3.54-1.51 6.42-3.38 6.42s-3.39-2.88-3.39-6.42 1.52-6.42 3.39-6.42S20.96 8.46 20.96 12ZM24 12c0 3.17-.53 5.75-1.19 5.75s-1.19-2.58-1.19-5.75.53-5.75 1.19-5.75S24 8.83 24 12Z",
);
export const DribbbleIcon = make(
  "M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24Zm7.9 5.54a10.15 10.15 0 0 1 2.3 6.35c-.34-.07-3.7-.75-7.1-.32-.07-.17-.14-.35-.22-.53-.2-.48-.43-.97-.66-1.44 3.76-1.53 5.47-3.74 5.68-4.06ZM12 1.83c2.55 0 4.88.96 6.65 2.53-.18.25-1.72 2.32-5.35 3.68-1.67-3.07-3.52-5.59-3.8-5.97A10.15 10.15 0 0 1 12 1.83Zm-4.5.68c.27.36 2.08 2.9 3.77 5.9-4.75 1.27-8.95 1.24-9.4 1.24A10.19 10.19 0 0 1 7.5 2.51ZM1.85 12.01v-.31c.44.01 5.37.07 10.44-1.45.3.57.57 1.15.82 1.73l-.4.12c-5.24 1.7-8.03 6.32-8.26 6.7A10.15 10.15 0 0 1 1.85 12Zm10.15 10.17c-2.3 0-4.42-.78-6.11-2.08.18-.37 2.2-4.26 7.93-6.26l.06-.02c1.43 3.71 2.01 6.82 2.16 7.72a10.1 10.1 0 0 1-4 .64Zm5.79-1.62c-.1-.63-.64-3.6-1.97-7.26 3.21-.51 6.02.33 6.37.45a10.16 10.16 0 0 1-4.4 6.81Z",
);
export const CodepenIcon = make(
  "M24 8.18a.66.66 0 0 0-.29-.55L12.37.11a.66.66 0 0 0-.74 0L.29 7.63a.66.66 0 0 0-.29.55v7.64a.66.66 0 0 0 .29.55l11.34 7.52a.66.66 0 0 0 .74 0l11.34-7.52a.66.66 0 0 0 .29-.55V8.18ZM12 1.45l9.34 6.2-4.17 2.79L12 6.96 6.83 10.44 2.66 7.65 12 1.45ZM1.32 8.87l3.02 2.02-3.02 2.02V8.87Zm10.68 13.68-9.34-6.2 4.17-2.79L12 17.04l5.17-3.48 4.17 2.79-9.34 6.2ZM12 15.44 8.16 12 12 8.56 15.84 12 12 15.44Zm10.68-2.53-3.02-2.02 3.02-2.02v4.04Z",
);
export const StackOverflowIcon = make(
  "M17.36 20.2v-5.63h1.87V22H3v-7.43h1.87v5.63h12.5ZM6.77 14.15l.4-1.84 9.16 1.94-.4 1.83-9.16-1.93Zm1.2-4.4.8-1.7 8.5 3.96-.8 1.7-8.5-3.96Zm2.35-4.16 1.28-1.36 7.2 6-1.28 1.36-7.2-6ZM15.32 0l-1.5 1.1 5.6 7.53 1.5-1.1L15.32 0ZM6.6 18.35v-1.87h9.34v1.87H6.6Z",
);
export const WhatsappIcon = make(
  "M17.5 14.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35ZM12 2a10 10 0 0 0-8.6 15.03L2 22l5.09-1.33A10 10 0 1 0 12 2Zm0 18.3a8.3 8.3 0 0 1-4.23-1.16l-.3-.18-3.02.79.8-2.94-.2-.31A8.3 8.3 0 1 1 12 20.3Z",
);
export const TiktokIcon = make(
  "M16.44 0c.35 2.02 1.48 3.72 3.2 4.62A6.6 6.6 0 0 0 22.6 5.7v4.03a10.8 10.8 0 0 1-5.8-1.9v8.3a7 7 0 1 1-7-7c.35 0 .7.03 1.03.08v4.15a3 3 0 1 0 2.1 2.87V0h3.5Z",
);

const website = Globe as unknown as BrandIcon;
const rss = Rss as unknown as BrandIcon;
const email = Mail as unknown as BrandIcon;
const link = LinkIcon as unknown as BrandIcon;

/** slug → icon. Slugs match what's stored on `SocialLink.icon`. */
export const BRAND_ICONS: Record<string, BrandIcon> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  x: XIcon,
  twitter: XIcon,
  instagram: InstagramIcon,
  youtube: YoutubeIcon,
  facebook: FacebookIcon,
  gitlab: GitlabIcon,
  discord: DiscordIcon,
  telegram: TelegramIcon,
  twitch: TwitchIcon,
  medium: MediumIcon,
  dribbble: DribbbleIcon,
  codepen: CodepenIcon,
  stackoverflow: StackOverflowIcon,
  whatsapp: WhatsappIcon,
  tiktok: TiktokIcon,
  website,
  blog: rss,
  rss,
  email,
  link,
};

export const BRAND_OPTIONS: { slug: string; label: string }[] = [
  { slug: "github", label: "GitHub" },
  { slug: "linkedin", label: "LinkedIn" },
  { slug: "x", label: "X / Twitter" },
  { slug: "instagram", label: "Instagram" },
  { slug: "youtube", label: "YouTube" },
  { slug: "facebook", label: "Facebook" },
  { slug: "gitlab", label: "GitLab" },
  { slug: "discord", label: "Discord" },
  { slug: "telegram", label: "Telegram" },
  { slug: "twitch", label: "Twitch" },
  { slug: "medium", label: "Medium" },
  { slug: "dribbble", label: "Dribbble" },
  { slug: "codepen", label: "CodePen" },
  { slug: "stackoverflow", label: "Stack Overflow" },
  { slug: "whatsapp", label: "WhatsApp" },
  { slug: "tiktok", label: "TikTok" },
  { slug: "website", label: "Site web" },
  { slug: "blog", label: "Blog / RSS" },
  { slug: "email", label: "Email" },
  { slug: "link", label: "Autre lien" },
];

export function resolveBrandIcon(key?: string | null): BrandIcon {
  return (key && BRAND_ICONS[key.toLowerCase()]) || (Globe as unknown as BrandIcon);
}

/** Render a platform icon by slug without materialising a component in render. */
export function BrandGlyph({
  slug,
  ...props
}: IconProps & { slug?: string | null }) {
  return React.createElement(resolveBrandIcon(slug), props);
}

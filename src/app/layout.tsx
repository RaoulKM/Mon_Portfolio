import type { Metadata, Viewport } from "next";
import { Montserrat, JetBrains_Mono } from "next/font/google";

import { siteConfig } from "@/config/site";
import { ThemeProvider } from "@/components/theme-provider";
import { getSiteSettings } from "@/lib/queries";
import { getLocale } from "@/i18n";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const { general, seo, social } = await getSiteSettings();

  const name = general.siteName || siteConfig.name;
  const title = seo.defaultTitle || siteConfig.title;
  const description =
    seo.defaultDescription || general.siteDescription || siteConfig.description;
  const sameAs = Object.values(social).filter(Boolean);

  return {
    metadataBase: new URL(siteConfig.url),
    title: { default: title, template: `%s — ${siteConfig.shortName}` },
    description,
    applicationName: name,
    authors: [{ name }],
    creator: name,
    keywords: seo.keywords?.length ? seo.keywords : undefined,
    manifest: "/manifest.webmanifest",
    alternates: { canonical: "/" },
    formatDetection: { telephone: false },
    openGraph: {
      type: "website",
      locale: "fr_FR",
      url: siteConfig.url,
      siteName: name,
      title,
      description,
      images: [{ url: seo.ogImage || "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [seo.ogImage || "/opengraph-image"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
    other: sameAs.length ? { "profile:sameAs": sameAs.join(",") } : undefined,
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f8fc" },
    { media: "(prefers-color-scheme: dark)", color: "#05070d" },
  ],
  colorScheme: "dark light",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${montserrat.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body className="bg-background text-foreground min-h-full font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

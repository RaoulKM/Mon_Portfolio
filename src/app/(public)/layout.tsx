import { Navbar } from "@/components/public/navbar";
import { Footer } from "@/components/public/footer";
import { PageViewTracker } from "@/components/analytics/page-view-tracker";
import { RetroBackdrop } from "@/components/retro/backdrop";
import { CursorGlow } from "@/components/retro/cursor-glow";
import { buildWhatsappUrl } from "@/lib/whatsapp";
import { getProfile } from "@/lib/queries";
import { getI18n } from "@/i18n";

export default async function PublicLayout({ children }: LayoutProps<"/">) {
  const [profile, { locale, t }] = await Promise.all([getProfile(), getI18n()]);
  const cvUrl = profile?.cvUrlFr ?? profile?.cvUrlEn ?? "/resume";

  return (
    <div id="top" className="scanlines relative flex min-h-full flex-col">
      <a
        href="#content"
        className="bg-accent text-accent-foreground focus:ring-ring sr-only rounded-md px-4 py-2 font-mono text-sm focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:ring-2"
      >
        {t.common.skipToContent}
      </a>

      <RetroBackdrop />
      <CursorGlow />
      <PageViewTracker />

      <Navbar cvUrl={cvUrl} locale={locale} t={t} />
      <main id="content" className="relative flex-1">
        {children}
      </main>
      <Footer
        name={profile?.fullName}
        headline={profile?.headline}
        availability={profile?.availability}
        email={profile?.email}
        cvUrl={cvUrl}
        socialLinks={profile?.socialLinks ?? []}
        whatsappUrl={buildWhatsappUrl(
          profile?.whatsappNumber,
          profile?.whatsappMessage,
        )}
        t={t}
      />
    </div>
  );
}

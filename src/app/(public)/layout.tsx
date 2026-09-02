import { Navbar } from "@/components/public/navbar";
import { Footer } from "@/components/public/footer";
import { PageViewTracker } from "@/components/analytics/page-view-tracker";
import { RetroBackdrop } from "@/components/retro/backdrop";
import { CursorGlow } from "@/components/retro/cursor-glow";
import { buildWhatsappUrl } from "@/lib/whatsapp";
import { getProfile } from "@/lib/queries";

// ISR: public pages are CMS-driven — rebuild in the background at most hourly
// so admin edits (Phase 3) surface without a full redeploy. `next dev` is fresh.
export const revalidate = 3600;

export default async function PublicLayout({ children }: LayoutProps<"/">) {
  const profile = await getProfile();

  return (
    <div className="scanlines relative flex min-h-full flex-col">
      <a
        href="#content"
        className="bg-accent text-accent-foreground focus:ring-ring sr-only rounded-md px-4 py-2 font-mono text-sm focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:ring-2"
      >
        Aller au contenu
      </a>

      <RetroBackdrop />
      <CursorGlow />
      <PageViewTracker />

      <Navbar cvUrl={profile?.cvUrlFr ?? profile?.cvUrlEn ?? "/resume"} />
      <main id="content" className="relative flex-1">
        {children}
      </main>
      <Footer
        name={profile?.fullName}
        socialLinks={profile?.socialLinks ?? []}
        whatsappUrl={buildWhatsappUrl(
          profile?.whatsappNumber,
          profile?.whatsappMessage,
        )}
      />
    </div>
  );
}

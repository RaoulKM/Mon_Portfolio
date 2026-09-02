import { Navbar } from "@/components/public/navbar";
import { Footer } from "@/components/public/footer";
import { PageViewTracker } from "@/components/analytics/page-view-tracker";
import { RetroBackdrop } from "@/components/retro/backdrop";
import { CursorGlow } from "@/components/retro/cursor-glow";
import { getProfile } from "@/lib/queries";

// ISR: public pages are CMS-driven — rebuild in the background at most hourly
// so admin edits (Phase 3) surface without a full redeploy. `next dev` is fresh.
export const revalidate = 3600;

export default async function PublicLayout({ children }: LayoutProps<"/">) {
  const profile = await getProfile();

  return (
    <div className="scanlines relative flex min-h-full flex-col">
      <RetroBackdrop />
      <CursorGlow />
      <PageViewTracker />

      <Navbar cvUrl={profile?.cvUrlFr ?? profile?.cvUrlEn ?? "/resume"} />
      <main className="relative flex-1">{children}</main>
      <Footer name={profile?.fullName} socialLinks={profile?.socialLinks ?? []} />
    </div>
  );
}

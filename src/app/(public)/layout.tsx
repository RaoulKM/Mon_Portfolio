import { Navbar } from "@/components/public/navbar";
import { Footer } from "@/components/public/footer";
import { PageViewTracker } from "@/components/analytics/page-view-tracker";
import { getProfile } from "@/lib/queries";

// ISR: public pages are CMS-driven — rebuild in the background at most hourly
// so admin edits (Phase 3) surface without a full redeploy. Tuned further in
// Phase 5 (§29). `next dev` always renders fresh.
export const revalidate = 3600;

export default async function PublicLayout({ children }: LayoutProps<"/">) {
  const profile = await getProfile();

  return (
    <div className="flex min-h-full flex-col">
      <PageViewTracker />
      <Navbar cvUrl={profile?.cvUrlFr ?? profile?.cvUrlEn ?? "/resume"} />
      <main className="flex-1">{children}</main>
      <Footer
        name={profile?.fullName}
        socialLinks={profile?.socialLinks ?? []}
      />
    </div>
  );
}

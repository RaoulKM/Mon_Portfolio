import type { Metadata } from "next";

import { pageMetadata } from "@/lib/seo/metadata";
import { Mail, MapPin } from "lucide-react";

import { BrandGlyph, WhatsappIcon } from "@/components/icons/brand";
import { Button } from "@/components/ui/button";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { ContactForm } from "@/components/public/contact-form";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { BreadcrumbJsonLd } from "@/lib/seo/jsonld";
import { buildWhatsappUrl } from "@/lib/whatsapp";
import { getProfile } from "@/lib/queries";
import { getI18n } from "@/i18n";


export const metadata: Metadata = pageMetadata({
  path: "/contact",
  title: "Contact",
  description:
    "Prise de contact pour un projet, une mission ou une collaboration.",
});

export default async function ContactPage() {
  const [profile, { t }] = await Promise.all([getProfile(), getI18n()]);
  const whatsappUrl = buildWhatsappUrl(
    profile?.whatsappNumber,
    profile?.whatsappMessage,
  );

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: t.nav.home, url: "/" },
          { name: t.nav.contact, url: "/contact" },
        ]}
      />
      <Section>
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <SectionHeading
              eyebrow={t.nav.contact.toLowerCase()}
              title={t.contact.title}
              description={t.contact.description}
            />
            <ul className="mt-8 space-y-3 text-sm">
              {profile?.email && (
                <li className="flex items-center gap-3">
                  <Mail className="text-muted-foreground size-4" />
                  <a href={`mailto:${profile.email}`} className="hover:underline">
                    {profile.email}
                  </a>
                </li>
              )}
              {profile?.location && (
                <li className="flex items-center gap-3">
                  <MapPin className="text-muted-foreground size-4" />
                  {profile.location}
                </li>
              )}
              {profile?.socialLinks?.map((s) => {
                return (
                  <li key={s.id} className="flex items-center gap-3">
                    <BrandGlyph
                      slug={s.icon ?? s.platform}
                      className="text-muted-foreground size-4"
                    />
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {s.platform}
                    </a>
                  </li>
                );
              })}
            </ul>

            {whatsappUrl && (
              <div className="mt-8">
                <Button asChild variant="whatsapp" size="lg">
                  <TrackedLink
                    href={whatsappUrl}
                    event="SOCIAL_CLICK"
                    entityId="whatsapp"
                  >
                    <WhatsappIcon className="size-5" /> {t.contact.whatsappButton}
                  </TrackedLink>
                </Button>
                <p className="text-muted-foreground mt-2 font-mono text-xs">
                  {t.contact.whatsappHint}
                </p>
              </div>
            )}
          </div>

          <div className="bg-card border-border rounded-xl border p-6 sm:p-8">
            <ContactForm t={t.contact} />
          </div>
        </Container>
      </Section>
    </>
  );
}

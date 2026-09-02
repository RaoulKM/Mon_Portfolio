import type { Metadata } from "next";
import { Mail, MapPin, Globe } from "lucide-react";

import { GithubIcon, LinkedinIcon } from "@/components/icons/brand";

import { Container, Section, SectionHeading } from "@/components/ui/section";
import { ContactForm } from "@/components/public/contact-form";
import { BreadcrumbJsonLd } from "@/lib/seo/jsonld";
import { getProfile } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Prise de contact pour un projet, une mission ou une collaboration.",
};

export default async function ContactPage() {
  const profile = await getProfile();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "/" },
          { name: "Contact", url: "/contact" },
        ]}
      />
      <Section>
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <SectionHeading
              eyebrow="Contact"
              title="Discutons de votre projet"
              description="Une idée, une mission, une question — écrivez-moi."
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
                const p = s.platform.toLowerCase();
                const Icon =
                  p === "linkedin"
                    ? LinkedinIcon
                    : p === "github"
                      ? GithubIcon
                      : Globe;
                return (
                  <li key={s.id} className="flex items-center gap-3">
                    <Icon className="text-muted-foreground size-4" />
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
          </div>

          <div className="bg-card border-border rounded-xl border p-6 sm:p-8">
            <ContactForm />
          </div>
        </Container>
      </Section>
    </>
  );
}

import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/public/page-placeholder";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <PagePlaceholder
      title="Contact"
      description="Prise de contact pour un projet, une mission ou une collaboration."
    />
  );
}

import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/public/page-placeholder";

export const metadata: Metadata = { title: "Services" };

export default function ServicesPage() {
  return (
    <PagePlaceholder
      title="Services"
      description="Prestations : développement web, API, SaaS, UI/UX, intégration IA, DevOps."
    />
  );
}

import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/public/page-placeholder";

export const metadata: Metadata = { title: "Certifications" };

export default function CertificationsPage() {
  return (
    <PagePlaceholder
      title="Certifications"
      description="Certifications et accréditations vérifiables."
    />
  );
}

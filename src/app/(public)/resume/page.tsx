import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/public/page-placeholder";

export const metadata: Metadata = { title: "CV" };

export default function ResumePage() {
  return (
    <PagePlaceholder
      title="CV"
      description="Télécharger le CV (FR / EN)."
    />
  );
}

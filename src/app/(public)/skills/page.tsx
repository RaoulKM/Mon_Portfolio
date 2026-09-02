import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/public/page-placeholder";

export const metadata: Metadata = { title: "Compétences" };

export default function SkillsPage() {
  return (
    <PagePlaceholder
      title="Compétences"
      description="Compétences techniques par catégorie : frontend, backend, base de données, DevOps, IA."
    />
  );
}

import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/public/page-placeholder";

export const metadata: Metadata = { title: "Projets" };

export default function ProjectsPage() {
  return (
    <PagePlaceholder
      title="Projets"
      description="Sélection de réalisations : SaaS, applications web et expérimentations."
    />
  );
}

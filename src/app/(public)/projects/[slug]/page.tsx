import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/public/page-placeholder";

export const metadata: Metadata = { title: "Détail du projet" };

export default async function ProjectDetailPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  return (
    <PagePlaceholder
      title={`Projet : ${slug}`}
      description="Problème, solution, architecture, technologies, défis et résultats."
    />
  );
}

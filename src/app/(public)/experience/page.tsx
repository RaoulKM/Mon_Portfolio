import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/public/page-placeholder";

export const metadata: Metadata = { title: "Expérience" };

export default function ExperiencePage() {
  return (
    <PagePlaceholder
      title="Expérience"
      description="Parcours professionnel présenté en timeline."
    />
  );
}

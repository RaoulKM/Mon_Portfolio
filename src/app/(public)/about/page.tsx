import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/public/page-placeholder";

export const metadata: Metadata = { title: "À propos" };

export default function AboutPage() {
  return (
    <PagePlaceholder
      title="À propos"
      description="Présentation, parcours, philosophie et objectifs."
    />
  );
}

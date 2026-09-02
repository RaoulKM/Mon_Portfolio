import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/public/page-placeholder";

export const metadata: Metadata = { title: "Formation" };

export default function EducationPage() {
  return (
    <PagePlaceholder
      title="Formation"
      description="Diplômes et formations complémentaires."
    />
  );
}

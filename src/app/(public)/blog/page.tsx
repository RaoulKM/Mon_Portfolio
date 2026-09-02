import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/public/page-placeholder";

export const metadata: Metadata = { title: "Blog" };

export default function BlogPage() {
  return (
    <PagePlaceholder
      title="Blog"
      description="Articles techniques sur Next.js, Laravel, l'architecture logicielle et l'IA."
    />
  );
}

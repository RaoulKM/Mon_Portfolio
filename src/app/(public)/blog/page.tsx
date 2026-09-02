import type { Metadata } from "next";

import { pageMetadata } from "@/lib/seo/metadata";
import { PagePlaceholder } from "@/components/public/page-placeholder";


export const metadata: Metadata = pageMetadata({
  path: "/blog",
  title: "Blog",
  description:
    "Articles techniques sur Next.js, Laravel, l'architecture logicielle et l'IA.",
});

export default function BlogPage() {
  return (
    <PagePlaceholder
      title="Blog"
      description="Articles techniques sur Next.js, Laravel, l'architecture logicielle et l'IA."
    />
  );
}

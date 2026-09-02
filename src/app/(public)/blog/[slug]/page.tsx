import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/public/page-placeholder";

export const metadata: Metadata = { title: "Article" };

export default async function ArticleDetailPage({
  params,
}: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  return <PagePlaceholder title={`Article : ${slug}`} />;
}

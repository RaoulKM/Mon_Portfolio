import type { Metadata } from "next";

import { pageMetadata } from "@/lib/seo/metadata";
import { PagePlaceholder } from "@/components/public/page-placeholder";
import { getDictionary, getLocale, getI18n } from "@/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const t = getDictionary(await getLocale());
  return pageMetadata({
    path: "/blog",
    title: t.blogPage.title,
    description: t.blogPage.description,
  });
}

export default async function BlogPage() {
  const { t } = await getI18n();
  return (
    <PagePlaceholder title={t.blogPage.title} description={t.blogPage.description} />
  );
}

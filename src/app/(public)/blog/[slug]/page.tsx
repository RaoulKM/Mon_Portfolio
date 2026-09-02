import type { Metadata } from "next";

import { PagePlaceholder } from "@/components/public/page-placeholder";
import { getDictionary, getLocale, getI18n } from "@/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const t = getDictionary(await getLocale());
  return { title: t.blogPage.article };
}

export default async function ArticleDetailPage({
  params,
}: PageProps<"/blog/[slug]">) {
  const [{ slug }, { t }] = await Promise.all([params, getI18n()]);
  return <PagePlaceholder title={`${t.blogPage.article} : ${slug}`} />;
}

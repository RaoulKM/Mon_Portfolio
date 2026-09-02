import Link from "next/link";

import { getI18n } from "@/i18n";

export default async function NotFound() {
  const { t } = await getI18n();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="text-primary text-6xl font-extrabold">404</p>
      <h1 className="text-xl font-semibold">{t.errors.notFoundTitle}</h1>
      <p className="text-muted-foreground text-sm">{t.errors.notFoundText}</p>
      <Link
        href="/"
        className="bg-primary text-primary-foreground mt-2 rounded-md px-4 py-2 text-sm font-medium"
      >
        {t.common.backHome}
      </Link>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { siteConfig } from "@/config/site";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Connexion",
  robots: { index: false, follow: false },
};

export default async function LoginPage() {
  const session = await auth();
  if (session?.user) redirect("/admin/dashboard");

  return (
    <div className="bg-muted/40 flex min-h-screen items-center justify-center px-4">
      <div className="bg-card border-border w-full max-w-sm rounded-xl border p-8 shadow-sm">
        <div className="mb-6 text-center">
          <p className="text-lg font-bold tracking-tight">{siteConfig.shortName}</p>
          <h1 className="text-muted-foreground mt-1 text-sm">
            Administration du portfolio
          </h1>
        </div>

        <LoginForm />

        <p className="text-muted-foreground mt-6 text-center text-xs">
          <Link href="/" className="hover:text-foreground underline">
            ← Retour au site
          </Link>
        </p>
      </div>
    </div>
  );
}

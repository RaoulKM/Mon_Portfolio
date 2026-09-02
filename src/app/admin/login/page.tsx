import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Terminal } from "lucide-react";

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
    <div className="dot-bg relative flex min-h-screen items-center justify-center px-4">
      <div
        aria-hidden
        className="bg-accent/10 pointer-events-none absolute left-1/2 top-1/3 size-[36rem] -translate-x-1/2 rounded-full blur-[160px]"
      />

      <div className="terminal-frame relative w-full max-w-sm overflow-hidden">
        <div className="border-border flex items-center gap-2 border-b px-4 py-2.5">
          <span className="bg-destructive/70 size-2.5 rounded-full" />
          <span className="bg-chart-5/70 size-2.5 rounded-full" />
          <span className="bg-chart-4/70 size-2.5 rounded-full" />
          <span className="text-muted-foreground ml-3 font-mono text-xs">
            auth — login
          </span>
        </div>

        <div className="p-8">
          <div className="mb-6 flex items-center gap-3">
            <span className="border-accent/40 bg-accent/10 text-accent flex size-9 items-center justify-center rounded-md border">
              <Terminal className="size-4" />
            </span>
            <div>
              <p className="font-mono font-bold">{siteConfig.shortName}</p>
              <p className="text-terminal-dim font-mono text-[11px]">
                sudo access required
              </p>
            </div>
          </div>

          <LoginForm />

          <p className="text-muted-foreground mt-6 text-center font-mono text-xs">
            <Link href="/" className="hover:text-accent link-underline">
              cd ~/
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

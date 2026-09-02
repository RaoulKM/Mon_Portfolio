import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="text-primary text-6xl font-extrabold">404</p>
      <h1 className="text-xl font-semibold">Page introuvable</h1>
      <p className="text-muted-foreground text-sm">
        La page demandée n&apos;existe pas ou a été déplacée.
      </p>
      <Link
        href="/"
        className="bg-primary text-primary-foreground mt-2 rounded-md px-4 py-2 text-sm font-medium"
      >
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}

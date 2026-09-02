"use client";

import { useEffect, useState } from "react";

const STRINGS = {
  fr: {
    title: "Une erreur est survenue",
    text: "Quelque chose s'est mal passé. Vous pouvez réessayer.",
    retry: "Réessayer",
  },
  en: {
    title: "Something went wrong",
    text: "An error occurred. You can try again.",
    retry: "Try again",
  },
};

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [lang, setLang] = useState<"fr" | "en">("fr");

  useEffect(() => {
    console.error(error);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (document.documentElement.lang === "en") setLang("en");
  }, [error]);

  const s = STRINGS[lang];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-xl font-semibold">{s.title}</h1>
      <p className="text-muted-foreground text-sm">{s.text}</p>
      <button
        onClick={reset}
        className="bg-primary text-primary-foreground mt-2 rounded-md px-4 py-2 text-sm font-medium"
      >
        {s.retry}
      </button>
    </div>
  );
}

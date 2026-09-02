"use client";

import * as React from "react";
import { useReducedMotion } from "framer-motion";

/** Types through `phrases`, deleting between each. Retro terminal cursor. */
export function Typewriter({
  phrases,
  className,
  typingSpeed = 55,
  deletingSpeed = 28,
  holdTime = 1600,
  loop = true,
}: {
  phrases: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  holdTime?: number;
  loop?: boolean;
}) {
  const reduce = useReducedMotion();
  const [text, setText] = React.useState("");
  const [index, setIndex] = React.useState(0);
  const [deleting, setDeleting] = React.useState(false);

  React.useEffect(() => {
    if (reduce) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setText(phrases[0] ?? "");
      return;
    }
    const current = phrases[index % phrases.length] ?? "";
    const done = text === current;
    const empty = text === "";

    let delay = deleting ? deletingSpeed : typingSpeed;
    if (!deleting && done) delay = holdTime;
    if (deleting && empty) delay = 320;

    const t = setTimeout(() => {
      if (!deleting && done) {
        if (!loop && index === phrases.length - 1) return;
        setDeleting(true);
      } else if (deleting && empty) {
        setDeleting(false);
        setIndex((i) => i + 1);
      } else {
        setText((prev) =>
          deleting
            ? current.slice(0, prev.length - 1)
            : current.slice(0, prev.length + 1),
        );
      }
    }, delay);

    return () => clearTimeout(t);
  }, [text, deleting, index, phrases, reduce, typingSpeed, deletingSpeed, holdTime, loop]);

  return (
    <span className={className}>
      {text}
      <span
        aria-hidden
        className="bg-accent ml-1 inline-block h-[1em] w-[0.55ch] translate-y-[0.12em] animate-blink"
      />
    </span>
  );
}

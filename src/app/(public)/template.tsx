"use client";

import { motion, useReducedMotion } from "framer-motion";

import { EASE_OUT } from "@/lib/motion";

/** Runs on every public navigation → gives each route a cinematic entrance. */
export default function PublicTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.5, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}

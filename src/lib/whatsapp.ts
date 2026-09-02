const DEFAULT_MESSAGE = "Bonjour Raoul, je vous contacte au sujet de ";

/**
 * Build a wa.me deep link from an international number + a pre-filled message.
 * Returns null when no usable number is provided.
 */
export function buildWhatsappUrl(
  rawNumber?: string | null,
  message?: string | null,
): string | null {
  const digits = (rawNumber ?? "").replace(/[^\d]/g, "");
  if (digits.length < 6) return null;
  const text = encodeURIComponent((message?.trim() || DEFAULT_MESSAGE));
  return `https://wa.me/${digits}?text=${text}`;
}

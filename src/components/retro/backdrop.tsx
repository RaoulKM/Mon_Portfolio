/** Fixed, non-interactive scene behind all public content. */
export function RetroBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* engineering grid */}
      <div className="grid-bg absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />

      {/* ambient glows */}
      <div className="bg-primary/20 absolute -top-40 -left-40 size-[38rem] rounded-full blur-[140px] animate-float" />
      <div className="bg-accent/15 absolute top-1/3 -right-40 size-[34rem] rounded-full blur-[150px] animate-float [animation-delay:-3s]" />

      {/* horizon line */}
      <div className="via-accent/40 absolute inset-x-0 top-[62vh] h-px bg-gradient-to-r from-transparent to-transparent" />

      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,var(--background)_100%)]" />
    </div>
  );
}

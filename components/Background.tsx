// Fixed, decorative background: animated aurora blobs + a fine grid and grain.
// Pure CSS (no JS) so it's cheap and never blocks interaction.
export default function Background() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-base-950"
    >
      {/* Aurora blobs */}
      <div className="animate-aurora-1 absolute -left-32 -top-40 h-[42rem] w-[42rem] rounded-full bg-accent/20 blur-[120px]" />
      <div className="animate-aurora-2 absolute -right-40 top-10 h-[38rem] w-[38rem] rounded-full bg-accent-cyan/15 blur-[120px]" />
      <div className="animate-aurora-1 absolute bottom-[-12rem] left-1/3 h-[34rem] w-[34rem] rounded-full bg-fuchsia-600/15 blur-[120px]" />

      {/* Fine grid */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 100% 60% at 50% 0%, black 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 100% 60% at 50% 0%, black 40%, transparent 100%)",
        }}
      />

      {/* Grain */}
      <div className="grain absolute inset-0 opacity-[0.035]" />
    </div>
  );
}

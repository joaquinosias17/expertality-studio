export function Mark({ size = 24, ring = "currentColor" }: { size?: number; ring?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 26 26" aria-hidden="true">
      <circle cx="13" cy="13" r="10" fill="none" stroke={ring} strokeWidth="4" />
      <rect x="5" y="11.5" width="16" height="3" fill="#b4232f" />
    </svg>
  );
}

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <Mark ring={dark ? "#ffffff" : "#0b0d12"} />
      <span className="font-display text-[15px] font-bold tracking-[0.14em]">
        <span className="text-red">EXPERT</span>
        <span className={dark ? "text-white" : "text-ink"}>ALITY</span>
      </span>
      <span className={`hidden text-[15px] font-semibold sm:inline ${dark ? "text-mist" : "text-ink-muted"}`}>Studio</span>
    </span>
  );
}

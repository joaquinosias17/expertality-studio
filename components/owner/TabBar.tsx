"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const I = {
  week: <path d="M4 6h16v14H4zM4 10h16M8 3v5M16 3v5" />,
  results: <path d="M5 20V11M12 20V5M19 20v-6" />,
  brand: <><circle cx="12" cy="12" r="8" /><path d="M12 4a8 8 0 0 0 0 16c1.5 0 1.5-2 .5-3s0-3 2-3H20" /></>,
};
const Ico = ({ d }: { d: React.ReactNode }) => <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">{d}</svg>;

export function TabBar() {
  const p = usePathname();
  const tab = (href: string, label: string, icon: React.ReactNode) => {
    const on = p === href;
    return (
      <Link href={href} aria-current={on ? "page" : undefined} className={`flex min-h-14 flex-1 flex-col items-center justify-center gap-0.5 text-[12px] font-semibold transition-colors ${on ? "text-midnight" : "text-ink-muted"}`}>
        <Ico d={icon} />{label}
      </Link>
    );
  };
  return (
    <nav className="sticky bottom-0 z-30 border-t border-line bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur" aria-label="Main">
      <div className="flex items-center px-2">
        {tab("/app", "My week", I.week)}
        <Link href="/app/create" aria-current={p === "/app/create" ? "page" : undefined} className="flex flex-1 flex-col items-center justify-center gap-0.5 pb-1 text-[12px] font-semibold text-midnight">
          <span className="-mt-6 flex size-14 items-center justify-center rounded-full bg-midnight text-white shadow-[0_10px_24px_-8px_rgba(21,35,63,0.7),inset_0_-3px_0_var(--color-red)] transition-transform active:scale-95">
            <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
          </span>
          New post
        </Link>
        {tab("/app/results", "Results", I.results)}
        {tab("/app/brand", "My brand", I.brand)}
      </div>
    </nav>
  );
}

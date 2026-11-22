import Link from "next/link";
import { Logo } from "@/components/Logo";
import { AppNav } from "@/components/AppNav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-cloud lg:grid lg:grid-cols-[232px_minmax(0,1fr)]">
      <aside className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-midnight-raised bg-midnight px-5 py-3 text-white lg:sticky lg:top-0 lg:h-dvh lg:flex-col lg:items-stretch lg:gap-8 lg:border-b-0 lg:py-6">
        <Link href="/" aria-label="Back to the site"><Logo dark /></Link>
        <AppNav />
        <p className="mt-auto hidden text-[12px] leading-snug text-mist lg:block">Demo with a sample brand. Nothing here posts anywhere.</p>
      </aside>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

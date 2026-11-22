import Link from "next/link";
import { StudioProvider } from "@/lib/store";
import { Logo } from "@/components/Logo";

export const metadata = { title: "Expertality Studio" };

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <StudioProvider>
      <div className="min-h-dvh bg-cloud lg:grid lg:grid-cols-[minmax(0,1fr)_440px_minmax(0,1fr)]">
        <aside className="hidden flex-col justify-between p-10 lg:flex">
          <Link href="/" aria-label="Back to the site"><Logo /></Link>
          <div className="max-w-[300px]">
            <p className="font-display text-[26px] font-bold leading-tight text-midnight">This is the app a store owner uses.</p>
            <p className="mt-3 text-[15px] leading-relaxed text-body">It is built for a phone. Open this page on yours to try it the way an owner would.</p>
          </div>
          <p className="text-[13px] text-ink-muted">Demo. Nothing here posts to real accounts yet.</p>
        </aside>
        <div className="relative mx-auto flex min-h-dvh w-full max-w-[440px] flex-col bg-white lg:my-6 lg:min-h-0 lg:h-[min(880px,calc(100dvh-48px))] lg:self-center lg:overflow-hidden lg:rounded-[32px] lg:shadow-[0_40px_80px_-40px_rgba(15,26,48,0.45)]">
          {children}
        </div>
      </div>
    </StudioProvider>
  );
}

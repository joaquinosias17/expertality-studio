import Link from "next/link";
import { Logo } from "./Logo";

export function SiteNav() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-white/92 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1240px] items-center gap-8 px-5 md:px-8">
        <Link href="/" aria-label="Expertality Studio home"><Logo /></Link>
        <nav className="ml-auto hidden items-center gap-7 text-[14px] text-body md:flex">
          <a href="#how" className="hover:text-midnight">How it works</a>
          <a href="#pricing" className="hover:text-midnight">Pricing</a>
          <a href="#walkthrough" className="hover:text-midnight">For brands</a>
        </nav>
        <Link href="/app/start" className="ml-auto inline-flex min-h-10 items-center whitespace-nowrap rounded-lg bg-midnight px-4 text-[14px] font-semibold text-white shadow-[inset_0_-3px_0_var(--color-red)] transition-transform duration-150 active:scale-[0.97] md:ml-0">
          Make my free week
        </Link>
      </div>
    </header>
  );
}

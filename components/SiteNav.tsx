import Link from "next/link";
import { Logo } from "./Logo";

export function SiteNav() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-white/92 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1240px] items-center gap-8 px-5 md:px-8">
        <Link href="/" aria-label="Expertality Studio home"><Logo /></Link>
        <nav className="ml-auto hidden items-center gap-7 text-[14px] text-body md:flex">
          <a href="#brands" className="hover:text-midnight">For brand teams</a>
          <a href="#stores" className="hover:text-midnight">For store owners</a>
          <a href="#pricing" className="hover:text-midnight">Pricing</a>
          <Link href="/app" className="hover:text-midnight">Demo</Link>
        </nav>
        <a href="#walkthrough" className="ml-auto inline-flex min-h-10 items-center whitespace-nowrap rounded-sm bg-midnight px-4 text-[14px] font-semibold text-white shadow-[inset_0_-3px_0_var(--color-red)] transition-transform duration-150 active:scale-[0.97] md:ml-0">
          Book a walkthrough
        </a>
      </div>
    </header>
  );
}

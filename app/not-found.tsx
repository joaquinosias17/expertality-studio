import Link from "next/link";
export default function NotFound() {
  return (
    <main className="mx-auto max-w-[640px] px-5 py-32">
      <h1 className="font-display text-[40px] font-bold text-midnight">This page is not here.</h1>
      <p className="mt-4 text-[17px] text-body">The link may be old. Start from the home page.</p>
      <Link href="/" className="mt-8 inline-flex min-h-12 items-center rounded-sm bg-midnight px-6 text-[15px] font-semibold text-white shadow-[inset_0_-3px_0_var(--color-red)]">Go to the home page</Link>
    </main>
  );
}

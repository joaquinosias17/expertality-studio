"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ITEMS = [
  { href: "/app", label: "Calendar" },
  { href: "/app/create", label: "Create" },
  { href: "/app/week", label: "Store view" },
];

export function AppNav() {
  const path = usePathname();
  return (
    <nav className="flex w-full gap-1 sm:ml-auto sm:w-auto lg:ml-0 lg:w-full lg:flex-col">
      {ITEMS.map((i) => {
        const on = path === i.href;
        return (
          <Link key={i.href} href={i.href} aria-current={on ? "page" : undefined}
            className={`rounded-sm px-3 py-2 text-[14px] ${on ? "bg-midnight-raised font-semibold text-white lg:shadow-[inset_3px_0_0_var(--color-red)]" : "text-mist hover:text-white"}`}>
            {i.label}
          </Link>
        );
      })}
    </nav>
  );
}

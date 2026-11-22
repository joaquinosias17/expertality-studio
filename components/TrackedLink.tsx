"use client";
import Link from "next/link";
import { track } from "@vercel/analytics";

export function TrackedLink({ where, href, className, children }: { where: string; href: string; className?: string; children: React.ReactNode }) {
  return <Link href={href} className={className} onClick={() => track("cta", { where })}>{children}</Link>;
}

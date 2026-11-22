"use client";
import { useEffect } from "react";

export const Btn = ({ children, kind = "primary", className = "", ...p }: React.ButtonHTMLAttributes<HTMLButtonElement> & { kind?: "primary" | "ghost" | "quiet" }) => (
  <button {...p} className={`inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl px-5 text-[16px] font-semibold transition-[transform,background-color,opacity] duration-150 active:scale-[0.97] disabled:opacity-50 ${
    kind === "primary" ? "bg-midnight text-white shadow-[inset_0_-3px_0_var(--color-red)]" : kind === "ghost" ? "border border-line bg-white text-midnight" : "text-midnight underline underline-offset-4"
  } ${className}`}>{children}</button>
);

export function Hint({ id, seen, onSeen, children }: { id: string; seen?: boolean; onSeen: (id: string) => void; children: React.ReactNode }) {
  if (seen) return null;
  return (
    <div className="fade-up relative mx-5 rounded-2xl bg-midnight p-4 pr-24 text-[15px] leading-snug text-white" role="note">
      {children}
      <button onClick={() => onSeen(id)} className="absolute right-3 top-1/2 min-h-10 -translate-y-1/2 rounded-lg bg-white/10 px-3 text-[14px] font-semibold">Got it</button>
    </div>
  );
}

export function Sheet({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" role="dialog" aria-modal="true" aria-label={title}>
      <button aria-label="Close" onClick={onClose} className="fade-up absolute inset-0 bg-ink/50" />
      <div className="sheet-up relative max-h-[88dvh] w-full max-w-[440px] overflow-y-auto rounded-t-3xl bg-white px-5 pb-8 pt-3">
        <span className="mx-auto block h-1.5 w-10 rounded-full bg-mist" />
        <h2 className="mt-4 font-display text-[22px] font-bold text-midnight">{title}</h2>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}

export function Toast({ text }: { text: string | null }) {
  if (!text) return null;
  return <div className="fade-up fixed inset-x-0 top-6 z-[60] mx-auto w-fit max-w-[90vw] rounded-full bg-ink px-5 py-3 text-[15px] font-semibold text-white shadow-lg" role="status">{text}</div>;
}

export const buzz = () => { try { navigator.vibrate?.(12); } catch {} };

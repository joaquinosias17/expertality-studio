"use client";
import { useState } from "react";
import { WEEK } from "@/lib/data";
import { PostThumb } from "./PostThumb";
import { Check, Flag } from "./Icons";

export function PhoneWeek({ framed = true }: { framed?: boolean }) {
  const [approved, setApproved] = useState<Record<string, boolean>>({});
  const approvable = WEEK.filter((p) => !p.review);
  const done = approvable.filter((p) => approved[p.id]).length;
  const all = done === approvable.length;

  const screen = (
    <div className="flex h-full flex-col bg-white text-ink">
      <header className="bg-midnight px-5 pb-5 pt-6 text-white">
        <p className="text-[12px] font-semibold text-mist">South Congress, Austin</p>
        <h3 className="mt-1 font-display text-[24px] font-bold leading-tight">{all ? "Your week is set" : "Your week is ready"}</h3>
        <p className="mt-1 text-[13px] text-mist tabular">{all ? "3 posts scheduled. 1 waiting for the brand." : `4 posts for Dec 1 to 7. ${done} of 3 approved.`}</p>
      </header>
      <ul className="flex-1 divide-y divide-line overflow-y-auto px-4">
        {WEEK.map((p) => (
          <li key={p.id} className="flex gap-3 py-3">
            <div className="w-[64px] shrink-0"><PostThumb img={p.img} overlay={p.overlay} sizes="64px" /></div>
            <div className="min-w-0 flex-1">
              <p className="text-[12px] text-ink-muted tabular">{p.day} {p.time} · {p.format}</p>
              <p className="mt-0.5 text-[14px] font-semibold leading-snug">{p.title}</p>
              {p.review ? (
                <p className="mt-2 flex items-start gap-1.5 text-[12px] font-semibold text-red"><Flag className="mt-px size-4 shrink-0" />Waiting for brand review</p>
              ) : approved[p.id] ? (
                <p className="mt-2 flex items-center gap-1.5 text-[13px] font-semibold text-midnight"><Check className="size-4" />Scheduled</p>
              ) : (
                <div className="mt-2 flex gap-2">
                  <button onClick={() => setApproved((a) => ({ ...a, [p.id]: true }))} className="min-h-10 flex-1 rounded-sm bg-midnight px-3 text-[13px] font-semibold text-white transition-transform duration-150 active:scale-[0.97]">Approve</button>
                  <button className="min-h-10 flex-1 rounded-sm border border-line px-3 text-[13px] text-midnight">Edit</button>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
      <footer className="border-t border-line p-4">
        <button
          onClick={() => setApproved(Object.fromEntries(approvable.map((p) => [p.id, true])))}
          disabled={all}
          className="min-h-12 w-full rounded-sm bg-midnight text-[15px] font-semibold text-white shadow-[inset_0_-3px_0_var(--color-red)] transition-[transform,opacity] duration-150 active:scale-[0.98] disabled:opacity-40"
        >
          {all ? "All set for the week" : `Approve all ${approvable.length - done}`}
        </button>
      </footer>
    </div>
  );

  if (!framed) return <div className="h-[100dvh]">{screen}</div>;
  return (
    <div className="mx-auto w-full max-w-[340px] rounded-[44px] bg-ink p-[10px] shadow-[0_40px_80px_-30px_rgba(15,26,48,0.55)]">
      <div className="h-[640px] overflow-hidden rounded-[34px]">{screen}</div>
    </div>
  );
}

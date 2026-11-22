"use client";
import { useState } from "react";
import { track } from "@vercel/analytics";
import { ReelPlayer } from "./ReelPlayer";
import { Check } from "./Icons";

export function ReelPhone() {
  const [state, setState] = useState<"review" | "approved">("review");
  return (
    <div className="mx-auto w-full max-w-[320px] rounded-[46px] bg-ink p-[10px] shadow-[0_50px_90px_-40px_rgba(15,26,48,0.65)]">
      <div className="relative h-[620px] overflow-hidden rounded-[36px]">
        <ReelPlayer />
        <div className="absolute inset-x-2 bottom-2 rounded-[26px] bg-white/95 p-4 text-ink shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] backdrop-blur">
          {state === "review" ? (
            <>
              <p className="text-[12px] text-ink-muted tabular">Mon 8:00 AM · Reel, 13 s · South Congress</p>
              <p className="mt-0.5 text-[15px] font-semibold leading-snug">Holiday menu is here</p>
              <p className="mt-1 flex items-center gap-1.5 text-[12px] text-midnight"><Check className="size-3.5" />Passed every brand rule</p>
              <div className="mt-3 flex gap-2">
                <button onClick={() => { setState("approved"); track("hero_approve"); }} className="min-h-11 flex-1 rounded-sm bg-midnight text-[14px] font-semibold text-white shadow-[inset_0_-3px_0_var(--color-red)] transition-transform duration-150 active:scale-[0.97]">Approve</button>
                <button className="min-h-11 rounded-sm border border-line px-4 text-[14px] text-midnight">Edit</button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-3 py-1" role="status">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-midnight text-white"><Check className="size-5" /></span>
              <div>
                <p className="text-[15px] font-semibold">Scheduled for Monday, 8:00 AM</p>
                <button onClick={() => setState("review")} className="text-[13px] text-ink-muted underline">Undo</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

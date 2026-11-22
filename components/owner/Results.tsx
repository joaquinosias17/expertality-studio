"use client";
import { useEffect, useState } from "react";
import { Screen } from "./Screen";

const NUMS = [
  { label: "Posts that went out", v: 16, note: "4 a week, none missed" },
  { label: "People who saw them", v: 3840, note: "Instagram, Facebook and TikTok" },
  { label: "Calls from Google", v: 27, note: "From your Google posts" },
  { label: "Asked for directions", v: 41, note: "On Google Maps" },
];
const WEEKS = [{ w: "Oct 26", v: 6 }, { w: "Nov 2", v: 9 }, { w: "Nov 9", v: 5 }, { w: "Nov 16", v: 7 }];

function useCount(to: number, ms = 900) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setN(to); return; }
    let raf = 0; const t0 = performance.now();
    const step = (t: number) => { const k = Math.min(1, (t - t0) / ms); setN(Math.round(to * (1 - Math.pow(1 - k, 3)))); if (k < 1) raf = requestAnimationFrame(step); };
    raf = requestAnimationFrame(step); return () => cancelAnimationFrame(raf);
  }, [to, ms]);
  return n;
}
function Num({ v }: { v: number }) { const n = useCount(v); return <>{n.toLocaleString("en-US")}</>; }

export function Results() {
  const max = Math.max(...WEEKS.map((x) => x.v));
  return (
    <Screen>
      <div className="px-5 pt-6">
        <h1 className="font-display text-[28px] font-bold leading-tight text-midnight">Your last 4 weeks</h1>
        <p className="mt-2 rounded-xl bg-cloud px-4 py-3 text-[14px] leading-snug text-body">Example numbers. Your real numbers show up here once your accounts are connected.</p>
        <dl className="mt-5 grid grid-cols-2 gap-3">
          {NUMS.map((x) => (
            <div key={x.label} className="rounded-2xl border border-line p-4">
              <dt className="text-[14px] text-ink-muted">{x.label}</dt>
              <dd className="mt-1 font-display text-[40px] font-extralight leading-none text-midnight tabular"><Num v={x.v} /></dd>
              <dd className="mt-2 text-[13px] text-ink-muted">{x.note}</dd>
            </div>
          ))}
        </dl>
        <section className="mt-6 rounded-2xl border border-line p-4" aria-label="Calls from Google by week">
          <p className="text-[16px] font-semibold text-ink">Calls from Google, by week</p>
          <div className="mt-4 flex h-36 items-end gap-4">
            {WEEKS.map((x, i) => (
              <div key={x.w} className="flex flex-1 flex-col items-center gap-2">
                <span className="text-[14px] font-semibold text-midnight tabular">{x.v}</span>
                <span className="fade-up block w-full rounded-t-md bg-midnight" style={{ height: `${(x.v / max) * 90}px`, animationDelay: `${i * 80}ms` }} />
                <span className="text-[12px] text-ink-muted">{x.w}</span>
              </div>
            ))}
          </div>
        </section>
        <section className="mt-6 rounded-2xl bg-midnight p-5 text-white">
          <p className="text-[14px] text-mist">What worked best</p>
          <p className="mt-1 text-[18px] font-semibold leading-snug">Posts with a day and a time, like &ldquo;Open late Friday&rdquo;, brought the most calls.</p>
          <p className="mt-2 text-[14px] text-mist">We use this to plan your next week.</p>
        </section>
      </div>
    </Screen>
  );
}

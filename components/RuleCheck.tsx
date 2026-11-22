"use client";
import { useEffect, useRef, useState } from "react";
import { CHECKS, PHOTOS } from "@/lib/data";
import { PostThumb } from "./PostThumb";
import { Check } from "./Icons";

// The one authored motion on the page: rules tick through, one by one, when the band scrolls in.
export function RuleCheck() {
  const ref = useRef<HTMLDivElement>(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setN(CHECKS.length); return; }
    let t: ReturnType<typeof setInterval> | undefined;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      t = setInterval(() => setN((v) => { if (v >= CHECKS.length) { clearInterval(t); return v; } return v + 1; }), 420);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); if (t) clearInterval(t); };
  }, []);

  return (
    <div ref={ref} className="grid items-start gap-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
      <div className="mx-auto w-full max-w-[300px] md:mx-0">
        <PostThumb img={PHOTOS.icedPour} overlay="Fundraiser Tuesday" size="lg" sizes="300px" />
        <p className="mt-3 text-[13px] text-mist">Draft from the Austin store, before the check.</p>
      </div>
      <div>
        <ol className="border-t border-midnight-raised">
          {CHECKS.map((c, i) => {
            const on = i < n;
            return (
              <li key={c.rule} className="grid grid-cols-[28px_minmax(0,1fr)_auto] items-baseline gap-3 border-b border-midnight-raised py-4">
                <span className={`flex size-6 items-center justify-center transition-[opacity,transform] duration-300 ease-[var(--ease-out-expo)] ${on ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
                  <Check className="size-5 text-white" />
                </span>
                <span className={`text-[16px] leading-snug transition-colors duration-300 ${on ? "text-white" : "text-mist/60"}`}>
                  {c.rule}
                  <span className="mt-0.5 block text-[12px] text-mist tabular">Brand guide, page {c.page}</span>
                </span>
                <span className={`text-[13px] font-semibold tabular transition-opacity duration-300 ${on ? "opacity-100 text-mist" : "opacity-0"}`}>{c.action}</span>
              </li>
            );
          })}
        </ol>
        <p className="mt-6 max-w-[52ch] text-[15px] leading-relaxed text-mist">
          {n >= CHECKS.length
            ? "Two fixes, one disclaimer added, and the partner mention sent to the brand team. The store owner never had to read the guide."
            : "Checking the draft against the brand guide."}
        </p>
      </div>
    </div>
  );
}

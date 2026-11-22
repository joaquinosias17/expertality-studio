"use client";
import { useState } from "react";
import { CHECKS, PHOTOS } from "@/lib/data";
import { PostThumb } from "./PostThumb";
import { Doc, Music, Check } from "./Icons";

const COLORS = [
  { name: "Espresso", hex: "#3b2418", use: "Backgrounds, type" },
  { name: "Oat", hex: "#f3e6d3", use: "Type on photos" },
  { name: "Pumpkin", hex: "#e07a2e", use: "Seasonal only, Oct to Dec" },
];
const MOODS = [
  { name: "Warm acoustic", bpm: "90 to 100 BPM", for: "Menu and product" },
  { name: "Light percussion", bpm: "100 to 110 BPM", for: "Countdowns and events" },
  { name: "Lo-fi", bpm: "80 to 90 BPM", for: "Store hours and ambience" },
];

export function BrandKit() {
  const [on, setOn] = useState<Record<number, boolean>>(Object.fromEntries(CHECKS.map((_, i) => [i, true])));
  return (
    <main className="mx-auto max-w-[1180px] px-5 py-8 md:px-8 md:py-10">
      <h1 className="font-display text-[30px] font-bold leading-tight text-midnight">Brand kit</h1>
      <p className="mt-2 max-w-[60ch] text-[15px] text-body">Everything every store builds from. Changes here apply to the next draft at every location.</p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        <section className="border border-line bg-white" aria-labelledby="rules">
          <div className="flex flex-wrap items-center gap-3 border-b border-line px-5 py-4">
            <Doc className="size-5 text-midnight" />
            <div>
              <h2 id="rules" className="text-[16px] font-semibold text-ink">Rules from your guide</h2>
              <p className="text-[13px] text-ink-muted">Mesa-Brand-Guide-2026.pdf · 38 pages · read Nov 18</p>
            </div>
          </div>
          <ul className="divide-y divide-line">
            {CHECKS.map((c, i) => (
              <li key={c.rule} className="flex items-center gap-4 px-5 py-3.5">
                <div className="min-w-0 flex-1">
                  <p className={`text-[15px] ${on[i] ? "text-ink" : "text-ink-muted line-through"}`}>{c.rule}</p>
                  <p className="text-[12px] text-ink-muted tabular">Page {c.page}</p>
                </div>
                <button role="switch" aria-checked={on[i]} aria-label={`${on[i] ? "Turn off" : "Turn on"}: ${c.rule}`} onClick={() => setOn((s) => ({ ...s, [i]: !s[i] }))}
                  className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 ${on[i] ? "bg-midnight" : "bg-mist"}`}>
                  <span className={`absolute top-0.5 size-5 rounded-full bg-white shadow transition-transform duration-200 ease-[var(--ease-out-expo)] ${on[i] ? "translate-x-[22px]" : "translate-x-0.5"}`} />
                </button>
              </li>
            ))}
          </ul>
          <p className="border-t border-line px-5 py-3 text-[13px] text-ink-muted">Turning a rule off sends those posts to you for review instead.</p>
        </section>

        <div className="grid content-start gap-6">
          <section className="border border-line bg-white p-5" aria-labelledby="look">
            <h2 id="look" className="text-[16px] font-semibold text-ink">Colors and type</h2>
            <ul className="mt-4 grid grid-cols-3 gap-3">
              {COLORS.map((c) => (
                <li key={c.hex}>
                  <span className="block h-14 border border-line" style={{ background: c.hex }} />
                  <p className="mt-2 text-[13px] font-semibold text-ink">{c.name}</p>
                  <p className="text-[12px] text-ink-muted">{c.use}</p>
                </li>
              ))}
            </ul>
            <p className="mt-5 font-mesa text-[28px] leading-none text-espresso">Young Serif</p>
            <p className="mt-1 text-[12px] text-ink-muted">Headlines on every post. Locked.</p>
          </section>
          <section className="border border-line bg-white p-5" aria-labelledby="music">
            <h2 id="music" className="flex items-center gap-2 text-[16px] font-semibold text-ink"><Music className="size-5 text-midnight" />Music moods</h2>
            <ul className="mt-3 divide-y divide-line">
              {MOODS.map((m) => (
                <li key={m.name} className="flex items-baseline justify-between gap-3 py-2.5 text-[14px]">
                  <span className="text-ink">{m.name}<span className="block text-[12px] text-ink-muted">{m.for}</span></span>
                  <span className="text-ink-muted tabular">{m.bpm}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <section className="mt-6 border border-line bg-white p-5" aria-labelledby="tpl">
        <div className="flex items-baseline justify-between gap-3">
          <h2 id="tpl" className="text-[16px] font-semibold text-ink">Approved templates</h2>
          <p className="flex items-center gap-1.5 text-[13px] text-midnight"><Check className="size-4" />6 approved</p>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-6">
          {[PHOTOS.latteArt, PHOTOS.croissants, PHOTOS.biscotti, PHOTOS.interior, PHOTOS.pourMug, PHOTOS.glassLatte].map((img, i) => (
            <PostThumb key={img} img={img} overlay={["Holiday menu", "Fresh daily", "Gift cards", "Open late", "New roast", "Iced is back"][i]} size="md" sizes="180px" />
          ))}
        </div>
      </section>
    </main>
  );
}

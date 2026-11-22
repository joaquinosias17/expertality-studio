"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useStudio } from "@/lib/store";
import { LOOKS } from "@/lib/brand";
import { BrandReel } from "./BrandReel";
import { Screen } from "./Screen";
import { Btn, Sheet } from "./ui";
import { Toggle } from "./Week";

export function MyBrand() {
  const s = useStudio();
  const router = useRouter();
  const [confirm, setConfirm] = useState(false);
  useEffect(() => { if (s.ready && !s.brand) router.replace("/app/start"); }, [s.ready, s.brand, router]);
  if (!s.ready || !s.brand) return <div className="flex-1" />;
  const b = s.brand;
  const set = (patch: Partial<typeof b>) => s.setBrand({ ...b, ...patch });
  const sample = s.posts[0] ?? { hook: ["Fresh this", "week"], cta: "Visit us today", format: "Reel" as const };

  return (
    <Screen>
      <div className="px-5 pt-6">
        <h1 className="font-display text-[28px] font-bold leading-tight text-midnight">My brand</h1>
        <p className="mt-2 text-[15px] text-body">Every post is made from this. Change it and your next posts follow.</p>

        <div className="mt-5 grid grid-cols-[1fr_110px] gap-4">
          <div>
            <p className="text-[14px] font-semibold text-ink">Look</p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {LOOKS.map((l) => (
                <button key={l.id} onClick={() => set({ look: l })} aria-pressed={b.look.id === l.id} className={`rounded-xl border-2 p-1.5 ${b.look.id === l.id ? "border-midnight" : "border-line"}`}>
                  <span className="flex h-9 overflow-hidden rounded-md"><span className="flex-[3]" style={{ background: l.bg }} /><span className="flex-1" style={{ background: l.accent }} /></span>
                  <span className="mt-1 block text-[13px] font-semibold text-ink">{l.name}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="aspect-[9/16] overflow-hidden rounded-xl"><BrandReel brand={b} post={sample} /></div>
        </div>

        <Field label="Business name" value={b.business} onChange={(v) => set({ business: v })} />
        <Field label="What you sell" value={b.sells} onChange={(v) => set({ sells: v })} area />
        <Field label="Where" value={b.city} onChange={(v) => set({ city: v })} />

        <div className="mt-5">
          <p className="text-[14px] font-semibold text-ink">Post in</p>
          <div className="mt-2 inline-flex rounded-full border border-line p-1" role="group" aria-label="Language">
            {([["en", "English"], ["es", "Español"], ["both", "Both"]] as const).map(([k, t]) => (
              <button key={k} onClick={() => set({ lang: k })} aria-pressed={b.lang === k} className={`min-h-10 rounded-full px-4 text-[15px] font-semibold ${b.lang === k ? "bg-midnight text-white" : "text-ink-muted"}`}>{t}</button>
            ))}
          </div>
        </div>

        <section className="mt-6 rounded-2xl border border-line">
          <p className="border-b border-line px-4 py-3 text-[16px] font-semibold text-ink">Rules we always follow</p>
          <ul className="divide-y divide-line">
            {b.rules.map((r) => <li key={r} className="flex items-center gap-3 px-4 py-3 text-[15px] text-ink"><svg viewBox="0 0 24 24" className="size-5 shrink-0 text-midnight" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7" /></svg>{r}</li>)}
          </ul>
        </section>

        <label className="mt-4 flex items-center justify-between gap-4 rounded-2xl border border-line p-4">
          <span><b className="block text-[16px] text-ink">Autopilot</b><span className="text-[14px] text-ink-muted">If you do not approve by Monday noon, safe posts go out.</span></span>
          <Toggle on={s.autopilot} set={s.setAutopilot} label="Autopilot" />
        </label>

        <Btn kind="ghost" className="mt-6 w-full" onClick={() => setConfirm(true)}>Start over with another business</Btn>
      </div>
      <Sheet open={confirm} onClose={() => setConfirm(false)} title="Start over?">
        <p className="text-[16px] text-body">This clears {b.business} and its posts from this phone.</p>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <Btn kind="ghost" onClick={() => setConfirm(false)}>Keep it</Btn>
          <Btn onClick={() => { s.reset(); router.replace("/app/start"); }}>Start over</Btn>
        </div>
      </Sheet>
    </Screen>
  );
}

function Field({ label, value, onChange, area }: { label: string; value: string; onChange: (v: string) => void; area?: boolean }) {
  const cls = "mt-1.5 block w-full rounded-xl border-2 border-line px-3 text-[16px] font-normal focus:border-midnight focus:outline-none";
  return (
    <label className="mt-4 block text-[14px] font-semibold text-ink">{label}
      {area ? <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3} className={`${cls} py-3 leading-relaxed`} /> : <input value={value} onChange={(e) => onChange(e.target.value)} className={`${cls} min-h-12`} />}
    </label>
  );
}

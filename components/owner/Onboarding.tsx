"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { track } from "@vercel/analytics";
import { useStudio, generate, withIds } from "@/lib/store";
import { Brand, EXPERTALITY, LOOKS, BLANK_BRAND, EXPERTALITY_WEEK } from "@/lib/brand";
import { BrandReel } from "./BrandReel";
import { Btn } from "./ui";

const SELLS = ["Food and drinks", "Shipping and printing", "Fitness classes", "Home services", "Pet care", "Beauty and salon", "Professional services"];
const STEPS = ["Reading your business", "Finding the moments that matter this week", "Writing 4 posts and reels", "Checking every post against your brand"];

export function Onboarding() {
  const s = useStudio();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [sells, setSells] = useState("");
  const [city, setCity] = useState("");
  const [look, setLook] = useState(LOOKS[0]);
  const [building, setBuilding] = useState<Brand | null>(null);

  const next = () => setStep((v) => v + 1);
  const back = () => setStep((v) => Math.max(0, v - 1));

  function startBuild(b: Brand) { s.setBrand(b); setBuilding(b); setStep(5); track("onboarding_build", { example: b.business === "Expertality" ? "yes" : "no" }); }

  return (
    <div className="flex min-h-dvh flex-1 flex-col lg:min-h-0 lg:overflow-y-auto">
      {step > 0 && step < 5 && (
        <header className="flex items-center gap-4 px-5 pt-5">
          <button onClick={back} className="min-h-11 text-[15px] font-semibold text-midnight" aria-label="Back">Back</button>
          <div className="flex flex-1 gap-1.5" aria-label={`Step ${step} of 4`}>
            {[1, 2, 3, 4].map((i) => <span key={i} className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${i <= step ? "bg-midnight" : "bg-line"}`} />)}
          </div>
        </header>
      )}

      <div key={step} className="slide-in flex flex-1 flex-col px-5 pb-6 pt-6">
        {step === 0 && (
          <>
            <div className="mx-auto aspect-[9/16] w-[46%] max-w-[200px] overflow-hidden rounded-2xl shadow-[0_30px_60px_-30px_rgba(15,26,48,0.6)]">
              <BrandReel brand={EXPERTALITY} post={{ ...EXPERTALITY_WEEK[0] }} />
            </div>
            <h1 className="mt-8 font-display text-[34px] font-bold leading-[1.05] text-midnight">Your social media, done in one minute a week.</h1>
            <p className="mt-3 text-[17px] leading-relaxed text-body">Tell us about your business. We make your posts and reels for the week. You tap approve.</p>
            <div className="mt-auto grid gap-3 pt-8">
              <Btn onClick={next}>Set up my business</Btn>
              <Btn kind="ghost" onClick={() => startBuild(EXPERTALITY)}>See it with the Expertality example</Btn>
            </div>
          </>
        )}

        {step === 1 && (
          <form className="flex flex-1 flex-col" onSubmit={(e) => { e.preventDefault(); if (name.trim()) next(); }}>
            <label htmlFor="name" className="font-display text-[28px] font-bold leading-tight text-midnight">What is your business called?</label>
            <input id="name" autoFocus value={name} onChange={(e) => setName(e.target.value)} placeholder="Sunrise Cafe" autoComplete="organization"
              className="mt-6 min-h-14 rounded-xl border-2 border-line px-4 text-[20px] focus:border-midnight focus:outline-none" />
            <p className="mt-3 text-[15px] text-ink-muted">The name your customers know.</p>
            <Btn className="mt-auto" disabled={!name.trim()}>Continue</Btn>
          </form>
        )}

        {step === 2 && (
          <form className="flex flex-1 flex-col" onSubmit={(e) => { e.preventDefault(); if (sells.trim()) next(); }}>
            <label htmlFor="sells" className="font-display text-[28px] font-bold leading-tight text-midnight">What do you sell?</label>
            <div className="mt-5 flex flex-wrap gap-2">
              {SELLS.map((x) => (
                <button type="button" key={x} onClick={() => setSells(x)} aria-pressed={sells === x}
                  className={`min-h-11 rounded-full border px-4 text-[15px] transition-colors ${sells === x ? "border-midnight bg-midnight text-white" : "border-line text-ink"}`}>{x}</button>
              ))}
            </div>
            <input id="sells" value={sells} onChange={(e) => setSells(e.target.value)} placeholder="Or write it in your words"
              className="mt-4 min-h-14 rounded-xl border-2 border-line px-4 text-[18px] focus:border-midnight focus:outline-none" />
            <p className="mt-3 text-[15px] text-ink-muted">Add your best seller or offer if you have one. We will use it.</p>
            <Btn className="mt-auto" disabled={!sells.trim()}>Continue</Btn>
          </form>
        )}

        {step === 3 && (
          <form className="flex flex-1 flex-col" onSubmit={(e) => { e.preventDefault(); if (city.trim()) next(); }}>
            <label htmlFor="city" className="font-display text-[28px] font-bold leading-tight text-midnight">Where is it?</label>
            <input id="city" autoFocus value={city} onChange={(e) => setCity(e.target.value)} placeholder="Austin, TX" autoComplete="address-level2"
              className="mt-6 min-h-14 rounded-xl border-2 border-line px-4 text-[20px] focus:border-midnight focus:outline-none" />
            <p className="mt-3 text-[15px] text-ink-muted">So we can use local dates, events and weather.</p>
            <Btn className="mt-auto" disabled={!city.trim()}>Continue</Btn>
          </form>
        )}

        {step === 4 && (
          <div className="flex flex-1 flex-col">
            <h2 className="font-display text-[28px] font-bold leading-tight text-midnight">Pick your look</h2>
            <p className="mt-2 text-[15px] text-ink-muted">You can upload your logo and exact colors later.</p>
            <div className="mt-5 grid grid-cols-[1fr_120px] gap-4">
              <div className="grid grid-cols-2 gap-3">
                {LOOKS.map((l) => (
                  <button key={l.id} onClick={() => setLook(l)} aria-pressed={look.id === l.id}
                    className={`rounded-xl border-2 p-2 text-left transition-colors ${look.id === l.id ? "border-midnight" : "border-line"}`}>
                    <span className="flex h-12 overflow-hidden rounded-lg"><span className="flex-[3]" style={{ background: l.bg }} /><span className="flex-1" style={{ background: l.accent }} /><span className="flex-1" style={{ background: l.fg }} /></span>
                    <span className="mt-1.5 block text-[14px] font-semibold text-ink">{l.name}</span>
                  </button>
                ))}
              </div>
              <div className="aspect-[9/16] overflow-hidden rounded-xl">
                <BrandReel brand={BLANK_BRAND(name || "Your business", sells, city, look)} post={{ hook: ["Fresh this", "week"], cta: "Visit us today", format: "Reel" }} />
              </div>
            </div>
            <Btn className="mt-auto" onClick={() => startBuild({ ...BLANK_BRAND(name.trim(), sells.trim(), city.trim(), look), mark: [name.trim().toUpperCase(), ""] })}>Make my first week</Btn>
          </div>
        )}

        {step === 5 && building && <Building brand={building} onDone={() => router.replace("/app")} />}
      </div>
    </div>
  );
}

function Building({ brand, onDone }: { brand: Brand; onDone: () => void }) {
  const s = useStudio();
  const [i, setI] = useState(0);
  const [err, setErr] = useState("");
  useEffect(() => {
    let alive = true;
    const t = setInterval(() => setI((v) => Math.min(v + 1, STEPS.length - 1)), 1100);
    const started = Date.now();
    generate("week", brand)
      .then(({ posts }) => {
        const wait = Math.max(0, 4200 - (Date.now() - started));
        setTimeout(() => { if (!alive) return; s.setPosts(withIds(posts)); setI(STEPS.length); setTimeout(onDone, 500); }, wait);
      })
      .catch((e) => alive && setErr(e.message));
    return () => { alive = false; clearInterval(t); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="flex flex-1 flex-col justify-center" aria-live="polite">
      <h2 className="font-display text-[30px] font-bold leading-tight text-midnight">Making the week for {brand.business}</h2>
      <ol className="mt-8 space-y-4">
        {STEPS.map((t, k) => (
          <li key={t} className="flex items-center gap-3 text-[17px]">
            <span className={`flex size-7 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${k < i ? "bg-midnight text-white" : k === i ? "border-2 border-midnight" : "border-2 border-line"}`}>
              {k < i ? <svg viewBox="0 0 24 24" className="pop size-4" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7" /></svg>
                : k === i ? <span className="size-2 animate-pulse rounded-full bg-midnight" /> : null}
            </span>
            <span className={k <= i ? "text-ink" : "text-ink-muted"}>{t}</span>
          </li>
        ))}
      </ol>
      {err && <div className="mt-8"><p className="text-[16px] text-ink" role="alert">{err}</p><Btn className="mt-4" onClick={() => location.reload()}>Try again</Btn></div>}
    </div>
  );
}

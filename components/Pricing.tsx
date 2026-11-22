"use client";
import { useState } from "react";
import { track } from "@vercel/analytics";
import { BRAND_TIERS, brandPrice, setupFee, STORE_MONTHLY, STORE_YEARLY, PILOT, usd } from "@/lib/data";
import { Check } from "./Icons";

const STOPS = [10, 25, 40, 50, 100, 150, 250, 400, 600];

export function Pricing() {
  const [idx, setIdx] = useState(2);
  const n = STOPS[idx];
  const per = brandPrice(n);
  const month = per * n;
  const agency = 750 * n;
  const [yearly, setYearly] = useState(true);

  return (
    <div className="mt-12 grid gap-px border border-line bg-line lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
      {/* Brand */}
      <div className="bg-midnight p-7 text-white md:p-10">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h3 className="font-display text-[26px] font-bold">Brand</h3>
          <p className="text-[14px] text-mist">For franchises and chains, 10 locations or more</p>
        </div>

        <label htmlFor="locs" className="mt-8 flex items-baseline justify-between text-[15px] text-mist">
          <span>How many locations?</span>
          <output htmlFor="locs" className="font-display text-[22px] font-bold text-white tabular">{n}{n === 600 ? "+" : ""}</output>
        </label>
        <input id="locs" type="range" min={0} max={STOPS.length - 1} step={1} value={idx}
          onChange={(e) => setIdx(+e.target.value)} onPointerUp={() => track("pricing_slider", { locations: n })}
          className="mt-3 w-full accent-[var(--color-red)]" aria-valuetext={`${n} locations`} />

        <div className="mt-8 grid grid-cols-2 gap-6 border-t border-midnight-raised pt-7">
          <div>
            <p className="text-[13px] text-mist">Per location, per month</p>
            <p className="mt-1 font-display text-[40px] font-extralight leading-none tabular sm:text-[56px]">{usd(per)}</p>
          </div>
          <div>
            <p className="text-[13px] text-mist">Your monthly total</p>
            <p className="mt-1 font-display text-[40px] font-extralight leading-none tabular sm:text-[56px]">{usd(month)}</p>
          </div>
        </div>
        <p className="mt-5 text-[14px] leading-relaxed text-mist">
          Billed yearly. One-time setup of {usd(setupFee(n))}. At a typical agency retainer of $750 per location, the same {n} locations would cost about <span className="text-white tabular">{usd(agency)}</span> a month.
        </p>

        <ul className="mt-7 grid gap-2.5 text-[15px] sm:grid-cols-2">
          {["Rules from your brand guide", "5 to 8 approved motion templates", "Licensed music, picked per video", "Calendar for every location", "Approvals by exception", "English and Spanish", "Monthly report per location", "Unlimited users"].map((x) => (
            <li key={x} className="flex gap-2.5"><Check className="mt-0.5 size-4 shrink-0 text-mist" />{x}</li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#walkthrough" onClick={() => track("cta", { where: "pricing_brand" })} className="inline-flex min-h-12 items-center rounded-sm bg-white px-6 text-[15px] font-semibold text-midnight shadow-[inset_0_-3px_0_var(--color-red)] active:scale-[0.98]">Book a walkthrough</a>
          <a href="#walkthrough" onClick={() => track("cta", { where: "pricing_pilot" })} className="inline-flex min-h-12 items-center rounded-sm border border-midnight-raised px-6 text-[15px] font-semibold text-white hover:border-mist">Start a pilot</a>
        </div>
        <p className="mt-4 text-[13px] text-mist">
          Volume pricing: {BRAND_TIERS.map((t, k) => `${usd(t.price)} from ${t.from}${k === BRAND_TIERS.length - 1 ? "+" : ""} locations`).join(", ")}.
        </p>
      </div>

      <div className="grid gap-px bg-line">
        {/* Pilot */}
        <div className="bg-white p-7 md:p-9">
          <h3 className="font-display text-[22px] font-bold text-midnight">Pilot</h3>
          <p className="mt-3 font-display text-[44px] font-extralight leading-none text-midnight tabular">{usd(PILOT.price)}</p>
          <p className="mt-2 text-[14px] text-ink-muted">{PILOT.stores} locations for {PILOT.days} days, everything in Brand</p>
          <p className="mt-4 text-[15px] leading-relaxed text-body">Try it with real stores before you sign. If you continue, the full amount goes toward your setup.</p>
        </div>
        {/* Store */}
        <div className="bg-white p-7 md:p-9">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-display text-[22px] font-bold text-midnight">Single store</h3>
            <div className="inline-flex border border-line text-[12px]" role="group" aria-label="Billing">
              {[true, false].map((y) => (
                <button key={String(y)} onClick={() => setYearly(y)} aria-pressed={yearly === y} className={`min-h-8 px-3 ${yearly === y ? "bg-midnight font-semibold text-white" : "text-midnight"}`}>{y ? "Yearly" : "Monthly"}</button>
              ))}
            </div>
          </div>
          <p className="mt-3 font-display text-[44px] font-extralight leading-none text-midnight tabular">{yearly ? usd(STORE_YEARLY / 12) : usd(STORE_MONTHLY)}<span className="text-[18px] text-ink-muted"> /month</span></p>
          <p className="mt-2 text-[14px] text-ink-muted">{yearly ? `${usd(STORE_YEARLY)} billed yearly, two months free` : "Billed monthly, cancel anytime"}</p>
          <p className="mt-4 text-[15px] leading-relaxed text-body">For an owner without a brand team. Add your logo and colors, and get 16 posts and reels a month.</p>
          <a href="#walkthrough" onClick={() => track("cta", { where: "pricing_store" })} className="mt-5 inline-block text-[15px] font-semibold text-midnight underline">Join the store waitlist</a>
        </div>
        {/* Managed */}
        <div className="bg-cloud p-7 md:p-9">
          <h3 className="font-display text-[22px] font-bold text-midnight">With our team</h3>
          <p className="mt-3 text-[15px] leading-relaxed text-body">From $3,000 a month on top of Brand. Expertality plans the month and runs the content with your stores.</p>
        </div>
      </div>
    </div>
  );
}

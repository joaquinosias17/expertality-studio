import { Check } from "./Icons";
import { TrackedLink } from "./TrackedLink";
import { PLANS } from "@/lib/plans";

export function Pricing() {
  return (
    <div className="mt-12 grid gap-4 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
      <div className="rounded-3xl bg-midnight p-7 text-white md:p-10">
        <h3 className="font-display text-[24px] font-bold">One plan. Everything in it.</h3>
        <p className="mt-6 flex items-baseline gap-2"><span className="font-display text-[64px] font-extralight leading-none tabular">${PLANS.store}</span><span className="text-[16px] text-mist">a month for one store</span></p>
        <p className="mt-3 text-[15px] text-mist">Each extra store ${PLANS.extra} a month. First {PLANS.trialDays} days free, no card.</p>
        <ul className="mt-7 grid gap-2.5 text-[15px] sm:grid-cols-2">
          {["A new week of posts every Monday", "Reels made from your brand", "Instagram, Facebook, TikTok, Google", "English and Spanish", "Your franchise's rules built in", "Autopilot for busy weeks", "Results in calls and visits", "Cancel anytime"].map((x) => (
            <li key={x} className="flex gap-2.5"><Check className="mt-0.5 size-4 shrink-0 text-mist" />{x}</li>
          ))}
        </ul>
        <TrackedLink where="pricing_trial" href="/app/start" className="mt-8 inline-flex min-h-14 items-center rounded-xl bg-white px-7 text-[16px] font-semibold text-midnight shadow-[inset_0_-3px_0_var(--color-red)] transition-transform active:scale-[0.98]">Make my free week</TrackedLink>
      </div>
      <div className="grid gap-4">
        <div className="rounded-3xl border border-line p-7">
          <h3 className="font-display text-[20px] font-bold text-midnight">Done for you</h3>
          <p className="mt-2 font-display text-[36px] font-extralight leading-none text-midnight tabular">${PLANS.done}<span className="text-[16px] text-ink-muted"> /month</span></p>
          <p className="mt-3 text-[15px] leading-relaxed text-body">A person on our team checks your week, adds your photos and answers your questions. You still approve in one tap.</p>
        </div>
        <div className="rounded-3xl bg-cloud p-7">
          <h3 className="font-display text-[20px] font-bold text-midnight">Running the franchise brand?</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-body">Give every location the same tool, with your rules and templates set once.</p>
          <TrackedLink where="pricing_brand" href="#walkthrough" className="mt-4 inline-block text-[15px] font-semibold text-midnight underline underline-offset-4">Talk to us</TrackedLink>
        </div>
      </div>
    </div>
  );
}

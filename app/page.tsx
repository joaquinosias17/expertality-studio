import { SiteNav } from "@/components/SiteNav";
import { ReelPhone } from "@/components/ReelPhone";
import { RuleCheck } from "@/components/RuleCheck";
import { LeadForm } from "@/components/LeadForm";
import { TemplateCard } from "@/components/TemplateCard";
import { Pricing } from "@/components/Pricing";
import { Compare } from "@/components/Compare";
import { Faq } from "@/components/Faq";
import { StickyCta } from "@/components/StickyCta";
import { TrackedLink } from "@/components/TrackedLink";
import { Marquee } from "@/components/Marquee";
import { MondayFlow } from "@/components/MondayFlow";
import { Logo } from "@/components/Logo";
import { PHOTOS } from "@/lib/data";
import { PLANS } from "@/lib/plans";

const TEMPLATES = [
  { img: PHOTOS.latteArt, overlay: "Holiday menu is here", name: "New on the menu", meta: "Reel, 13 s" },
  { img: PHOTOS.croissants, overlay: "Fresh every morning", name: "Product spotlight", meta: "Reel, 10 s" },
  { img: PHOTOS.biscotti, overlay: "Gift cards for the list", name: "Offer", meta: "Post" },
  { img: PHOTOS.interior, overlay: "Open late Fridays", name: "Store hours", meta: "Story" },
];

const Rule = ({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) => (
  <div className="flex items-center gap-3"><span className="h-[2px] w-10 bg-red" /><span className={`text-[14px] font-semibold ${dark ? "text-white" : "text-midnight"}`}>{children}</span></div>
);

export default function Home() {
  return (
    <>
      <SiteNav />
      <main id="main">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="mx-auto grid max-w-[1240px] items-center gap-12 px-5 pb-16 pt-12 md:px-8 md:pb-24 md:pt-20 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
            <div>
              <Rule>For franchise owners</Rule>
              <h1 className="fade-up mt-6 max-w-[14ch] font-display text-[46px] font-bold leading-[1.02] tracking-[-0.02em] text-midnight sm:text-[64px] lg:text-[80px]">Your store&rsquo;s social media, done in a minute a week.</h1>
              <p className="fade-up mt-6 max-w-[46ch] text-[19px] leading-relaxed text-body" style={{ animationDelay: "120ms" }}>
                Every Monday your posts and reels are ready, in your brand and in English or Spanish. You approve them from your phone. We post them.
              </p>
              <div className="fade-up mt-8 flex flex-wrap items-center gap-4" style={{ animationDelay: "220ms" }}>
                <TrackedLink where="hero" href="/app/start" className="inline-flex min-h-14 items-center rounded-xl bg-midnight px-7 text-[17px] font-semibold text-white shadow-[inset_0_-3px_0_var(--color-red)] transition-transform duration-150 active:scale-[0.98]">Make my free week</TrackedLink>
                <p className="text-[14px] text-ink-muted">Free for {PLANS.trialDays} days. No card. Takes 1 minute.</p>
              </div>
            </div>
            <figure className="min-w-0">
              <ReelPhone />
              <figcaption className="mx-auto mt-4 max-w-[320px] text-[14px] text-ink-muted">A real reel the app made for a sample cafe. Tap Approve.</figcaption>
            </figure>
          </div>
          <svg aria-hidden="true" className="pointer-events-none absolute -left-40 -top-40 hidden size-[520px] text-line xl:block" viewBox="0 0 420 420" fill="none">
            <circle cx="210" cy="210" r="208" stroke="currentColor" className="draw" pathLength={1} /><circle cx="210" cy="210" r="140" stroke="currentColor" className="draw" pathLength={1} style={{ animationDelay: "150ms" }} /><circle cx="210" cy="210" r="72" stroke="#b4232f" strokeOpacity=".5" className="draw" pathLength={1} style={{ animationDelay: "300ms" }} />
          </svg>
        </section>

        <Marquee />

        {/* Monday flow */}
        <section id="how" className="scroll-mt-16">
          <div className="mx-auto max-w-[1240px] px-5 py-20 md:px-8 md:py-28">
            <div className="grid gap-6 md:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] md:gap-16">
              <h2 className="font-display text-[36px] font-bold leading-[1.06] text-midnight md:text-[48px]">Built for the owner who does it all.</h2>
              <p className="max-w-[50ch] text-[18px] leading-relaxed text-body md:pt-3">You run the store, the team and the numbers. Social media should not take your evenings. Here is your whole week with Studio.</p>
            </div>
            <MondayFlow />
          </div>
        </section>

        {/* Rules */}
        <section className="bg-midnight text-white">
          <div className="mx-auto max-w-[1240px] px-5 py-20 md:px-8 md:py-28">
            <div className="mb-12 grid gap-6 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
              <div>
                <Rule dark>Stay out of trouble with corporate</Rule>
                <h2 className="mt-5 font-display text-[34px] font-bold leading-[1.08] md:text-[44px]">It already knows your franchise&rsquo;s rules.</h2>
              </div>
              <p className="max-w-[52ch] text-[17px] leading-relaxed text-mist md:pt-12">We load your brand&rsquo;s guide once. Every post is checked before you see it, so you never get that email from the brand team again.</p>
            </div>
            <RuleCheck />
          </div>
        </section>

        {/* Reels without filming */}
        <section className="scroll-mt-16">
          <div className="mx-auto grid max-w-[1240px] gap-12 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-20">
            <div>
              <Rule>Reels without filming</Rule>
              <h2 className="mt-5 font-display text-[34px] font-bold leading-[1.08] text-midnight md:text-[42px]">No camera. No editing. No dancing.</h2>
              <p className="mt-6 text-[17px] leading-relaxed text-body">Reels are made from your brand&rsquo;s look, your products and a few words. Each one gets music that fits, cut to the beat. Add your own photos when you have them.</p>
            </div>
            <div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {TEMPLATES.map((t, i) => <div key={t.name} className={i % 2 ? "sm:mt-10" : ""}><TemplateCard {...t} /></div>)}
              </div>
              <p className="mt-6 text-[14px] text-ink-muted">Hover or tap a reel to play it.</p>
            </div>
          </div>
        </section>

        {/* Compare */}
        <section className="border-y border-line bg-cloud">
          <div className="mx-auto max-w-[1240px] px-5 py-20 md:px-8 md:py-28">
            <h2 className="max-w-[22ch] font-display text-[34px] font-bold leading-[1.08] text-midnight md:text-[42px]">Cheaper than help. Faster than doing it yourself.</h2>
            <div className="mt-12 bg-white"><Compare /></div>
            <p className="mt-4 text-[13px] text-ink-muted">Freelancer and app prices are typical published starting prices, November 2026.</p>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="scroll-mt-16">
          <div className="mx-auto max-w-[1240px] px-5 py-20 md:px-8 md:py-28">
            <h2 className="max-w-[20ch] font-display text-[34px] font-bold leading-[1.08] text-midnight md:text-[42px]">Try a full week free. Then ${PLANS.store} a month.</h2>
            <Pricing />
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-line">
          <div className="mx-auto grid max-w-[1240px] gap-10 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-20">
            <h2 className="font-display text-[34px] font-bold leading-[1.08] text-midnight md:text-[42px]">Questions owners ask first.</h2>
            <Faq />
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative overflow-hidden bg-midnight text-white">
          <div className="relative mx-auto max-w-[1240px] px-5 py-20 text-left md:px-8 md:py-28">
            <h2 className="max-w-[16ch] font-display text-[40px] font-bold leading-[1.04] md:text-[60px]">See your first week in one minute.</h2>
            <p className="mt-5 max-w-[46ch] text-[18px] leading-relaxed text-mist">Tell us your store&rsquo;s name and what you sell. Your posts appear on the next screen.</p>
            <TrackedLink where="final" href="/app/start" className="mt-8 inline-flex min-h-14 items-center rounded-xl bg-white px-7 text-[17px] font-semibold text-midnight shadow-[inset_0_-3px_0_var(--color-red)] transition-transform active:scale-[0.98]">Make my free week</TrackedLink>
          </div>
        </section>

        {/* Brands */}
        <section id="walkthrough" className="scroll-mt-16 bg-ink text-white">
          <div className="mx-auto grid max-w-[1240px] gap-12 px-5 py-16 md:px-8 md:py-20 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
            <div>
              <h2 className="font-display text-[28px] font-bold leading-[1.1] md:text-[34px]">Run the franchise brand? Give every owner the same tool.</h2>
              <p className="mt-4 max-w-[44ch] text-[16px] leading-relaxed text-mist">Your rules and templates, set once for every location. Ask for a 30-minute walkthrough.</p>
            </div>
            <LeadForm />
          </div>
        </section>
      </main>

      <footer className="bg-ink pb-24 text-mist md:pb-0">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center gap-x-8 gap-y-4 border-t border-midnight-raised px-5 py-10 text-[14px] md:px-8">
          <Logo dark />
          <a href="#pricing" className="hover:text-white">Pricing</a>
          <a href="/app/start" className="hover:text-white">Try it</a>
          <a href="https://www.expertality.com" className="hover:text-white">A product by Expertality</a>
          <span className="ml-auto tabular">© 2026</span>
        </div>
      </footer>
      <StickyCta />
    </>
  );
}

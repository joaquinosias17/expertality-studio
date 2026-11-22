import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import { BrandConsole } from "@/components/BrandConsole";
import { PhoneWeek } from "@/components/PhoneWeek";
import { ReelPhone } from "@/components/ReelPhone";
import { RuleCheck } from "@/components/RuleCheck";
import { LeadForm } from "@/components/LeadForm";
import { TemplateCard } from "@/components/TemplateCard";
import { Pricing } from "@/components/Pricing";
import { Compare } from "@/components/Compare";
import { Faq } from "@/components/Faq";
import { StickyCta } from "@/components/StickyCta";
import { TrackedLink } from "@/components/TrackedLink";
import { Logo } from "@/components/Logo";
import { PHOTOS } from "@/lib/data";

const TEMPLATES = [
  { img: PHOTOS.latteArt, overlay: "Holiday menu is here", name: "Seasonal launch", meta: "Reel, 13 s" },
  { img: PHOTOS.croissants, overlay: "Fresh every morning", name: "Product spotlight", meta: "Reel, 10 s" },
  { img: PHOTOS.biscotti, overlay: "Gift cards for the list", name: "Offer", meta: "Post, 4:5" },
  { img: PHOTOS.interior, overlay: "Open late Fridays", name: "Store hours", meta: "Story, 9:16" },
];

const SETUP = [
  { week: "Week 1", title: "Your guide becomes rules", body: "Send the brand guide you already have. We turn each rule into a check, with the page it came from, and you confirm the list." },
  { week: "Week 2", title: "You approve the templates", body: "We build 5 to 8 motion templates from your own assets and pick music moods. Nothing reaches a store until you sign off." },
  { week: "Week 3", title: "Stores go live", body: "Each location connects its accounts in a few taps and gets its first week ready to approve. We train your team in one call." },
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
          <div className="mx-auto max-w-[1240px] px-5 pb-12 pt-12 md:px-8 md:pb-20 md:pt-20">
            <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
              <h1 className="max-w-[15ch] font-display text-[44px] font-bold leading-[1.02] tracking-[-0.02em] text-midnight sm:text-[60px] lg:text-[76px]">
                Every location posts on brand. Every week.
              </h1>
              <div>
                <p className="max-w-[44ch] text-[18px] leading-relaxed text-body">
                  Your brand sets the rules once. Each store gets a ready week of reels and posts, checked against your brand guide, and approves it from their phone.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <TrackedLink where="hero" href="#walkthrough" className="inline-flex min-h-12 items-center rounded-sm bg-midnight px-6 text-[15px] font-semibold text-white shadow-[inset_0_-3px_0_var(--color-red)] transition-transform duration-150 active:scale-[0.98]">Book a walkthrough</TrackedLink>
                  <TrackedLink where="hero_demo" href="/app" className="inline-flex min-h-12 items-center rounded-sm border border-mist px-6 text-[15px] font-semibold text-midnight hover:border-midnight">Try the demo</TrackedLink>
                </div>
              </div>
            </div>

            <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-[minmax(0,7fr)_56px_minmax(0,5fr)] lg:gap-0">
              <figure className="order-3 min-w-0 lg:order-1">
                <div className="border border-line bg-white shadow-[0_30px_60px_-40px_rgba(15,26,48,0.5)]"><BrandConsole stacked /></div>
                <figcaption className="mt-4 text-[14px] text-ink-muted"><b className="font-semibold text-midnight">The brand team sees</b> one calendar for every location, and only the posts that need them.</figcaption>
              </figure>
              <div aria-hidden="true" className="relative order-2 hidden lg:block">
                <span className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 bg-red" />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap bg-white px-3 text-[12px] font-semibold text-midnight">One set of rules</span>
              </div>
              <figure className="order-1 min-w-0 lg:order-3 lg:pl-4">
                <ReelPhone />
                <figcaption className="mx-auto mt-4 max-w-[320px] text-[14px] text-ink-muted"><b className="font-semibold text-midnight">The store owner sees</b> a finished reel, ready to approve. Try it.</figcaption>
              </figure>
            </div>
            <p className="mt-10 text-[12px] text-ink-muted">Mesa Coffee Co. is a sample brand. Photos from Unsplash.</p>
          </div>
          <svg aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 hidden size-[420px] text-line xl:block" viewBox="0 0 420 420" fill="none">
            <circle cx="210" cy="210" r="208" stroke="currentColor" /><circle cx="210" cy="210" r="140" stroke="currentColor" /><circle cx="210" cy="210" r="72" stroke="#b4232f" strokeOpacity=".5" />
          </svg>
        </section>

        {/* Facts strip */}
        <section className="border-y border-line bg-cloud">
          <div className="mx-auto grid max-w-[1240px] gap-x-10 gap-y-5 px-5 py-8 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:px-8">
            <p className="text-[16px] font-semibold leading-snug text-midnight">Built by people who ran local content for more than 600 franchise locations.</p>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2 text-[14px] text-body sm:grid-cols-4">
              <li>Instagram, Facebook, TikTok and Google</li><li>English and Spanish</li><li>No people on camera</li><li>Licensed music</li>
            </ul>
          </div>
        </section>

        {/* Rules */}
        <section className="bg-midnight text-white">
          <div className="mx-auto max-w-[1240px] px-5 py-20 md:px-8 md:py-28">
            <div className="mb-12 grid gap-6 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
              <h2 className="font-display text-[34px] font-bold leading-[1.08] md:text-[44px]">Your brand guide, read on every post.</h2>
              <p className="max-w-[52ch] text-[17px] leading-relaxed text-mist md:pt-2">Each rule in your guide becomes a check the app runs before anything reaches a store owner. It fixes what it can, and sends you only what needs a person.</p>
            </div>
            <RuleCheck />
          </div>
        </section>

        {/* Brand teams */}
        <section id="brands" className="scroll-mt-16">
          <div className="mx-auto grid max-w-[1240px] gap-12 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-20">
            <div>
              <Rule>For brand teams</Rule>
              <h2 className="mt-5 font-display text-[34px] font-bold leading-[1.08] text-midnight md:text-[42px]">Set it up once. Review only what matters.</h2>
              <ul className="mt-8 space-y-5 text-[16px] leading-relaxed text-body">
                <li><b className="text-midnight">Templates you approve.</b> Stores build only from motion templates you signed off on, made from your own assets.</li>
                <li><b className="text-midnight">Approvals by exception.</b> Offers, partner names and anything off-script come to you. The rest goes live on its own.</li>
                <li><b className="text-midnight">Every location visible.</b> See who posted, who is behind, and what is working, in one calendar and one monthly report.</li>
              </ul>
            </div>
            <div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {TEMPLATES.map((t, i) => <div key={t.name} className={i % 2 ? "sm:mt-10" : ""}><TemplateCard {...t} /></div>)}
              </div>
              <p className="mt-8 text-[14px] text-ink-muted">Hover a template to preview it. Yours are built from your guide during setup.</p>
            </div>
          </div>
        </section>

        {/* Store owners */}
        <section id="stores" className="scroll-mt-16 bg-cloud">
          <div className="mx-auto grid max-w-[1240px] items-center gap-12 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
            <div className="relative order-2 lg:order-1">
              <div className="relative"><PhoneWeek /></div>
            </div>
            <div className="order-1 lg:order-2">
              <Rule>For store owners</Rule>
              <h2 className="mt-5 font-display text-[34px] font-bold leading-[1.08] text-midnight md:text-[42px]">Your week, ready before Monday.</h2>
              <p className="mt-6 max-w-[52ch] text-[17px] leading-relaxed text-body">Brand campaigns, your local news and the everyday posts arrive as one week. Approve it all in a minute, or type something that is happening at your store and get the reel back.</p>
              <ol className="mt-8 border-t border-line">
                {["Open the week on your phone", "Approve, or tap Edit to change a line", "Type a local idea, in English or Spanish", "It posts at the best time for your store"].map((s, i) => (
                  <li key={s} className="flex items-baseline gap-5 border-b border-line py-4">
                    <span className="font-display text-[30px] font-extralight leading-none text-midnight tabular">{i + 1}</span>
                    <span className="text-[16px] text-ink">{s}</span>
                  </li>
                ))}
              </ol>
              <Link href="/app/create" className="mt-8 inline-flex min-h-12 items-center rounded-sm border border-midnight px-6 text-[15px] font-semibold text-midnight hover:bg-midnight hover:text-white">Try making a post</Link>
            </div>
          </div>
        </section>

        {/* Setup */}
        <section className="border-b border-line">
          <div className="mx-auto max-w-[1240px] px-5 py-20 md:px-8 md:py-28">
            <div className="grid gap-6 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
              <h2 className="font-display text-[34px] font-bold leading-[1.08] text-midnight md:text-[42px]">Live in three weeks. We do the setup with you.</h2>
              <p className="max-w-[52ch] text-[17px] leading-relaxed text-body md:pt-2">No migration project and no agency brief. You send the guide, approve what we build, and your stores start posting.</p>
            </div>
            <ol className="mt-14 grid gap-px bg-line md:grid-cols-3">
              {SETUP.map((s) => (
                <li key={s.week} className="bg-white pr-6 pt-6 md:pr-10">
                  <span className="block h-[2px] w-full bg-midnight" />
                  <p className="mt-5 text-[14px] font-semibold text-red">{s.week}</p>
                  <h3 className="mt-2 font-display text-[22px] font-bold text-midnight">{s.title}</h3>
                  <p className="mt-3 max-w-[38ch] pb-2 text-[16px] leading-relaxed text-body">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Compare */}
        <section className="border-b border-line">
          <div className="mx-auto max-w-[1240px] px-5 py-20 md:px-8 md:py-28">
            <h2 className="max-w-[22ch] font-display text-[34px] font-bold leading-[1.08] text-midnight md:text-[42px]">What you would use instead, and what it leaves out.</h2>
            <div className="mt-12"><Compare /></div>
            <p className="mt-4 text-[13px] text-ink-muted">Agency figure: published starter retainers for one account, November 2026. Tool prices vary by plan.</p>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="scroll-mt-16 border-b border-line">
          <div className="mx-auto max-w-[1240px] px-5 py-20 md:px-8 md:py-28">
            <div className="grid gap-6 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
              <h2 className="font-display text-[34px] font-bold leading-[1.08] text-midnight md:text-[42px]">Priced per location. A fraction of an agency.</h2>
              <p className="max-w-[52ch] text-[17px] leading-relaxed text-body md:pt-2">Move the slider to your number of locations. Every plan includes the templates, the music, the checks and unlimited users.</p>
            </div>
            <Pricing />
          </div>
        </section>

        {/* FAQ */}
        <section className="border-b border-line">
          <div className="mx-auto grid max-w-[1240px] gap-10 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-20">
            <div>
              <h2 className="font-display text-[34px] font-bold leading-[1.08] text-midnight md:text-[42px]">Questions brands ask first.</h2>
              <p className="mt-5 text-[16px] leading-relaxed text-body">Something else? Ask it on the walkthrough.</p>
            </div>
            <Faq />
          </div>
        </section>

        {/* Close */}
        <section id="walkthrough" className="relative scroll-mt-16 overflow-hidden bg-midnight text-white">
          <svg aria-hidden="true" className="pointer-events-none absolute -bottom-40 -left-40 size-[520px] text-midnight-raised" viewBox="0 0 520 520" fill="none">
            <circle cx="260" cy="260" r="258" stroke="currentColor" /><circle cx="260" cy="260" r="180" stroke="currentColor" /><circle cx="260" cy="260" r="100" stroke="#b4232f" strokeOpacity=".6" />
          </svg>
          <div className="relative mx-auto grid max-w-[1240px] gap-12 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
            <div>
              <h2 className="font-display text-[34px] font-bold leading-[1.08] md:text-[44px]">See a week of posts for one of your stores.</h2>
              <p className="mt-5 max-w-[42ch] text-[17px] leading-relaxed text-mist">Send your brand guide ahead of a 30-minute call. We show you real reels and posts for one of your locations, made by the app.</p>
              <ul className="mt-8 space-y-2 text-[15px] text-mist">
                <li>Reply within one business day</li>
                <li>Pilot available: {`10 locations, 60 days`}</li>
              </ul>
            </div>
            <LeadForm />
          </div>
        </section>
      </main>

      <footer className="bg-ink pb-24 text-mist md:pb-0">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center gap-x-8 gap-y-4 px-5 py-10 text-[14px] md:px-8">
          <Logo dark />
          <a href="#pricing" className="hover:text-white">Pricing</a>
          <Link href="/app" className="hover:text-white">Demo</Link>
          <a href="https://www.expertality.com" className="hover:text-white">A product by Expertality</a>
          <span className="ml-auto tabular">© 2026</span>
        </div>
      </footer>
      <StickyCta />
    </>
  );
}

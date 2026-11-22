import Image from "next/image";
import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import { BrandConsole } from "@/components/BrandConsole";
import { PhoneWeek } from "@/components/PhoneWeek";
import { RuleCheck } from "@/components/RuleCheck";
import { LeadForm } from "@/components/LeadForm";
import { PostThumb } from "@/components/PostThumb";
import { Logo } from "@/components/Logo";
import { Check } from "@/components/Icons";
import { PHOTOS, photo } from "@/lib/data";

const TEMPLATES = [
  { img: PHOTOS.flatlay, overlay: "Holiday menu is here", name: "Seasonal launch", meta: "Reel, 15 s" },
  { img: PHOTOS.counter, overlay: "New at the counter", name: "Product drop", meta: "Reel, 12 s" },
  { img: PHOTOS.biscotti, overlay: "Gift cards for the list", name: "Offer", meta: "Post, 4:5" },
  { img: PHOTOS.interior, overlay: "Open late Fridays", name: "Store hours", meta: "Story, 9:16" },
];

export default function Home() {
  return (
    <>
      <SiteNav />
      <main id="main">
        {/* Hero: one headline, then the two sides joined by the rules */}
        <section className="relative overflow-hidden border-b border-line">
          <div className="mx-auto max-w-[1240px] px-5 pb-16 pt-14 md:px-8 md:pb-24 md:pt-20">
            <h1 className="max-w-[16ch] font-display text-[44px] font-bold leading-[1.02] tracking-[-0.02em] text-midnight sm:text-[60px] lg:text-[76px]">
              Every location posts on brand. Every week.
            </h1>
            <div className="mt-7 flex flex-wrap items-end gap-x-12 gap-y-6">
              <p className="max-w-[46ch] text-[18px] leading-relaxed text-body">
                Brand teams set the rules once. Store owners get a ready week of posts and reels to approve from their phone. The app writes, builds and checks every piece against your brand guide.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#walkthrough" className="inline-flex min-h-12 items-center rounded-sm bg-midnight px-6 text-[15px] font-semibold text-white shadow-[inset_0_-3px_0_var(--color-red)] transition-transform duration-150 active:scale-[0.98]">Book a walkthrough</a>
                <Link href="/app" className="inline-flex min-h-12 items-center rounded-sm border border-mist px-6 text-[15px] font-semibold text-midnight hover:border-midnight">Open the demo</Link>
              </div>
            </div>

            <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-[minmax(0,7fr)_56px_minmax(0,5fr)] lg:gap-0">
              <figure>
                <div className="border border-line shadow-[0_30px_60px_-40px_rgba(15,26,48,0.5)]"><BrandConsole stacked /></div>
                <figcaption className="mt-4 flex items-baseline gap-3 text-[14px] text-ink-muted">
                  <b className="font-semibold text-midnight">For brand teams</b> One calendar for every location, and only the posts that need you.
                </figcaption>
              </figure>

              <div aria-hidden="true" className="relative hidden lg:block">
                <span className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 bg-red" />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap bg-white px-3 text-[12px] font-semibold text-midnight">One set of rules</span>
              </div>
              <div aria-hidden="true" className="flex items-center gap-3 lg:hidden">
                <span className="h-[2px] flex-1 bg-red" /><span className="text-[12px] font-semibold text-midnight">One set of rules</span><span className="h-[2px] flex-1 bg-red" />
              </div>

              <figure className="lg:pl-4">
                <PhoneWeek />
                <figcaption className="mx-auto mt-4 flex max-w-[340px] items-baseline gap-3 text-[14px] text-ink-muted">
                  <b className="shrink-0 font-semibold text-midnight">For store owners</b> Your week, ready. Approve it in a minute.
                </figcaption>
              </figure>
            </div>
            <p className="mt-10 text-[12px] text-ink-muted">Mesa Coffee Co. is a sample brand. Photos from Unsplash.</p>
          </div>
          {/* target lines from the corner */}
          <svg aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 hidden size-[420px] text-line xl:block" viewBox="0 0 420 420" fill="none">
            <circle cx="210" cy="210" r="208" stroke="currentColor" /><circle cx="210" cy="210" r="140" stroke="currentColor" /><circle cx="210" cy="210" r="72" stroke="#b4232f" strokeOpacity=".5" />
          </svg>
        </section>

        {/* The rules, working */}
        <section className="bg-midnight text-white">
          <div className="mx-auto max-w-[1240px] px-5 py-20 md:px-8 md:py-28">
            <div className="mb-12 grid gap-6 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
              <h2 className="font-display text-[34px] font-bold leading-[1.08] md:text-[44px]">Your brand guide, read on every post.</h2>
              <p className="max-w-[52ch] text-[17px] leading-relaxed text-mist md:pt-2">Upload the guide you already have. Each rule becomes a check the app runs before anything reaches a store owner, with the page it came from, so nobody argues about it.</p>
            </div>
            <RuleCheck />
          </div>
        </section>

        {/* For brand teams */}
        <section id="brands" className="scroll-mt-16 border-b border-line">
          <div className="mx-auto max-w-[1240px] px-5 py-20 md:px-8 md:py-28">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-20">
              <div>
                <div className="flex items-center gap-3"><span className="h-[2px] w-10 bg-red" /><span className="text-[14px] font-semibold text-midnight">For brand teams</span></div>
                <h2 className="mt-5 font-display text-[34px] font-bold leading-[1.08] text-midnight md:text-[42px]">Set it up once. Review only what matters.</h2>
                <ul className="mt-8 space-y-5 text-[16px] leading-relaxed text-body">
                  <li><b className="text-midnight">Brand kit.</b> Logo, colors, type, music moods, and the rules from your guide, all in one place.</li>
                  <li><b className="text-midnight">Templates you approve.</b> Stores only build from motion templates you signed off on. No people on camera, just your brand moving well.</li>
                  <li><b className="text-midnight">Approvals by exception.</b> Offers, partners and anything off-script come to you. The rest goes live.</li>
                  <li><b className="text-midnight">One report.</b> What every location posted, and how it did.</li>
                </ul>
              </div>
              <div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {TEMPLATES.map((t, i) => (
                    <figure key={t.name} className={i % 2 ? "sm:mt-10" : ""}>
                      <PostThumb img={t.img} overlay={t.overlay} size="md" sizes="(min-width: 640px) 220px, 45vw" />
                      <figcaption className="mt-2.5 text-[14px] font-semibold text-midnight">{t.name}<span className="block text-[13px] font-normal text-ink-muted">{t.meta}</span></figcaption>
                    </figure>
                  ))}
                </div>
                <p className="mt-8 text-[14px] text-ink-muted">Templates for the sample brand. Yours are built from your guide during setup.</p>
              </div>
            </div>
          </div>
        </section>

        {/* For store owners */}
        <section id="stores" className="scroll-mt-16 bg-cloud">
          <div className="mx-auto grid max-w-[1240px] gap-12 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-20">
            <div className="relative order-2 aspect-[4/3] overflow-hidden lg:order-1">
              <Image src={photo(PHOTOS.interior, 1400)} alt="A coffee shop with customers at the counter" fill sizes="(min-width: 1024px) 700px, 100vw" className="object-cover" />
              <div className="absolute bottom-4 left-4 right-4 max-w-[340px] bg-white p-4 shadow-[0_20px_40px_-24px_rgba(15,26,48,0.6)] sm:right-auto">
                <p className="text-[12px] text-ink-muted">Your idea</p>
                <p className="mt-1 text-[15px] font-semibold text-ink">“Live music this Thursday, 7 pm”</p>
                <p className="mt-3 flex items-center gap-1.5 text-[13px] text-midnight"><Check className="size-4" />Reel drafted, music picked, checked</p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-3"><span className="h-[2px] w-10 bg-red" /><span className="text-[14px] font-semibold text-midnight">For store owners</span></div>
              <h2 className="mt-5 font-display text-[34px] font-bold leading-[1.08] text-midnight md:text-[42px]">Type the idea. Get the post.</h2>
              <p className="mt-6 text-[17px] leading-relaxed text-body">Tell the app what is happening at your store, in English or Spanish. It suggests the post, builds the reel from your brand’s templates, and schedules it. You tap approve.</p>
              <ol className="mt-8 border-t border-line">
                {["Write the idea, or pick one the app suggests", "Review the draft on your phone", "Approve. It posts at the best time"].map((s, i) => (
                  <li key={s} className="flex items-baseline gap-5 border-b border-line py-4">
                    <span className="font-display text-[30px] font-extralight leading-none text-midnight tabular">{i + 1}</span>
                    <span className="text-[16px] text-ink">{s}</span>
                  </li>
                ))}
              </ol>
              <Link href="/app/week" className="mt-8 inline-flex min-h-12 items-center rounded-sm border border-midnight px-6 text-[15px] font-semibold text-midnight hover:bg-midnight hover:text-white">See the store view</Link>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="scroll-mt-16 border-b border-line">
          <div className="mx-auto max-w-[1240px] px-5 py-20 md:px-8 md:py-28">
            <h2 className="max-w-[20ch] font-display text-[34px] font-bold leading-[1.08] text-midnight md:text-[42px]">Priced per location. Setup is done with you.</h2>
            <div className="mt-12 grid border border-line md:grid-cols-[minmax(0,5fr)_minmax(0,4fr)_minmax(0,3fr)]">
              <div className="bg-midnight p-7 text-white md:p-9">
                <p className="text-[15px] font-semibold text-mist">Brand</p>
                <p className="mt-3 font-display text-[56px] font-extralight leading-none tabular">[PRICE]</p>
                <p className="mt-2 text-[14px] text-mist">per location, per month</p>
                <ul className="mt-7 space-y-2.5 text-[15px]">
                  {["Brand kit and rule checks", "Approved motion templates", "Calendar for every location", "Approvals by exception", "Reports for the brand team"].map((x) => <li key={x} className="flex gap-2.5"><Check className="mt-0.5 size-4 shrink-0 text-mist" />{x}</li>)}
                </ul>
                <p className="mt-7 border-t border-midnight-raised pt-5 text-[14px] text-mist">One-time setup from [SETUP]: we turn your guide into rules and build your first templates.</p>
              </div>
              <div className="border-t border-line p-7 md:border-l md:border-t-0 md:p-9">
                <p className="text-[15px] font-semibold text-ink-muted">Single store</p>
                <p className="mt-3 font-display text-[56px] font-extralight leading-none text-midnight tabular">[PRICE]</p>
                <p className="mt-2 text-[14px] text-ink-muted">per month</p>
                <p className="mt-7 text-[15px] leading-relaxed text-body">For an owner who wants the app without a brand team behind it. Upload your logo and colors and start.</p>
              </div>
              <div className="border-t border-line bg-cloud p-7 md:border-l md:border-t-0 md:p-9">
                <p className="text-[15px] font-semibold text-ink-muted">With our team</p>
                <p className="mt-3 text-[15px] leading-relaxed text-body">Want people running it for you? Expertality plans and runs the content with your stores.</p>
                <a href="#walkthrough" className="mt-6 inline-block text-[15px] font-semibold text-midnight underline">Talk to us</a>
              </div>
            </div>
          </div>
        </section>

        {/* Close */}
        <section id="walkthrough" className="relative scroll-mt-16 overflow-hidden bg-midnight text-white">
          <svg aria-hidden="true" className="pointer-events-none absolute -bottom-40 -left-40 size-[520px] text-midnight-raised" viewBox="0 0 520 520" fill="none">
            <circle cx="260" cy="260" r="258" stroke="currentColor" /><circle cx="260" cy="260" r="180" stroke="currentColor" /><circle cx="260" cy="260" r="100" stroke="#b4232f" strokeOpacity=".6" />
          </svg>
          <div className="relative mx-auto grid max-w-[1240px] gap-12 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
            <div>
              <h2 className="font-display text-[34px] font-bold leading-[1.08] md:text-[44px]">See it with your own brand guide.</h2>
              <p className="mt-5 max-w-[42ch] text-[17px] leading-relaxed text-mist">A 30 minute walkthrough. Send your guide ahead and we show you a week of posts for one of your locations.</p>
            </div>
            <LeadForm />
          </div>
        </section>
      </main>

      <footer className="bg-ink text-mist">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center gap-x-8 gap-y-4 px-5 py-10 text-[14px] md:px-8">
          <Logo dark />
          <span>A product by Expertality</span>
          <span className="ml-auto tabular">© 2026</span>
        </div>
      </footer>
    </>
  );
}

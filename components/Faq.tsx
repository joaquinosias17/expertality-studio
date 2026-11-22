const QA = [
  { q: "Do store owners need to learn a new tool?", a: "No. They get one screen on their phone with the week ready. They tap approve, or type an idea in plain words. There is no editor to learn." },
  { q: "What stops a store from posting something off-brand?", a: "Stores only build from templates your team approved, and every draft is checked against your brand guide before anyone sees it. Offers, partner names and anything off-script come to you first." },
  { q: "Do the videos need people on camera?", a: "No. Reels are motion graphics made from your brand assets, product photos and type. A store can add its own photos when it wants to." },
  { q: "Where does the music come from?", a: "From a licensed library. Each video gets a track that fits its type and length, cut on the beat. Your brand can lock a set of moods." },
  { q: "Which networks does it post to?", a: "Instagram, Facebook, TikTok and Google Business Profile, on the schedule each location approves." },
  { q: "Does it work in Spanish?", a: "Yes. Every post can go out in English, Spanish or both, using your official menu and product names in each language." },
  { q: "How long does setup take?", a: "The plan is three weeks: we turn your guide into rules in week one, you approve the templates in week two, and stores go live in week three." },
  { q: "Who pays, the brand or each franchisee?", a: "Either. We can bill the brand, for example from the ad fund, or bill each location directly." },
  { q: "Do we have to sign for a year?", a: "Brand is billed yearly. If you want to test first, the 60-day pilot covers 10 locations, and what you pay goes toward setup." },
];

export function Faq() {
  return (
    <div className="divide-y divide-line border-y border-line">
      {QA.map((x) => (
        <details key={x.q} className="group py-1">
          <summary className="flex min-h-14 items-center justify-between gap-6 py-3 text-[17px] font-semibold text-ink">
            {x.q}
            <svg aria-hidden="true" viewBox="0 0 24 24" className="faq-plus size-5 shrink-0 text-midnight transition-transform duration-200"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.5" fill="none" /></svg>
          </summary>
          <p className="max-w-[64ch] pb-5 text-[16px] leading-relaxed text-body">{x.a}</p>
        </details>
      ))}
    </div>
  );
}

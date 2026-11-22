const QA = [
  { q: "I am not good with technology. Can I use this?", a: "Yes. It is one screen on your phone. Each Monday your posts are ready, and you tap Approve. If you want to change something, you type it in plain words." },
  { q: "Will it follow my franchise's rules?", a: "That is the point. We load your brand's rules and colors once, and every post is checked against them before you see it. Offers get the right fine print." },
  { q: "Do I need to film videos or be on camera?", a: "No. Reels are made from your brand's look, your products and short text. You can add your own photos whenever you want." },
  { q: "What if I forget to approve?", a: "Turn on Autopilot and safe posts go out on their own. Your page never sits empty." },
  { q: "Where does it post?", a: "Instagram, Facebook, TikTok and your Google Business Profile, at the best time for your store." },
  { q: "Can it post in Spanish?", a: "Yes. Each post can go out in English, Spanish or both." },
  { q: "Do I need a credit card for the free trial?", a: "No. You get 14 days and your first week of posts for free. You only pay if you keep going." },
  { q: "Can I cancel?", a: "Anytime, from the app. Your posts and photos stay yours." },
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

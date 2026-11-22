import { BrandReel } from "./owner/BrandReel";
import { LOOKS, BLANK_BRAND } from "@/lib/brand";
import { PHOTOS } from "@/lib/data";

const cafe = { ...BLANK_BRAND("Sunrise Cafe", "Coffee and pastries", "Austin, TX", LOOKS[1]), photos: [PHOTOS.croissants], mark: ["SUNRISE CAFE", ""] as [string, string] };

// Three moments of an owner's week, drawn with the real app parts.
export function MondayFlow() {
  return (
    <ol className="mt-14 grid gap-6 md:grid-cols-3">
      <li className="rounded-3xl bg-cloud p-6">
        <p className="text-[14px] font-semibold text-red">Monday, 8:00 AM</p>
        <h3 className="mt-2 font-display text-[22px] font-bold text-midnight">A message: your week is ready</h3>
        <div className="mt-6 space-y-2">
          <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white p-3.5 text-[15px] leading-snug text-ink shadow-sm">Good morning! Your 4 posts for this week are ready. Tap to see them.</div>
          <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white p-3 shadow-sm">
            <div className="aspect-[4/5] overflow-hidden rounded-xl"><BrandReel brand={cafe} post={{ hook: ["Small Business", "Saturday"], cta: "Stop by Saturday", format: "Reel" }} /></div>
          </div>
          <div className="ml-auto w-fit rounded-2xl rounded-tr-sm bg-midnight px-4 py-2.5 text-[15px] font-semibold text-white">Approve all</div>
        </div>
      </li>
      <li className="rounded-3xl bg-cloud p-6">
        <p className="text-[14px] font-semibold text-red">All week</p>
        <h3 className="mt-2 font-display text-[22px] font-bold text-midnight">We post at the right time</h3>
        <ul className="mt-6 space-y-2">
          {[["Mon", "8:00 AM", "Reel", "Holiday menu is here"], ["Wed", "11:00 AM", "Post", "Gift cards for the list"], ["Fri", "7:00 AM", "Google post", "Open early Friday"], ["Sat", "9:00 AM", "Reel", "Small Business Saturday"]].map(([d, t, f, h]) => (
            <li key={d} className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm">
              <span className="w-10 shrink-0 text-center"><b className="block text-[14px] text-midnight">{d}</b><span className="text-[11px] text-ink-muted tabular">{t}</span></span>
              <span className="min-w-0 flex-1"><span className="block truncate text-[15px] font-semibold text-ink">{h}</span><span className="text-[13px] text-ink-muted">{f}</span></span>
              <svg viewBox="0 0 24 24" className="size-5 shrink-0 text-midnight" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7" /></svg>
            </li>
          ))}
        </ul>
      </li>
      <li className="rounded-3xl bg-midnight p-6 text-white">
        <p className="text-[14px] font-semibold text-mist">Every Friday</p>
        <h3 className="mt-2 font-display text-[22px] font-bold">You see what it brought in</h3>
        <dl className="mt-6 grid grid-cols-2 gap-3">
          {[["Calls from Google", "7"], ["Asked for directions", "12"], ["People reached", "960"], ["Posts on time", "4 of 4"]].map(([l, v]) => (
            <div key={l} className="rounded-xl bg-midnight-raised p-3.5"><dt className="text-[13px] text-mist">{l}</dt><dd className="mt-1 font-display text-[30px] font-extralight leading-none tabular">{v}</dd></div>
          ))}
        </dl>
        <p className="mt-3 text-[13px] text-mist">Example numbers.</p>
      </li>
    </ol>
  );
}

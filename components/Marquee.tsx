// One kinetic band of real local moments the app plans for. Pauses for reduced motion and on hover.
const ITEMS = ["Small Business Saturday", "Open late Friday", "New on the menu", "Thanksgiving hours", "Back to school", "Rainy day special", "Thank you, regulars", "Holiday gift cards", "Game day", "Grand reopening", "Tip of the week", "Día de los Muertos"];
export function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="group relative overflow-hidden border-y border-line bg-white py-5" aria-label="Moments the app plans for">
      <div className="marquee flex w-max gap-3 group-hover:[animation-play-state:paused]">
        {row.map((x, i) => (
          <span key={i} aria-hidden={i >= ITEMS.length} className="whitespace-nowrap rounded-full border border-line px-5 py-2.5 text-[16px] font-semibold text-midnight">{x}</span>
        ))}
      </div>
      <span className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white" /><span className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white" />
    </div>
  );
}

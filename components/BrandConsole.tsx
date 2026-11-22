"use client";
import { useState } from "react";
import { Check, Flag } from "./Icons";

const DAYS = ["Mon 1", "Tue 2", "Wed 3", "Thu 4", "Fri 5", "Sat 6", "Sun 7"];
const LOCAL = [
  { col: 2, store: "Austin, South Congress", what: "School fundraiser" },
  { col: 4, store: "Miami, Brickell", what: "Live music night" },
  { col: 5, store: "Denver, Highlands", what: "Weekend hours" },
];
const ALWAYS = [{ col: 3, what: "Catering orders" }, { col: 6, what: "Loyalty app" }];
const QUEUE = [
  { id: "q1", store: "Miami, Brickell", lang: "Spanish", title: "2x1 en bebidas de temporada*", why: "Offer wording needs approval. Asterisk and disclaimer added." },
  { id: "q2", store: "Austin, South Congress", lang: "English", title: "School fundraiser Tuesday", why: "Names a partner school." },
];

export function BrandConsole({ compact = false, stacked = false }: { compact?: boolean; stacked?: boolean }) {
  const [done, setDone] = useState<Record<string, "ok" | "change">>({});
  const open = QUEUE.filter((q) => !done[q.id]).length;
  return (
    <div className="bg-white text-ink">
      <div className="flex flex-wrap items-end gap-3 border-b border-line px-5 py-4">
        <div>
          <p className="text-[12px] font-semibold text-ink-muted">Mesa Coffee Co. · 40 locations</p>
          <p className="font-display text-[22px] font-bold leading-tight text-midnight">December 1 to 7</p>
        </div>
        <p className="ml-auto text-[13px] text-ink-muted tabular"><span className="font-semibold text-midnight">38 of 40</span> locations approved</p>
      </div>
      <div className={`grid ${compact || stacked ? "" : "lg:grid-cols-[minmax(0,1fr)_280px]"}`}>
        <div className="overflow-x-auto">
          <div className="grid min-w-[620px] grid-cols-[104px_repeat(7,minmax(0,1fr))] text-[12px]">
            <span />
            {DAYS.map((d) => <span key={d} className="px-2 py-2.5 font-semibold tabular">{d}</span>)}
            <Lane label="Brand campaigns" note="Set by corporate" />
            <div className="col-span-5 border-t border-line p-1.5"><div className="bg-midnight px-2.5 py-2 text-white"><b>Holiday menu</b> · Reel and post, all locations</div></div>
            <div className="col-span-2 border-t border-line p-1.5"><div className="bg-midnight-raised px-2.5 py-2 text-white"><b>Gift cards</b> · Post</div></div>
            <Lane label="Local moments" note="Added by stores" />
            {DAYS.map((_, i) => {
              const l = LOCAL.find((x) => x.col === i + 1);
              return <div key={i} className="border-t border-line p-1.5">{l && <div className="bg-cloud px-2 py-1.5 leading-tight"><b className="block">{l.store.split(",")[0]}</b>{l.what}</div>}</div>;
            })}
            <Lane label="Always on" note="Filled by the app" />
            {DAYS.map((_, i) => {
              const a = ALWAYS.find((x) => x.col === i + 1);
              return <div key={i} className="border-t border-line p-1.5">{a && <div className="border border-line px-2 py-1.5 leading-tight">{a.what}</div>}</div>;
            })}
          </div>
        </div>
        {!compact && (
          <aside className={`border-t border-line p-4 ${stacked ? "" : "lg:border-l lg:border-t-0"}`}>
            <p className="text-[12px] font-semibold text-ink-muted">Needs your approval <span className="tabular text-red">{open || ""}</span></p>
            <ul className={`mt-3 ${stacked ? "grid gap-3 sm:grid-cols-2" : "space-y-3"}`}>
              {QUEUE.map((q) => (
                <li key={q.id} className={`border p-3 ${done[q.id] ? "border-line opacity-70" : "border-midnight"}`}>
                  <p className="text-[11px] text-ink-muted">{q.store} · {q.lang}</p>
                  <p className="mt-1 text-[14px] font-semibold leading-snug">{q.title}</p>
                  <p className="mt-1 text-[12px] leading-snug text-ink-muted">{q.why}</p>
                  {done[q.id] ? (
                    <p className="mt-2 flex items-center gap-1.5 text-[12px] font-semibold text-midnight">
                      {done[q.id] === "ok" ? <><Check className="size-4" />Approved, scheduled</> : <><Flag className="size-4" />Sent back to the store</>}
                    </p>
                  ) : (
                    <div className="mt-2.5 flex gap-2">
                      <button onClick={() => setDone((d) => ({ ...d, [q.id]: "ok" }))} className="min-h-9 rounded-sm bg-midnight px-3 text-[12px] font-semibold text-white active:scale-[0.97]">Approve</button>
                      <button onClick={() => setDone((d) => ({ ...d, [q.id]: "change" }))} className="min-h-9 rounded-sm border border-line px-3 text-[12px] text-midnight">Ask for a change</button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </aside>
        )}
      </div>
    </div>
  );
}

function Lane({ label, note }: { label: string; note: string }) {
  return (
    <div className="border-t border-line px-2 py-2.5 leading-tight">
      <b className="block text-[12px]">{label}</b>
      <span className="text-[11px] text-ink-muted">{note}</span>
    </div>
  );
}

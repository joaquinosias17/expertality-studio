"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { track } from "@vercel/analytics";
import { useStudio, generate } from "@/lib/store";
import type { Post } from "@/lib/brand";
import { BrandReel } from "./BrandReel";
import { Screen } from "./Screen";
import { Btn, Hint, Sheet, Toast, buzz } from "./ui";

const DAYS: Record<string, string> = { Mon: "Monday", Tue: "Tuesday", Wed: "Wednesday", Thu: "Thursday", Fri: "Friday", Sat: "Saturday", Sun: "Sunday" };
const ORDER = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const hello = () => { const h = new Date().getHours(); return h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening"; };

export function Week() {
  const s = useStudio();
  const router = useRouter();
  const rail = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [edit, setEdit] = useState<Post | null>(null);
  const [ask, setAsk] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => { if (s.ready && !s.brand) router.replace("/app/start"); }, [s.ready, s.brand, router]);
  useEffect(() => { if (toast) { const t = setTimeout(() => setToast(null), 2200); return () => clearTimeout(t); } }, [toast]);

  const posts = [...s.posts].sort((a, b) => ORDER.indexOf(a.day) - ORDER.indexOf(b.day));
  const drafts = posts.filter((p) => p.status === "draft");
  const approved = posts.filter((p) => p.status === "approved");

  function onScroll() {
    const el = rail.current; if (!el) return;
    const w = el.firstElementChild ? (el.firstElementChild as HTMLElement).offsetWidth + 12 : 1;
    setActive(Math.round(el.scrollLeft / w));
  }
  function goTo(i: number) {
    const el = rail.current; if (!el) return;
    const card = el.children[i] as HTMLElement | undefined;
    card?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }
  function approve(p: Post, i: number) {
    buzz(); s.updatePost(p.id, { status: "approved" }); track("approve");
    setToast(`Scheduled for ${DAYS[p.day]}, ${p.time}`);
    if (!s.contact && approved.length === 0) setTimeout(() => setAsk(true), 900);
    setTimeout(() => goTo(Math.min(i + 1, posts.length - 1)), 500);
  }
  function approveAll() { buzz(); drafts.forEach((p) => s.updatePost(p.id, { status: "approved" })); track("approve_all"); if (!s.contact) setTimeout(() => setAsk(true), 700); }

  if (!s.ready || !s.brand) return <div className="flex-1" />;
  const b = s.brand;
  const done = posts.length > 0 && drafts.length === 0;

  return (
    <Screen>
      <header className="flex items-center justify-between px-5 pb-2 pt-6">
        <div>
          <p className="text-[15px] text-ink-muted">{hello()}</p>
          <h1 className="font-display text-[26px] font-bold leading-tight text-midnight">{b.business}</h1>
        </div>
        <Link href="/app/brand" aria-label="My brand" className="flex size-11 items-center justify-center rounded-full text-[17px] font-bold" style={{ background: b.look.bg, color: b.look.fg }}>{b.business.slice(0, 1)}</Link>
      </header>

      {/* Week status */}
      <section className="mx-5 mt-3 rounded-2xl border border-line p-4" aria-label="This week">
        <div className="flex items-baseline justify-between">
          <p className="text-[17px] font-semibold text-ink">{done ? "Your week is set" : "Your week is ready"}</p>
          <p className="text-[15px] text-ink-muted tabular">{approved.length} of {posts.length} approved</p>
        </div>
        <div className="mt-3 flex gap-1.5">
          {posts.map((p, i) => (
            <button key={p.id} onClick={() => goTo(i)} aria-label={`${DAYS[p.day]}: ${p.hook.join(" ")}`} className="flex-1">
              <span className={`block h-2 rounded-full transition-colors duration-300 ${p.status === "approved" ? "bg-midnight" : p.status === "skipped" ? "bg-mist" : i === active ? "bg-red" : "bg-line"}`} />
              <span className={`mt-1.5 block text-[12px] font-semibold ${i === active ? "text-midnight" : "text-ink-muted"}`}>{p.day}</span>
            </button>
          ))}
        </div>
        {!done && drafts.length > 1 && <button onClick={approveAll} className="mt-3 min-h-10 text-[15px] font-semibold text-midnight underline underline-offset-4">Approve all {drafts.length}</button>}
      </section>

      <div className="mt-4"><Hint id="swipe" seen={s.hints.swipe} onSeen={s.seeHint}>Swipe to see each post. Tap <b>Approve</b> on the ones you like and we post them for you.</Hint></div>

      {done ? (
        <section className="fade-up mx-5 mt-5 rounded-2xl bg-midnight p-6 text-white">
          <span className="pop flex size-14 items-center justify-center rounded-full bg-white text-midnight"><svg viewBox="0 0 24 24" className="size-8" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7" pathLength={1} className="draw" /></svg></span>
          <h2 className="mt-5 font-display text-[26px] font-bold leading-tight">Done for the week.</h2>
          <p className="mt-2 text-[16px] leading-relaxed text-mist">We post each one at its time. Next Monday your new week will be waiting.</p>
          <ul className="mt-5 space-y-2 text-[15px]">
            {approved.map((p) => <li key={p.id} className="flex justify-between gap-3 border-t border-midnight-raised pt-2"><span>{p.hook.join(" ")}</span><span className="shrink-0 text-mist tabular">{p.day} {p.time}</span></li>)}
          </ul>
          <label className="mt-6 flex items-center justify-between gap-4 rounded-xl bg-midnight-raised p-4">
            <span><b className="block text-[16px]">Autopilot</b><span className="text-[14px] text-mist">If you are busy next week, safe posts go out on their own.</span></span>
            <Toggle on={s.autopilot} set={s.setAutopilot} label="Autopilot" />
          </label>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <Btn kind="ghost" onClick={() => router.push("/app/create")}>Add a post</Btn>
            <Btn kind="ghost" onClick={() => posts.forEach((p) => s.updatePost(p.id, { status: "draft" }))}>Review again</Btn>
          </div>
        </section>
      ) : (
        <div ref={rail} onScroll={onScroll} className="no-scrollbar mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-[9%] pb-2">
          {posts.map((p, i) => (
            <article key={p.id} className="w-[82%] shrink-0 snap-center" aria-label={`${DAYS[p.day]} post`}>
              <div className={`relative aspect-[4/5] overflow-hidden rounded-2xl transition-transform duration-300 ${i === active ? "scale-100" : "scale-[0.94]"}`}>
                <BrandReel brand={b} post={p} active={i === active} />
                {p.status === "approved" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-midnight/55">
                    <span className="pop flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[15px] font-bold text-midnight">
                      <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7" pathLength={1} className="draw" /></svg>Scheduled
                    </span>
                  </div>
                )}
              </div>
              <div className="px-1 pt-3">
                <p className="text-[14px] font-semibold text-midnight">{DAYS[p.day]}, {p.time} · {p.format}</p>
                <p className="mt-1 text-[14px] leading-snug text-ink-muted">{p.why}</p>
                <p className="mt-2 line-clamp-3 text-[15px] leading-relaxed text-ink">{p.caption}</p>
                {p.status === "draft" ? (
                  <div className="mt-3 grid grid-cols-[1fr_auto] gap-2">
                    <Btn onClick={() => approve(p, i)}>Approve</Btn>
                    <Btn kind="ghost" onClick={() => setEdit(p)}>Edit</Btn>
                  </div>
                ) : (
                  <button onClick={() => s.updatePost(p.id, { status: "draft" })} className="mt-3 min-h-11 text-[15px] font-semibold text-ink-muted underline underline-offset-4">Undo</button>
                )}
              </div>
            </article>
          ))}
        </div>
      )}

      <EditSheet post={edit} onClose={() => setEdit(null)} />
      <ContactSheet open={ask} onClose={() => setAsk(false)} />
      <Toast text={toast} />
    </Screen>
  );
}

export function Toggle({ on, set, label }: { on: boolean; set: (v: boolean) => void; label: string }) {
  return (
    <button type="button" role="switch" aria-checked={on} aria-label={label} onClick={() => set(!on)} className={`relative h-8 w-14 shrink-0 rounded-full transition-colors duration-200 ${on ? "bg-red" : "bg-mist"}`}>
      <span className={`absolute left-0 top-1 size-6 rounded-full bg-white shadow transition-transform duration-200 ease-[var(--ease-out-expo)] ${on ? "translate-x-7" : "translate-x-1"}`} />
    </button>
  );
}

const TWEAKS = ["Make it shorter", "Make it friendlier", "Write it in Spanish", "Add a clear offer"];

function EditSheet({ post, onClose }: { post: Post | null; onClose: () => void }) {
  const s = useStudio();
  const [draft, setDraft] = useState<Post | null>(post);
  const [busy, setBusy] = useState("");
  const [err, setErr] = useState("");
  useEffect(() => { setDraft(post); setErr(""); }, [post]);
  if (!draft || !s.brand) return <Sheet open={false} onClose={onClose} title="">{null}</Sheet>;

  async function tweak(t: string) {
    if (!draft || !s.brand) return;
    setBusy(t); setErr("");
    try {
      const { posts } = await generate("rewrite", s.brand, { post: { hook: draft.hook, caption: draft.caption, cta: draft.cta, day: draft.day, time: draft.time, format: draft.format }, tweak: t, lang: t.includes("Spanish") ? "es" : "en" });
      const n = posts[0]; setDraft({ ...draft, hook: n.hook, caption: n.caption, cta: n.cta, big: n.big });
      track("rewrite", { tweak: t });
    } catch (e) { setErr((e as Error).message); }
    setBusy("");
  }

  return (
    <Sheet open={!!post} onClose={onClose} title="Edit this post">
      <div className="mx-auto aspect-[4/5] w-1/2 overflow-hidden rounded-xl"><BrandReel brand={s.brand} post={draft} /></div>
      <p className="mt-5 text-[14px] font-semibold text-ink">Ask for a change</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {TWEAKS.map((t) => (
          <button key={t} onClick={() => tweak(t)} disabled={!!busy} className={`min-h-11 rounded-full border px-4 text-[15px] transition-colors ${busy === t ? "shimmer border-line text-ink" : "border-line text-ink active:bg-cloud"}`}>{busy === t ? "Rewriting" : t}</button>
        ))}
      </div>
      {err && <p className="mt-3 text-[14px] text-ink" role="alert">{err}</p>}
      <label className="mt-5 block text-[14px] font-semibold text-ink">Text on the video
        <input value={draft.hook.join(" / ")} onChange={(e) => setDraft({ ...draft, hook: e.target.value.split("/").map((x) => x.trim()).filter(Boolean).slice(0, 3) })} className="mt-1.5 block min-h-12 w-full rounded-xl border-2 border-line px-3 text-[16px] font-normal focus:border-midnight focus:outline-none" />
        <span className="mt-1 block text-[13px] font-normal text-ink-muted">Use / to start a new line.</span>
      </label>
      <label className="mt-4 block text-[14px] font-semibold text-ink">Caption
        <textarea value={draft.caption} onChange={(e) => setDraft({ ...draft, caption: e.target.value })} rows={4} className="mt-1.5 block w-full rounded-xl border-2 border-line p-3 text-[16px] font-normal leading-relaxed focus:border-midnight focus:outline-none" />
      </label>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <Btn kind="ghost" onClick={onClose}>Cancel</Btn>
        <Btn onClick={() => { s.updatePost(draft.id, { hook: draft.hook, caption: draft.caption, cta: draft.cta, big: draft.big }); onClose(); }}>Save</Btn>
      </div>
    </Sheet>
  );
}

function ContactSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const s = useStudio();
  const [v, setV] = useState("");
  const [sending, setSending] = useState(false);
  async function save(e: React.FormEvent) {
    e.preventDefault(); if (!v.trim()) return;
    setSending(true);
    const isEmail = v.includes("@");
    await fetch("/api/lead", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ kind: "trial", name: s.brand?.business, brand: s.brand?.business, email: isEmail ? v : "", phone: isEmail ? "" : v, city: s.brand?.city }) }).catch(() => {});
    track("lead", { kind: "trial" });
    s.setContact(v); setSending(false); onClose();
  }
  return (
    <Sheet open={open} onClose={onClose} title="Where should we send next week?">
      <p className="text-[16px] leading-relaxed text-body">Every Monday we send your new week. You approve it right from the message.</p>
      <form onSubmit={save} className="mt-5 grid gap-3">
        <label className="text-[14px] font-semibold text-ink">Email or WhatsApp number
          <input value={v} onChange={(e) => setV(e.target.value)} inputMode="email" autoComplete="email" placeholder="you@business.com or +1 512 555 0100" className="mt-1.5 block min-h-14 w-full rounded-xl border-2 border-line px-4 text-[17px] font-normal focus:border-midnight focus:outline-none" />
        </label>
        <Btn disabled={sending || !v.trim()}>{sending ? "Saving" : "Send me my weeks"}</Btn>
        <Btn type="button" kind="quiet" onClick={onClose}>Not now</Btn>
      </form>
    </Sheet>
  );
}

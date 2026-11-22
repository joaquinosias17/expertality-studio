"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { track } from "@vercel/analytics";
import { useStudio, generate, withIds } from "@/lib/store";
import type { Post } from "@/lib/brand";
import { BrandReel } from "./BrandReel";
import { Screen } from "./Screen";
import { Btn, Toast, buzz } from "./ui";

function ideasFor(business: string) {
  const d = new Date(); const m = d.getMonth(); const out: string[] = [];
  if (m === 10) out.push("Thanksgiving week hours", "Small Business Saturday on Nov 28");
  if (m === 11 || (m === 10 && d.getDate() > 20)) out.push("Holiday gift ideas");
  out.push("A tip my customers always ask about", "Something new this month", "Thank you to our regulars");
  if (business === "Expertality") out.unshift("Our $500 GTM Audit", "Why B2B teams pick the wrong customers");
  return out.slice(0, 6);
}
const WAIT = ["Reading your idea", "Picking the best day", "Writing three versions", "Checking your brand rules"];

export function Create() {
  const s = useStudio();
  const router = useRouter();
  const [idea, setIdea] = useState("");
  const [lang, setLang] = useState<"en" | "es">("en");
  const [state, setState] = useState<"write" | "busy" | "pick">("write");
  const [opts, setOpts] = useState<Omit<Post, "id" | "status">[]>([]);
  const [w, setW] = useState(0);
  const [err, setErr] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => { if (s.ready && !s.brand) router.replace("/app/start"); }, [s.ready, s.brand, router]);
  useEffect(() => { if (state !== "busy") return; const t = setInterval(() => setW((v) => (v + 1) % WAIT.length), 1200); return () => clearInterval(t); }, [state]);
  if (!s.ready || !s.brand) return <div className="flex-1" />;
  const b = s.brand;

  async function make(e?: React.FormEvent) {
    e?.preventDefault(); if (!idea.trim()) return;
    setState("busy"); setErr(""); setW(0); track("create", { lang });
    try { const r = await generate("idea", b, { idea, lang }); setOpts(r.posts.slice(0, 3)); setState("pick"); }
    catch (x) { setErr((x as Error).message); setState("write"); }
  }
  function add(p: Omit<Post, "id" | "status">) {
    buzz(); s.addPosts(withIds([p])); setToast(`Added to ${p.day}. Approve it in My week.`); track("create_add");
    setTimeout(() => router.push("/app"), 1200);
  }

  return (
    <Screen>
      <div className="px-5 pt-6">
        <h1 className="font-display text-[28px] font-bold leading-tight text-midnight">What is happening at your business?</h1>
        {state !== "pick" && (
          <form onSubmit={make} className="mt-5">
            <label htmlFor="idea" className="sr-only">Your idea</label>
            <textarea id="idea" value={idea} onChange={(e) => setIdea(e.target.value)} rows={3} disabled={state === "busy"}
              placeholder="Example: we are open late this Friday" className="block w-full rounded-2xl border-2 border-line p-4 text-[18px] leading-relaxed focus:border-midnight focus:outline-none disabled:opacity-60" />
            <p className="mt-4 text-[14px] font-semibold text-ink">Need an idea?</p>
            <div className="no-scrollbar -mx-5 mt-2 flex gap-2 overflow-x-auto px-5">
              {ideasFor(b.business).map((x) => (
                <button type="button" key={x} onClick={() => setIdea(x)} className="min-h-11 shrink-0 rounded-full border border-line px-4 text-[15px] text-ink active:bg-cloud">{x}</button>
              ))}
            </div>
            <div className="mt-5 flex items-center justify-between gap-3">
              <div className="inline-flex rounded-full border border-line p-1" role="group" aria-label="Language">
                {(["en", "es"] as const).map((l) => (
                  <button type="button" key={l} onClick={() => setLang(l)} aria-pressed={lang === l} className={`min-h-10 rounded-full px-4 text-[15px] font-semibold transition-colors ${lang === l ? "bg-midnight text-white" : "text-ink-muted"}`}>{l === "en" ? "English" : "Español"}</button>
                ))}
              </div>
              <Btn disabled={!idea.trim() || state === "busy"}>{state === "busy" ? "Working" : "Make posts"}</Btn>
            </div>
            {err && <p className="mt-4 text-[15px] text-ink" role="alert">{err}</p>}
          </form>
        )}
      </div>

      {state === "busy" && (
        <section className="mt-6 px-5" aria-live="polite">
          <p key={w} className="fade-up text-[16px] font-semibold text-midnight">{WAIT[w]}</p>
          <div className="mt-4 grid grid-cols-3 gap-3">{[0, 1, 2].map((k) => <div key={k} className="shimmer aspect-[9/16] rounded-xl" />)}</div>
        </section>
      )}

      {state === "pick" && (
        <section className="mt-2" aria-label="Choose a version">
          <p className="px-5 text-[16px] text-body">Three versions of <b className="text-ink">&ldquo;{idea}&rdquo;</b>. Pick one.</p>
          <div className="no-scrollbar mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2">
            {opts.map((p, i) => (
              <article key={i} className="fade-up w-[70%] shrink-0 snap-center" style={{ animationDelay: `${i * 90}ms` }}>
                <div className="aspect-[9/16] overflow-hidden rounded-2xl"><BrandReel brand={b} post={p} /></div>
                <p className="mt-3 text-[14px] font-semibold text-midnight">{p.format} · {p.day} {p.time}</p>
                <p className="mt-1 line-clamp-3 text-[15px] leading-relaxed text-ink">{p.caption}</p>
                <Btn className="mt-3 w-full" onClick={() => add(p)}>Use this one</Btn>
              </article>
            ))}
          </div>
          <div className="px-5"><Btn kind="quiet" onClick={() => setState("write")}>Change my idea</Btn></div>
        </section>
      )}
      <Toast text={toast} />
    </Screen>
  );
}

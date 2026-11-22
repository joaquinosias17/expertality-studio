"use client";
import { useState } from "react";
import { PHOTOS } from "@/lib/data";
import { PostThumb } from "./PostThumb";
import { Check, Music, Flag } from "./Icons";

const IDEAS = [
  { id: "a", format: "Reel, 12 s", template: "Event night", img: PHOTOS.interior, overlay: "Live music Thursday", caption: "Live music at Mesa Coffee Co. South Congress this Thursday from 7 pm. Come early for a seat.", music: "Warm acoustic, 96 BPM, cuts on the beat" },
  { id: "b", format: "Post, 4:5", template: "Store hours", img: PHOTOS.counter, overlay: "Open until 10 Thursday", caption: "We are staying open until 10 pm this Thursday for live music. See you at the counter.", music: "No music on still posts" },
  { id: "c", format: "Story, 9:16", template: "Countdown", img: PHOTOS.flatlay, overlay: "2 days to live music", caption: "Two days to go. Live music Thursday at 7 pm, South Congress.", music: "Light percussion, 104 BPM" },
];

const CHECKS = [
  { t: "Brand name in full", ok: true },
  { t: "Approved template and fonts", ok: true },
  { t: "Store address and time included", ok: true },
  { t: "No offer, so no disclaimer needed", ok: true },
];

export function Create() {
  const [idea, setIdea] = useState("Live music this Thursday at 7 pm");
  const [step, setStep] = useState<"write" | "pick" | "review" | "sent">("write");
  const [pick, setPick] = useState(IDEAS[0]);
  const [lang, setLang] = useState<"en" | "es">("en");

  return (
    <main className="mx-auto max-w-[1180px] px-5 py-8 md:px-8 md:py-10">
      <h1 className="font-display text-[30px] font-bold leading-tight text-midnight">Create a post</h1>
      <ol className="mt-5 flex gap-6 text-[13px]" aria-label="Steps">
        {["Idea", "Choose", "Review"].map((s, i) => {
          const at = ["write", "pick", "review"].indexOf(step === "sent" ? "review" : step);
          return <li key={s} className={i <= at ? "font-semibold text-midnight" : "text-ink-muted"}><span className="tabular">{i + 1}</span> {s}</li>;
        })}
      </ol>

      {step === "write" && (
        <form onSubmit={(e) => { e.preventDefault(); if (idea.trim()) setStep("pick"); }} className="mt-8 max-w-[640px] border border-line bg-white p-6">
          <label htmlFor="idea" className="text-[15px] font-semibold text-ink">What is happening at your store?</label>
          <textarea id="idea" value={idea} onChange={(e) => setIdea(e.target.value)} rows={3} className="mt-3 block w-full rounded-sm border border-mist p-3.5 text-[16px] leading-relaxed focus:border-midnight focus:outline-none" />
          <p className="mt-2 text-[13px] text-ink-muted">English or Spanish. Dates and times help.</p>
          <button className="mt-5 min-h-12 rounded-sm bg-midnight px-6 text-[15px] font-semibold text-white shadow-[inset_0_-3px_0_var(--color-red)] active:scale-[0.98]">Suggest posts</button>
        </form>
      )}

      {step === "pick" && (
        <section className="mt-8">
          <p className="text-[15px] text-body">Three ways to post <b className="text-ink">“{idea}”</b>, each from an approved template.</p>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {IDEAS.map((x) => (
              <button key={x.id} onClick={() => { setPick(x); setStep("review"); }} className="group border border-line bg-white p-3 text-left transition-[border-color] hover:border-midnight focus-visible:border-midnight">
                <PostThumb img={x.img} overlay={x.overlay} size="md" sizes="(min-width: 640px) 320px, 90vw" ratio={x.format.startsWith("Post") ? "4/5" : "9/16"} />
                <p className="mt-3 text-[15px] font-semibold text-ink">{x.template}</p>
                <p className="text-[13px] text-ink-muted">{x.format}</p>
              </button>
            ))}
          </div>
          <button onClick={() => setStep("write")} className="mt-6 text-[14px] text-midnight underline">Change the idea</button>
        </section>
      )}

      {(step === "review" || step === "sent") && (
        <section className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="mx-auto w-full max-w-[340px] lg:mx-0">
            <PostThumb img={pick.img} overlay={lang === "en" ? pick.overlay : "Música en vivo el jueves"} size="lg" sizes="340px" ratio={pick.format.startsWith("Post") ? "4/5" : "9/16"} />
            <div className="mt-3 inline-flex border border-line bg-white text-[13px]" role="group" aria-label="Language">
              {(["en", "es"] as const).map((l) => (
                <button key={l} onClick={() => setLang(l)} aria-pressed={lang === l} className={`min-h-9 px-4 ${lang === l ? "bg-midnight font-semibold text-white" : "text-midnight"}`}>{l === "en" ? "English" : "Español"}</button>
              ))}
            </div>
          </div>
          <div>
            <div className="border border-line bg-white p-6">
              <p className="text-[13px] text-ink-muted">{pick.template} · {pick.format} · Thu 7:00 PM suggested</p>
              <p className="mt-3 text-[16px] leading-relaxed text-ink">{lang === "en" ? pick.caption : "Música en vivo en Mesa Coffee Co. South Congress este jueves desde las 7 pm. Llega temprano para tener puesto."}</p>
              <p className="mt-5 flex items-center gap-2 text-[14px] text-body"><Music className="size-5 text-midnight" />{pick.music}. Licensed track.</p>
            </div>
            <div className="mt-4 border border-line bg-white p-6">
              <p className="text-[15px] font-semibold text-ink">Brand check</p>
              <ul className="mt-3 space-y-2">
                {CHECKS.map((c) => <li key={c.t} className="flex items-center gap-2.5 text-[14px] text-body"><Check className="size-4 text-midnight" />{c.t}</li>)}
              </ul>
              <p className="mt-4 text-[13px] text-ink-muted">Passes every rule, so it goes straight to your calendar. Brand review not needed.</p>
            </div>
            {step === "sent" ? (
              <p className="mt-5 flex items-center gap-2 text-[15px] font-semibold text-midnight"><Check className="size-5" />Scheduled for Thursday at 7:00 PM</p>
            ) : (
              <div className="mt-5 flex flex-wrap gap-3">
                <button onClick={() => setStep("sent")} className="min-h-12 rounded-sm bg-midnight px-6 text-[15px] font-semibold text-white shadow-[inset_0_-3px_0_var(--color-red)] active:scale-[0.98]">Approve and schedule</button>
                <button onClick={() => setStep("pick")} className="min-h-12 rounded-sm border border-mist px-6 text-[15px] text-midnight">Try another</button>
              </div>
            )}
            <p className="mt-6 flex items-start gap-2 text-[12px] text-ink-muted"><Flag className="mt-px size-4 shrink-0" />Demo. Drafts here are prewritten for the sample brand.</p>
          </div>
        </section>
      )}
    </main>
  );
}

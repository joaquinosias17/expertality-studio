"use client";
import { useState } from "react";
import { track } from "@vercel/analytics";

type Kind = "brand" | "store";

export function LeadForm() {
  const [kind, setKind] = useState<Kind>("brand");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [err, setErr] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data: Record<string, FormDataEntryValue> = { ...Object.fromEntries(new FormData(e.currentTarget)), kind };
    setState("sending");
    try {
      const r = await fetch("/api/lead", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(data) });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(j.error || "That did not go through. Try again in a minute.");
      track("lead", { kind, locations: String(data.locations ?? "1") });
      setState("sent");
    } catch (x) { setErr((x as Error).message); setState("error"); }
  }

  if (state === "sent") {
    return (
      <div className="border border-midnight-raised p-7" role="status">
        <p className="font-display text-[24px] font-bold text-white">{kind === "brand" ? "Walkthrough requested" : "You are on the list"}</p>
        <p className="mt-3 max-w-[48ch] text-[16px] leading-relaxed text-mist">
          {kind === "brand"
            ? "We reply within one business day with two times that work. If you send your brand guide before the call, we show you a week of posts for one of your locations."
            : "We will write when single-store accounts open, with your first month free."}
        </p>
      </div>
    );
  }

  const field = "mt-1.5 block min-h-12 w-full rounded-sm border border-midnight-raised bg-midnight-deep px-3.5 text-[16px] text-white placeholder:text-mist/50 focus:border-mist focus:outline-none";
  const label = "text-[13px] font-semibold text-mist";

  return (
    <div>
      <div className="inline-flex border border-midnight-raised" role="tablist" aria-label="Who are you?">
        {(["brand", "store"] as const).map((k) => (
          <button key={k} role="tab" aria-selected={kind === k} onClick={() => { setKind(k); setState("idle"); }}
            className={`min-h-11 px-5 text-[14px] ${kind === k ? "bg-white font-semibold text-midnight" : "text-mist hover:text-white"}`}>
            {k === "brand" ? "I run a brand" : "I own one store"}
          </button>
        ))}
      </div>
      <form key={kind} onSubmit={onSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className={label}>Name<input name="name" required autoComplete="name" className={field} /></label>
        <label className={label}>{kind === "brand" ? "Work email" : "Email"}<input name="email" type="email" required autoComplete="email" className={field} /></label>
        <label className={label}>{kind === "brand" ? "Brand" : "Business name"}<input name="brand" required autoComplete="organization" className={field} /></label>
        {kind === "brand" ? (
          <>
            <label className={label}>Locations
              <select name="locations" required defaultValue="" className={field}>
                <option value="" disabled>Choose one</option>
                <option>10 to 49</option><option>50 to 249</option><option>250 or more</option><option>Fewer than 10</option>
              </select>
            </label>
            <label className={label}>Your role
              <select name="role" required defaultValue="" className={field}>
                <option value="" disabled>Choose one</option>
                <option>Marketing at the brand</option><option>Franchise owner, several units</option><option>Agency</option><option>Other</option>
              </select>
            </label>
            <label className={label}>When do you want stores live?
              <select name="timeline" required defaultValue="" className={field}>
                <option value="" disabled>Choose one</option>
                <option>This quarter</option><option>Next quarter</option><option>Just exploring</option>
              </select>
            </label>
            <label className="flex items-center gap-3 text-[15px] text-mist sm:col-span-2">
              <input type="checkbox" name="pilot" value="yes" className="size-5 accent-[var(--color-red)]" />
              I want to start with the 60-day pilot
            </label>
          </>
        ) : (
          <label className={label}>City<input name="city" required autoComplete="address-level2" className={field} /></label>
        )}
        <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
          <button disabled={state === "sending"} className="min-h-12 rounded-sm bg-white px-6 text-[15px] font-semibold text-midnight shadow-[inset_0_-3px_0_var(--color-red)] transition-transform duration-150 active:scale-[0.98] disabled:opacity-60">
            {state === "sending" ? "Sending" : kind === "brand" ? "Book a walkthrough" : "Join the waitlist"}
          </button>
          <p className="text-[13px] text-mist">{kind === "brand" ? "30 minutes. No slides." : "No card needed."}</p>
          {state === "error" && <p role="alert" className="w-full text-[14px] text-white">{err}</p>}
        </div>
      </form>
    </div>
  );
}

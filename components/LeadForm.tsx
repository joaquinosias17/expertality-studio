"use client";
import { useState } from "react";

export function LeadForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [err, setErr] = useState("");
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    setState("sending");
    try {
      const r = await fetch("/api/lead", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(data) });
      if (!r.ok) { const j = await r.json().catch(() => ({})); throw new Error(j.error || "Something went wrong. Try again, or write to hello@expertality.com."); }
      setState("sent");
    } catch (x) { setErr((x as Error).message); setState("error"); }
  }
  if (state === "sent") {
    return (
      <div className="border border-midnight-raised p-6">
        <p className="font-display text-[22px] font-bold text-white">Walkthrough requested</p>
        <p className="mt-2 text-[15px] text-mist">We will reply within one business day with two times that work.</p>
      </div>
    );
  }
  const field = "mt-1.5 block min-h-12 w-full rounded-sm border border-midnight-raised bg-midnight-deep px-3.5 text-[15px] text-white placeholder:text-mist/50 focus:border-mist focus:outline-none";
  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
      <label className="text-[13px] font-semibold text-mist">Name<input name="name" required autoComplete="name" className={field} /></label>
      <label className="text-[13px] font-semibold text-mist">Work email<input name="email" type="email" required autoComplete="email" className={field} /></label>
      <label className="text-[13px] font-semibold text-mist">Brand<input name="brand" required autoComplete="organization" className={field} /></label>
      <label className="text-[13px] font-semibold text-mist">Locations
        <select name="locations" required defaultValue="" className={field}>
          <option value="" disabled>Choose one</option>
          <option>1 store</option><option>2 to 10</option><option>11 to 50</option><option>51 to 250</option><option>More than 250</option>
        </select>
      </label>
      <div className="sm:col-span-2 flex flex-wrap items-center gap-4">
        <button disabled={state === "sending"} className="min-h-12 rounded-sm bg-white px-6 text-[15px] font-semibold text-midnight shadow-[inset_0_-3px_0_var(--color-red)] transition-transform duration-150 active:scale-[0.98] disabled:opacity-60">
          {state === "sending" ? "Sending" : "Book a walkthrough"}
        </button>
        {state === "error" && <p role="alert" className="text-[14px] text-white">{err}</p>}
      </div>
    </form>
  );
}

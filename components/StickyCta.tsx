"use client";
import { useEffect, useState } from "react";
import { track } from "@vercel/analytics";

// Phone only: a single action bar after the hero, hidden again near the form.
export function StickyCta() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => {
      const form = document.getElementById("walkthrough");
      const nearForm = form ? form.getBoundingClientRect().top < window.innerHeight : false;
      setShow(window.scrollY > 700 && !nearForm);
    };
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <div className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 p-3 backdrop-blur transition-transform duration-300 ease-[var(--ease-out-expo)] md:hidden ${show ? "translate-y-0" : "translate-y-full"}`} aria-hidden={!show}>
      <div className="flex gap-2">
        <a href="#walkthrough" tabIndex={show ? 0 : -1} onClick={() => track("cta", { where: "sticky" })} className="flex min-h-12 flex-1 items-center justify-center rounded-sm bg-midnight text-[15px] font-semibold text-white shadow-[inset_0_-3px_0_var(--color-red)]">Book a walkthrough</a>
        <a href="#pricing" tabIndex={show ? 0 : -1} className="flex min-h-12 items-center justify-center rounded-sm border border-line px-4 text-[15px] font-semibold text-midnight">Pricing</a>
      </div>
    </div>
  );
}

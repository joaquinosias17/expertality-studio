"use client";
import Image from "next/image";
import { useState } from "react";
import { photo } from "@/lib/data";
import { Play } from "./Icons";

// A template thumbnail that plays a short push-in with its headline when hovered or focused.
export function TemplateCard({ img, overlay, name, meta }: { img: string; overlay: string; name: string; meta: string }) {
  const [on, setOn] = useState(0);
  return (
    <figure>
      <button type="button" onMouseEnter={() => setOn((v) => v + 1)} onFocus={() => setOn((v) => v + 1)}
        className="group relative block aspect-[9/16] w-full overflow-hidden bg-espresso text-left" aria-label={`Preview the ${name} template`}>
        <div key={on} className={on ? "kb absolute inset-0" : "absolute inset-0"} style={{ ["--dur" as string]: "2.6s" }}>
          <Image src={photo(img, 500)} alt="" fill sizes="(min-width: 640px) 220px, 45vw" className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(28,16,10,0.55)_0%,rgba(28,16,10,0)_40%,rgba(28,16,10,0)_60%,rgba(28,16,10,0.6)_100%)]" />
        <span key={`t${on}`} className="absolute inset-x-0 top-0 block overflow-hidden p-4">
          <span className={`block font-mesa text-[22px] leading-[1.05] text-oat ${on ? "rise" : ""}`}>{overlay}</span>
        </span>
        <span className="absolute bottom-4 left-4 font-mesa text-[12px] text-oat">Mesa Coffee Co.</span>
        <span className="absolute bottom-3 right-3 flex size-9 items-center justify-center rounded-full bg-oat/90 text-espresso opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"><Play className="ml-0.5 size-4" /></span>
      </button>
      <figcaption className="mt-2.5 text-[14px] font-semibold text-midnight">{name}<span className="block text-[13px] font-normal text-ink-muted">{meta}</span></figcaption>
    </figure>
  );
}

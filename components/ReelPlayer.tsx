"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { PHOTOS, photo } from "@/lib/data";

type Scene = { img?: string; lines: string[]; end?: boolean };
export const HOLIDAY_REEL: Scene[] = [
  { img: PHOTOS.latteArt, lines: ["Holiday menu", "is here"] },
  { img: PHOTOS.pourMug, lines: ["Peppermint mocha", "is back"] },
  { img: PHOTOS.croissants, lines: ["Fresh every", "morning"] },
  { lines: ["South Congress", "Open 7 am"], end: true },
];

const DUR = 3200;

// A 9:16 reel drawn in the browser: the same template, brand type and timing the render engine uses.
export function ReelPlayer({ scenes = HOLIDAY_REEL, autoplay = true, sizes = "340px", music = "Warm acoustic, 96 BPM" }: { scenes?: Scene[]; autoplay?: boolean; sizes?: string; music?: string }) {
  const [i, setI] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [playing, setPlaying] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !autoplay) return;
    const io = new IntersectionObserver(([e]) => setPlaying(e.isIntersecting), { threshold: 0.3 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [autoplay]);

  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => {
      setI((v) => { const n = (v + 1) % scenes.length; if (n === 0) setCycle((c) => c + 1); return n; });
    }, DUR);
    return () => clearTimeout(t);
  }, [i, playing, scenes.length]);

  const s = scenes[i];
  return (
    <div ref={ref} className="relative h-full w-full overflow-hidden bg-espresso" aria-label="Sample reel for Mesa Coffee Co." role="img">
      {scenes.map((sc, k) => sc.img && (
        <div key={k} className={`absolute inset-0 transition-opacity duration-500 ${k === i ? "opacity-100" : "opacity-0"}`}>
          <div key={k === i ? `${cycle}-${i}` : "idle"} className={k === i && playing ? "kb absolute inset-0" : "absolute inset-0"} style={{ ["--dur" as string]: `${DUR + 600}ms` }}>
            <Image src={photo(sc.img, 700)} alt="" fill sizes={sizes} className="object-cover" priority={k === 0} />
          </div>
        </div>
      ))}
      <div className={`absolute inset-0 transition-opacity duration-500 ${s.end ? "opacity-100" : "opacity-0"} bg-espresso`} />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(28,16,10,0.6)_0%,rgba(28,16,10,0)_34%,rgba(28,16,10,0)_60%,rgba(28,16,10,0.7)_100%)]" />

      {/* story bars */}
      <div className="absolute inset-x-3 top-3 flex gap-1">
        {scenes.map((_, k) => (
          <span key={k} className="h-[3px] flex-1 overflow-hidden bg-oat/30">
            <span key={k === i ? `${cycle}-${i}` : `x${k}`} className={`block h-full bg-oat ${k < i ? "" : k === i && playing ? "fill" : "scale-x-0"}`} style={{ transformOrigin: "left", ["--dur" as string]: `${DUR}ms` }} />
          </span>
        ))}
      </div>

      <div key={`${cycle}-${i}`} className={`absolute inset-x-5 ${s.end ? "top-1/2 -translate-y-1/2" : "top-9"}`}>
        {s.lines.map((l, k) => (
          <span key={k} className="block overflow-hidden">
            <span className={`block font-mesa text-oat ${s.end ? "text-[30px]" : "text-[34px]"} leading-[1.04] ${playing ? "rise" : ""}`} style={{ animationDelay: `${120 + k * 110}ms` }}>{l}</span>
          </span>
        ))}
        {s.end && <span className="mt-4 block h-[3px] w-12 bg-pumpkin" />}
      </div>

      <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-3">
        <span className="font-mesa text-[15px] text-oat">Mesa Coffee Co.</span>
        <span className="flex items-center gap-1.5 rounded-full bg-black/35 px-2.5 py-1 text-[11px] text-oat backdrop-blur">
          <span className="eq flex h-3 items-end gap-[2px]" aria-hidden="true"><span className="w-[2px] h-full bg-oat" /><span className="w-[2px] h-full bg-oat" /><span className="w-[2px] h-full bg-oat" /></span>
          {music}
        </span>
      </div>
    </div>
  );
}

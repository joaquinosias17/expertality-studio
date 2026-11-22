"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Brand, Post } from "@/lib/brand";
import { photo } from "@/lib/data";

const STEP = 2300;

// A post drawn as motion graphics from the brand kit: target lines, rising type, a big figure, the call to action.
export function BrandReel({ brand, post, active = true, still = false }: { brand: Brand; post: Pick<Post, "hook" | "big" | "cta" | "format">; active?: boolean; still?: boolean }) {
  const L = brand.look;
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  const [scene, setScene] = useState(0);
  const [loop, setLoop] = useState(0);
  const scenes = post.big ? 3 : 2;
  const playing = active && seen && !still;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => setSeen(e.isIntersecting), { threshold: 0.5 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => setScene((v) => { const n = (v + 1) % scenes; if (!n) setLoop((l) => l + 1); return n; }), STEP);
    return () => clearTimeout(t);
  }, [scene, playing, scenes]);

  const font = L.font === "mesa" ? "font-mesa" : "font-display font-bold tracking-[-0.01em]";
  const k = `${loop}-${scene}`;
  const anim = (c: string) => (playing ? c : "");
  const isCta = scene === scenes - 1;
  const isBig = post.big && scene === 1;
  const bg = brand.photos?.[0];

  return (
    <div ref={ref} className="relative h-full w-full overflow-hidden" style={{ background: L.bg, color: L.fg, containerType: "inline-size" }} aria-label={`${post.format} preview: ${post.hook.join(" ")}`} role="img">
      {bg && (
        <>
          <div key={`bg${loop}`} className={`absolute inset-0 ${anim("kb")}`} style={{ ["--dur" as string]: `${STEP * scenes}ms` }}>
            <Image src={photo(bg, 600)} alt="" fill sizes="300px" className="object-cover" />
          </div>
          <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${L.bg}cc 0%, ${L.bg}33 45%, ${L.bg}e6 100%)` }} />
        </>
      )}

      {/* target lines from the corner */}
      <svg key={`t${loop}`} className="absolute -right-[30%] -top-[18%] w-[95%] opacity-90" viewBox="0 0 100 100" fill="none" aria-hidden="true">
        <circle cx="50" cy="50" r="48" stroke={L.soft} strokeOpacity=".35" strokeWidth=".35" pathLength={1} className={anim("draw")} />
        <circle cx="50" cy="50" r="32" stroke={L.soft} strokeOpacity=".35" strokeWidth=".35" pathLength={1} className={anim("draw")} style={{ animationDelay: "120ms" }} />
        <circle cx="50" cy="50" r="16" stroke={L.accent} strokeWidth=".6" pathLength={1} className={anim("draw")} style={{ animationDelay: "240ms" }} />
      </svg>

      <div className="absolute left-[7%] top-[6%] flex items-center gap-[2cqw] text-[4.2cqw] font-semibold" style={{ color: L.soft }}>
        <span className="inline-block h-[0.5cqw] w-[7cqw]" style={{ background: L.accent }} />{post.format}
      </div>

      <div key={k} className="absolute inset-x-[7%] top-[22%]">
        {isBig ? (
          <div>
            <span className="block overflow-hidden"><span className={`block font-display font-extralight leading-[0.95] ${anim("rise")}`} style={{ fontSize: "26cqw" }}>{post.big}</span></span>
            <span className={`mt-[4cqw] block h-[0.8cqw] w-[22cqw] ${anim("grow-x")}`} style={{ background: L.accent, animationDelay: "250ms" }} />
          </div>
        ) : isCta ? (
          <div>
            <span className="block overflow-hidden"><span className={`block ${font} leading-[1.02] ${anim("rise")}`} style={{ fontSize: "11.5cqw" }}>{post.cta}</span></span>
            <span className={`mt-[6cqw] inline-flex items-center gap-[2cqw] px-[4cqw] py-[2.4cqw] text-[4.4cqw] font-semibold ${anim("fade-up")}`} style={{ background: L.fg, color: L.bg, boxShadow: `inset 0 -0.8cqw 0 ${L.accent}`, animationDelay: "300ms" }}>{post.cta.split(" ").slice(0, 2).join(" ")}</span>
          </div>
        ) : (
          post.hook.map((l, i) => (
            <span key={i} className="block overflow-hidden">
              <span className={`block ${font} leading-[1.02] ${anim("rise")}`} style={{ fontSize: post.hook.join("").length > 34 ? "10cqw" : "12.5cqw", animationDelay: `${i * 110}ms` }}>{l}</span>
            </span>
          ))
        )}
      </div>

      <div className="absolute inset-x-[7%] bottom-[5%] flex items-end justify-between gap-[3cqw]">
        <span className="flex items-center gap-[2cqw] text-[4.4cqw] font-bold tracking-[0.14em]">
          {brand.mark[1] && <svg viewBox="0 0 26 26" className="size-[6cqw]" aria-hidden="true"><circle cx="13" cy="13" r="9.5" fill="none" stroke={L.fg} strokeWidth="3.5" /><rect x="5" y="11.6" width="16" height="2.8" fill={L.accent} /></svg>}
          <span><span style={{ color: brand.mark[1] ? L.accent : L.fg }}>{brand.mark[0]}</span>{brand.mark[1]}</span>
        </span>
        <span className="flex gap-[1cqw]">
          {Array.from({ length: scenes }).map((_, i) => (
            <span key={i} className="h-[0.8cqw] w-[4cqw] transition-colors duration-300" style={{ background: i === scene ? L.fg : `${L.soft}55` }} />
          ))}
        </span>
      </div>
    </div>
  );
}

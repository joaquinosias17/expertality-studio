import Image from "next/image";
import { photo } from "@/lib/data";

// A sample-brand post as it would publish: real photo, the brand's own type, its wordmark.
export function PostThumb({
  img, overlay, ratio = "9/16", size = "sm", sizes = "200px", priority = false,
}: { img: string; overlay: string; ratio?: string; size?: "sm" | "md" | "lg"; sizes?: string; priority?: boolean }) {
  const type = size === "lg" ? "text-[34px] leading-[1.02]" : size === "md" ? "text-[22px] leading-[1.05]" : "text-[13px] leading-[1.1]";
  const pad = size === "sm" ? "p-2" : "p-4";
  return (
    <div className="relative overflow-hidden bg-espresso" style={{ aspectRatio: ratio }}>
      <Image src={photo(img, size === "lg" ? 900 : 500)} alt="" fill sizes={sizes} priority={priority} className="object-cover" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(28,16,10,0.55)_0%,rgba(28,16,10,0)_38%,rgba(28,16,10,0)_62%,rgba(28,16,10,0.6)_100%)]" />
      {size !== "sm" && <>
        <p className={`absolute inset-x-0 top-0 ${pad} font-mesa text-oat ${type}`}>{overlay}</p>
        <p className={`absolute inset-x-0 bottom-0 ${pad} font-mesa text-oat text-[12px] tracking-wide`}>Mesa Coffee Co.</p>
      </>}
    </div>
  );
}

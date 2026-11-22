import { BrandConsole } from "@/components/BrandConsole";

export const metadata = { title: "Calendar · Expertality Studio" };

const STATS = [
  { n: "38", of: "/40", label: "locations approved this week" },
  { n: "142", of: "", label: "posts scheduled" },
  { n: "2", of: "", label: "waiting for you" },
];

export default function CalendarPage() {
  return (
    <main className="mx-auto max-w-[1180px] px-5 py-8 md:px-8 md:py-10">
      <h1 className="font-display text-[30px] font-bold leading-tight text-midnight">Calendar</h1>
      <dl className="mt-6 grid grid-cols-3 border-y border-line bg-white">
        {STATS.map((s, i) => (
          <div key={s.label} className={`px-4 py-5 md:px-6 ${i ? "border-l border-line" : ""}`}>
            <dt className="text-[13px] text-ink-muted">{s.label}</dt>
            <dd className="mt-1 font-display text-[36px] font-extralight leading-none text-midnight tabular md:text-[44px]">{s.n}<span className="text-[20px] text-ink-muted">{s.of}</span></dd>
          </div>
        ))}
      </dl>
      <div className="mt-6 border border-line"><BrandConsole /></div>
      <p className="mt-4 text-[12px] text-ink-muted">Sample data for Mesa Coffee Co., a fictional brand.</p>
    </main>
  );
}

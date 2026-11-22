import { Check } from "./Icons";

const COLS = ["Expertality Studio", "Local freelancer", "Doing it yourself", "Scheduling app"];
const ROWS: { label: string; v: (boolean | string)[] }[] = [
  { label: "Makes the reels and posts for you", v: [true, true, false, false] },
  { label: "Knows your franchise's brand rules", v: [true, "Sometimes", "If you read the manual", false] },
  { label: "Your time each week", v: ["About a minute", "Calls and emails", "Your evenings", "You still make every post"] },
  { label: "English and Spanish", v: [true, "Extra cost", "If you write both", false] },
  { label: "Google posts that bring calls", v: [true, "Sometimes", false, "Some apps"] },
  { label: "Cost per month", v: ["$59", "$500 and up", "Free, but it costs your time", "$25 to $99"] },
];

export function Compare() {
  return (
    <div className="relative overflow-x-auto rounded-2xl border border-line">
      <table className="w-full min-w-[720px] border-collapse text-left text-[15px]">
        <thead>
          <tr>
            <th scope="col" className="w-[30%] p-4 text-[14px] font-semibold text-ink-muted">What you get</th>
            {COLS.map((c, i) => (
              <th key={c} scope="col" className={`p-4 align-bottom text-[14px] font-semibold ${i === 0 ? "bg-midnight text-white shadow-[inset_0_3px_0_var(--color-red)]" : "text-ink-muted"}`}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((r) => (
            <tr key={r.label} className="border-t border-line">
              <th scope="row" className="p-4 font-normal text-ink">{r.label}</th>
              {r.v.map((v, i) => (
                <td key={i} className={`p-4 ${i === 0 ? "bg-midnight/[0.04] font-semibold text-midnight" : "text-body"}`}>
                  {v === true ? <span role="img" aria-label="Yes" className="inline-flex"><Check className="size-5 text-midnight" /></span> : v === false ? <span className="text-ink-muted">No</span> : <span className="tabular">{v}</span>}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

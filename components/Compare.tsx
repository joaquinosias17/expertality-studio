import { Check } from "./Icons";

const COLS = ["Expertality Studio", "Local agency", "Scheduling tool", "Template tool"];
const ROWS: { label: string; v: (boolean | string)[] }[] = [
  { label: "Makes the reels and posts", v: [true, true, false, "Static only"] },
  { label: "Checks every post against your brand guide", v: [true, "By hand", false, false] },
  { label: "Store owner approves in one tap", v: [true, false, false, false] },
  { label: "Schedules and publishes", v: [true, true, true, false] },
  { label: "English and Spanish", v: [true, "Extra cost", false, false] },
  { label: "Price per location, per month", v: ["$29 to $49", "$750 and up", "Per user", "Per user"] },
];

export function Compare() {
  return (
    <div className="relative overflow-x-auto border border-line">
      <table className="w-full min-w-[720px] border-collapse text-left text-[15px]">
        <thead>
          <tr>
            <th scope="col" className="w-[34%] p-4 text-[14px] font-semibold text-ink-muted">What you get</th>
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

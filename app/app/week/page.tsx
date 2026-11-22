import { PhoneWeek } from "@/components/PhoneWeek";

export const metadata = { title: "Store view · Expertality Studio" };

export default function WeekPage() {
  return (
    <main className="px-0 py-0 md:px-8 md:py-10">
      <div className="md:hidden"><PhoneWeek framed={false} /></div>
      <div className="hidden md:grid md:grid-cols-[minmax(0,1fr)_340px] md:items-start md:gap-12 lg:max-w-[980px]">
        <div className="pt-6">
          <h1 className="font-display text-[30px] font-bold leading-tight text-midnight">What the store owner sees</h1>
          <p className="mt-4 max-w-[46ch] text-[16px] leading-relaxed text-body">One screen, on their phone. The week is built from brand campaigns, local ideas and always-on posts. Try approving it.</p>
          <p className="mt-6 max-w-[46ch] text-[14px] leading-relaxed text-ink-muted">The fundraiser post names a partner school, so the brand team sees it first. The store owner does not need to know the rule.</p>
        </div>
        <PhoneWeek />
      </div>
    </main>
  );
}

"use client";
import { useState } from "react";
import { Check } from "./Icons";
export function ReminderButton() {
  const [sent, setSent] = useState(false);
  return sent
    ? <p className="flex min-h-11 items-center gap-1.5 text-[14px] font-semibold text-midnight" role="status"><Check className="size-4" />Reminder sent to 2 owners</p>
    : <button onClick={() => setSent(true)} className="min-h-11 rounded-sm border border-midnight px-5 text-[14px] font-semibold text-midnight hover:bg-midnight hover:text-white active:scale-[0.97]">Send a reminder</button>;
}

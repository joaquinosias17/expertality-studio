import { NextResponse } from "next/server";

// Walkthrough requests. Until a CRM is connected, each request is written to the Vercel runtime log.
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Send the form again." }, { status: 400 }); }
  const s = (k: string) => (typeof body[k] === "string" ? (body[k] as string).trim().slice(0, 200) : "");
  const lead = { name: s("name"), email: s("email"), brand: s("brand"), locations: s("locations") };
  if (!lead.name || !lead.brand || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(lead.email)) {
    return NextResponse.json({ error: "Add your name, brand and a work email." }, { status: 400 });
  }
  console.log("lead", JSON.stringify({ ...lead, at: new Date().toISOString() }));
  return NextResponse.json({ ok: true });
}

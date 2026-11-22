import { NextResponse } from "next/server";

// Walkthrough requests and store waitlist. Until a CRM is connected, each one is written to the Vercel runtime log.
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Send the form again." }, { status: 400 }); }
  const s = (k: string) => (typeof body[k] === "string" ? (body[k] as string).trim().slice(0, 200) : "");
  const lead = {
    kind: s("kind") === "store" ? "store" : "brand",
    name: s("name"), email: s("email"), brand: s("brand"),
    locations: s("locations"), role: s("role"), timeline: s("timeline"), pilot: s("pilot") === "yes", city: s("city"),
  };
  if (!lead.name || !lead.brand || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(lead.email)) {
    return NextResponse.json({ error: "Add your name, business and a valid email." }, { status: 400 });
  }
  console.log("lead", JSON.stringify({ ...lead, at: new Date().toISOString() }));
  return NextResponse.json({ ok: true });
}

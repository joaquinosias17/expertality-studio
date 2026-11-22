import { generateText, Output } from "ai";
import { z } from "zod";

export const maxDuration = 60;

const PostSchema = z.object({
  day: z.enum(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]),
  time: z.string().describe("Local posting time like 8:30 AM"),
  format: z.enum(["Reel", "Post", "Story", "Google post"]),
  hook: z.array(z.string()).min(1).max(3).describe("Headline split into 1 to 3 short lines, at most 4 words per line"),
  big: z.string().optional().describe("Optional short figure shown large, only if it appears in the business info or the idea, like $500 or 4 weeks"),
  caption: z.string().describe("Caption, 1 to 3 short sentences, at most 240 characters"),
  cta: z.string().describe("Call to action, 2 to 5 words, starts with a verb"),
  why: z.string().describe("One short sentence for the owner: why this post, this day"),
});

const hits = new Map<string, { n: number; t: number }>();
function limited(ip: string) {
  const now = Date.now(); const h = hits.get(ip);
  if (!h || now - h.t > 60_000) { hits.set(ip, { n: 1, t: now }); return false; }
  h.n += 1; return h.n > 12;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "local";
  if (limited(ip)) return Response.json({ error: "Too many requests. Wait a minute and try again." }, { status: 429 });

  let body: { mode?: string; brand?: Record<string, unknown>; idea?: string; post?: Record<string, unknown>; tweak?: string; lang?: string };
  try { body = await req.json(); } catch { return Response.json({ error: "Bad request" }, { status: 400 }); }
  const b = body.brand ?? {};
  const str = (v: unknown, max = 600) => (typeof v === "string" ? v.slice(0, max) : "");
  const brandText = [
    `Business: ${str(b.business, 80)}`, `What it sells: ${str(b.sells)}`, `Where: ${str(b.city, 120)}`,
    `Audience: ${str(b.audience, 300)}`, `Offers: ${Array.isArray(b.offers) ? b.offers.map((x) => str(x, 200)).join("; ") : ""}`,
    `Brand rules: ${Array.isArray(b.rules) ? b.rules.map((x) => str(x, 200)).join("; ") : ""}`,
  ].join("\n");
  const lang = body.lang === "es" ? "Spanish" : "English";
  const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });

  const system = `You write social posts for a small business owner who is not a marketer. Today is ${today}.
Rules: plain words, short sentences, no hype, no jargon, no emoji, no long dashes, at most 2 hashtags inside the caption and only if natural.
Never invent statistics, prices, client names or results. Use a number only if it is in the business info or the owner's idea.
Write in ${lang}. Hooks must work as big on-screen text: very short lines.
Use real dates that matter this week or next when they fit (for example Thanksgiving, Small Business Saturday, holidays), but only if they fit the business.`;

  const mode = body.mode === "idea" ? "idea" : body.mode === "rewrite" ? "rewrite" : "week";
  const prompt =
    mode === "week" ? `${brandText}\n\nPlan next week: exactly 4 posts on different days, mixing formats (at least 2 Reels and 1 Google post). Each must give a reason to act.`
    : mode === "idea" ? `${brandText}\n\nThe owner's idea: "${str(body.idea, 400)}"\n\nWrite 3 different posts for this idea: one Reel, one Post, one Story. Pick the best day and time for each.`
    : `${brandText}\n\nRewrite this post. Change requested: "${str(body.tweak, 120)}". Keep the same day, time and format.\nPost: ${JSON.stringify(body.post).slice(0, 1500)}\nReturn it as a list of exactly 1 post.`;

  for (const model of ["anthropic/claude-sonnet-5.5", "anthropic/claude-haiku-5.5"]) {
    try {
      const { output } = await generateText({
        model, system, prompt,
        output: Output.object({ schema: z.object({ posts: z.array(PostSchema).min(1).max(4) }) }),
      });
      return Response.json({ posts: output.posts, model });
    } catch (e) {
      console.error("generate", model, (e as Error).message);
    }
  }
  return Response.json({ error: "The writer is offline right now." }, { status: 503 });
}

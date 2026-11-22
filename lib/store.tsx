"use client";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { Brand, Post, EXPERTALITY, EXPERTALITY_WEEK } from "./brand";

type State = { brand: Brand | null; posts: Post[]; hints: Record<string, boolean>; contact: string; autopilot: boolean };
type Ctx = State & {
  ready: boolean;
  setBrand: (b: Brand) => void;
  setPosts: (p: Post[]) => void;
  updatePost: (id: string, patch: Partial<Post>) => void;
  addPosts: (p: Post[]) => void;
  seeHint: (k: string) => void;
  setContact: (c: string) => void;
  setAutopilot: (v: boolean) => void;
  reset: () => void;
};

const KEY = "studio:v2";
const C = createContext<Ctx | null>(null);
const uid = () => Math.random().toString(36).slice(2, 9);
export const withIds = (ps: Omit<Post, "id" | "status">[]): Post[] => ps.map((p) => ({ ...p, id: uid(), status: "draft" }));

export function StudioProvider({ children }: { children: React.ReactNode }) {
  const [s, set] = useState<State>({ brand: null, posts: [], hints: {}, contact: "", autopilot: true });
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try { const raw = localStorage.getItem(KEY); if (raw) set(JSON.parse(raw)); } catch {}
    setReady(true);
  }, []);
  useEffect(() => { if (ready) { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch {} } }, [s, ready]);

  const api: Ctx = {
    ...s, ready,
    setBrand: useCallback((brand) => set((x) => ({ ...x, brand })), []),
    setPosts: useCallback((posts) => set((x) => ({ ...x, posts })), []),
    updatePost: useCallback((id, patch) => set((x) => ({ ...x, posts: x.posts.map((p) => (p.id === id ? { ...p, ...patch } : p)) })), []),
    addPosts: useCallback((posts) => set((x) => ({ ...x, posts: [...posts, ...x.posts] })), []),
    seeHint: useCallback((k) => set((x) => ({ ...x, hints: { ...x.hints, [k]: true } })), []),
    setContact: useCallback((contact) => set((x) => ({ ...x, contact })), []),
    setAutopilot: useCallback((autopilot) => set((x) => ({ ...x, autopilot })), []),
    reset: useCallback(() => set({ brand: null, posts: [], hints: {}, contact: "", autopilot: true }), []),
  };
  return <C.Provider value={api}>{children}</C.Provider>;
}

export function useStudio() {
  const c = useContext(C);
  if (!c) throw new Error("useStudio outside provider");
  return c;
}

export async function generate(mode: "week" | "idea" | "rewrite", brand: Brand, extra: Record<string, unknown> = {}): Promise<{ posts: Omit<Post, "id" | "status">[]; live: boolean }> {
  try {
    const r = await fetch("/api/generate", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ mode, brand, ...extra }) });
    if (!r.ok) throw new Error(String(r.status));
    const j = await r.json();
    if (!Array.isArray(j.posts) || !j.posts.length) throw new Error("empty");
    return { posts: j.posts, live: true };
  } catch {
    if (mode === "week" && brand.business === EXPERTALITY.business) return { posts: EXPERTALITY_WEEK, live: false };
    return { posts: offline(mode, brand, extra), live: false };
  }
}

// Used when the AI writer is unreachable: simple, safe posts built from what the owner told us.
function offline(mode: string, b: Brand, extra: Record<string, unknown>): Omit<Post, "id" | "status">[] {
  const name = b.business; const what = (b.sells || "what we do").split(/[.:(]/)[0].trim().toLowerCase(); const where = b.city.split(",")[0];
  if (mode === "rewrite") {
    const p = extra.post as Post; const t = String(extra.tweak || "");
    const first = p.caption.split(/(?<=[.!?])\s/)[0];
    return [{ ...p, caption: t.includes("shorter") ? first : t.includes("offer") ? `${p.caption} Ask us about this week's offer.` : t.includes("friendlier") ? `${p.caption} We would love to see you.` : p.caption }];
  }
  if (mode === "idea") {
    const idea = String(extra.idea || "Something new");
    const words = idea.split(" "); const h = [words.slice(0, 3).join(" "), words.slice(3, 6).join(" ")].filter(Boolean);
    return [
      { day: "Thu", time: "9:00 AM", format: "Reel", hook: h, caption: `${idea}. Come see us at ${name}${where ? " in " + where : ""}.`, cta: "Visit us this week", why: "Thursdays reach people planning their weekend." },
      { day: "Fri", time: "11:00 AM", format: "Post", hook: h, caption: `${idea}. Tag someone who should know.`, cta: "Share with a friend", why: "A simple post people can share." },
      { day: "Sat", time: "8:00 AM", format: "Story", hook: h, caption: `${idea}. Today at ${name}.`, cta: "Stop by today", why: "Stories work best on the day itself." },
    ];
  }
  return [
    { day: "Mon", time: "8:00 AM", format: "Reel", hook: ["New week at", name], caption: `A new week at ${name}. Here is what we have for you: ${what}.`, cta: "See what is new", why: "Starts the week by reminding people you are here." },
    { day: "Wed", time: "11:00 AM", format: "Post", hook: ["Thank you,", where || "neighbors"], caption: `Thank you to everyone who stops by ${name}. You are the reason we open every day.`, cta: "Visit us this week", why: "Thank-you posts bring regulars back." },
    { day: "Fri", time: "10:00 AM", format: "Google post", hook: ["Open this", "weekend"], caption: `${name} is open this weekend. Stop by for ${what}.`, cta: "Get directions", why: "Google posts on Friday bring weekend visits." },
    new Date().getMonth() === 10
      ? { day: "Sat", time: "9:00 AM", format: "Reel", hook: ["Small Business", "Saturday"], caption: `Small Business Saturday is the perfect day to visit ${name}. We are local and glad you are here.`, cta: "Shop small today", why: "Small Business Saturday falls on the last Saturday of November." }
      : { day: "Sat", time: "9:00 AM", format: "Reel", hook: ["Made here,", "for you"], caption: `Everything at ${name} is made for this neighborhood. Come say hi this weekend.`, cta: "Visit this weekend", why: "Saturday mornings are when people explore." },
  ];
}

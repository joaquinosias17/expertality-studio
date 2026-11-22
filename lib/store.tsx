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
    throw new Error("The writer is busy. Try again in a moment.");
  }
}

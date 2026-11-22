// Brand profile and post types for the owner app. Kept in the browser (localStorage) in this demo.
export type Look = { id: string; name: string; bg: string; fg: string; accent: string; soft: string; font: "display" | "mesa" };
export type Brand = {
  business: string; sells: string; city: string; audience: string;
  lang: "en" | "es" | "both"; look: Look; mark: [string, string]; photos?: string[];
  rules: string[]; offers: string[];
};
export type Post = {
  id: string; day: string; time: string; format: "Reel" | "Post" | "Story" | "Google post";
  hook: string[]; big?: string; caption: string; cta: string; why: string;
  status: "draft" | "approved" | "skipped";
};

export const LOOKS: Look[] = [
  { id: "midnight", name: "Midnight", bg: "#15233f", fg: "#ffffff", accent: "#b4232f", soft: "#c9cdd6", font: "display" },
  { id: "espresso", name: "Espresso", bg: "#3b2418", fg: "#f3e6d3", accent: "#e07a2e", soft: "#d9c4a8", font: "mesa" },
  { id: "forest", name: "Forest", bg: "#1f3a2e", fg: "#f4efe3", accent: "#e0b84a", soft: "#c8d3c4", font: "display" },
  { id: "ink", name: "Ink", bg: "#111111", fg: "#ffffff", accent: "#ffd23f", soft: "#bdbdbd", font: "display" },
];

export const EXPERTALITY: Brand = {
  business: "Expertality",
  sells: "Go-to-market studio for US B2B companies: GTM Audit ($500, 5 business days), GTM Sprint ($12,000, 4 weeks, ICP to live launch on 2 channels), Growth Retainer. English and Spanish.",
  city: "Remote, serving US companies",
  audience: "Founders and heads of sales at B2B software startups (seed to Series A) and traditional US B2B companies with $2M to $20M in revenue",
  lang: "both",
  look: LOOKS[0],
  mark: ["EXPERT", "ALITY"],
  rules: ["No invented stats or client names", "Never show the founder's name or face", "No long dashes, no hype words", "Red only for small accents"],
  offers: ["GTM Audit: $500, 5 business days, 5 useful fixes or a full refund", "GTM Sprint: $12,000, 4 weeks, live on 2 channels"],
};

export const BLANK_BRAND = (business: string, sells: string, city: string, look: Look): Brand => ({
  business, sells, city, audience: "Local customers", lang: "en", look, mark: [business.toUpperCase(), ""], rules: ["No invented numbers", "Plain, friendly words"], offers: [],
});

// Prewritten week for Expertality, used if the AI service is not reachable.
export const EXPERTALITY_WEEK: Omit<Post, "id" | "status">[] = [
  { day: "Mon", time: "8:30 AM", format: "Reel", hook: ["Find your best", "customers."], big: "4 weeks", caption: "Most B2B teams sell to everyone and win no one. In 4 weeks we define your best customers and launch to them on two channels. In English and Spanish.", cta: "Book a discovery call", why: "Starts the week with your main promise." },
  { day: "Tue", time: "11:00 AM", format: "Post", hook: ["5 fixes.", "5 days."], big: "$500", caption: "The GTM Audit: we review how you find and win customers and hand you 5 fixes you can use. If they are not useful, you get a full refund.", cta: "Start with the audit", why: "Your easiest yes. Low price, clear guarantee." },
  { day: "Thu", time: "9:00 AM", format: "Reel", hook: ["One team.", "Two languages."], caption: "Strategy and execution in English and Spanish, from the same team. Your message lands the same way in both markets.", cta: "See how we work", why: "Shows what makes you different." },
  { day: "Fri", time: "10:00 AM", format: "Google post", hook: ["30 minutes.", "One real insight."], big: "30 min", caption: "Book a 30-minute discovery call. We look at 3 or 4 of your growth problems and you leave with one insight you can act on.", cta: "Book a call", why: "Fridays are when founders plan next week." },
];

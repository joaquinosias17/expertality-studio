// Sample brand used across the demo. Mesa Coffee Co. is fictional; photos are from Unsplash.
export const photo = (id: string, w = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`;

export const PHOTOS = {
  flatlay: "photo-1524671710025-d79530c2f957", // Nathan Dumlao, Unsplash
  icedPour: "photo-1556791766-66ac915737cf", // Pradeep Javedar, Unsplash
  biscotti: "photo-1758900450186-e829f72d25fb", // Sadia Alam, Unsplash
  interior: "photo-1567880905822-56f8e06fe630", // Keghan Crossland, Unsplash
  counter: "photo-1790156590912-2ae0181ec895", // Ceba Solutions, Unsplash
  pourMug: "photo-1577590294232-461f6967e66a", // Nathan Dumlao, Unsplash
  croissants: "photo-1548538931-b47653628cdc", // Mimi Thian, Unsplash
  latteArt: "photo-1541167760496-1628856ab772", // Fahmi Fakhrudin, Unsplash
  glassLatte: "photo-1565210339691-46c2d66d0ac8", // Nicholas Grande, Unsplash
};

// Pricing. Brand is per location per month, billed yearly.
export const BRAND_TIERS = [
  { from: 10, to: 49, price: 49 },
  { from: 50, to: 249, price: 39 },
  { from: 250, to: Infinity, price: 29 },
];
export const brandPrice = (n: number) => (BRAND_TIERS.find((t) => n >= t.from && n <= t.to) ?? BRAND_TIERS[0]).price;
export const setupFee = (n: number) => (n <= 50 ? 2500 : 5000);
export const STORE_MONTHLY = 79;
export const STORE_YEARLY = 790;
export const PILOT = { price: 1500, stores: 10, days: 60 };
export const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

export type Post = {
  id: string;
  day: string;
  time: string;
  format: "Reel" | "Post" | "Google post";
  source: "Brand campaign" | "Your idea" | "Always on";
  title: string;
  overlay: string;
  overlayEs: string;
  caption: string;
  img: string;
  review?: string;
};

export const WEEK: Post[] = [
  {
    id: "p1", day: "Mon", time: "8:00 AM", format: "Reel", source: "Brand campaign",
    title: "Holiday menu is here", overlay: "Holiday menu is here", overlayEs: "Llegó el menú de temporada",
    caption: "Peppermint mocha and gingerbread latte are back at Mesa Coffee Co. on South Congress.", img: PHOTOS.flatlay,
  },
  {
    id: "p2", day: "Tue", time: "7:30 AM", format: "Reel", source: "Your idea",
    title: "School fundraiser Tuesday", overlay: "Fundraiser Tuesday", overlayEs: "Martes de recaudación",
    caption: "From 4 to 7 pm, part of every order goes to our neighborhood elementary school.*", img: PHOTOS.icedPour,
    review: "Names a partner school, so the brand reviews it",
  },
  {
    id: "p3", day: "Wed", time: "11:00 AM", format: "Post", source: "Brand campaign",
    title: "Gift cards for the list", overlay: "Gift cards for the list", overlayEs: "Tarjetas de regalo",
    caption: "The easy gift for the coffee people in your life. Any amount, at the counter.", img: PHOTOS.biscotti,
  },
  {
    id: "p4", day: "Fri", time: "9:00 AM", format: "Google post", source: "Always on",
    title: "Open late on Fridays", overlay: "Open late Fridays", overlayEs: "Abiertos tarde los viernes",
    caption: "Study session or date night: we are open until 10 pm every Friday.", img: PHOTOS.interior,
  },
];

export const CHECKS = [
  { rule: "Brand name written in full on first mention", page: 12, action: "Fixed" },
  { rule: "Offers carry an asterisk and the disclaimer", page: 21, action: "Added" },
  { rule: "Partner names go to brand review", page: 22, action: "Routed" },
  { rule: "Seasonal colors only in season", page: 30, action: "Checked" },
  { rule: "Spanish posts use the official menu names", page: 34, action: "Checked" },
] as const;

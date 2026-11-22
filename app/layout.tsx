import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://expertality-studio.vercel.app"),
  title: "Expertality Studio: on-brand content for every franchise location",
  description:
    "Your brand sets the rules once. Every location makes reels and posts in minutes, in English and Spanish, and they go out on schedule.",
  openGraph: {
    title: "Expertality Studio",
    description: "Every location posts on brand. Every week.",
  },
};

export const viewport: Viewport = { themeColor: "#15233f" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-white focus:p-3">Skip to content</a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

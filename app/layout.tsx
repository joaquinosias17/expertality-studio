import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
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
      <body>{children}</body>
    </html>
  );
}

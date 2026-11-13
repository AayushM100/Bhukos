import type { Metadata } from "next";
import { Literata, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Design.md §4 — Display & Headings: Literata (Serif; weights 500/600/700)
const displayFont = Literata({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
});

// Design.md §4 — Interface & Metadata: Plus Jakarta Sans
const sansFont = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

// Design.md §4 — Ledger Counters & Catalog Codes: JetBrains Mono
const monoFont = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bhukos — A Good Taste Club",
  description: "Keep a diary of India's packaged delights, collectible food cards, and a little piece of every taste.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${sansFont.variable} ${monoFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-canvas text-ink font-sans selection:bg-terra selection:text-white">
        {children}
      </body>
    </html>
  );
}
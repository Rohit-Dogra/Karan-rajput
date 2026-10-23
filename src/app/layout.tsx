import type { Metadata, Viewport } from "next";
import { Archivo, Instrument_Serif } from "next/font/google";
import { artist } from "@/data/artist";
import { latestRelease } from "@/lib/catalogue";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const description = `${artist.name} — Punjabi singer, lyricist and composer. Listen to Sea to Sky, ${latestRelease.title} and every official release, watch the videos, and get in touch for bookings.`;

export const metadata: Metadata = {
  metadataBase: new URL(artist.siteUrl),
  title: {
    default: `${artist.name} — Official Site`,
    template: `%s — ${artist.name}`,
  },
  description,
  keywords: [artist.name, "Punjabi singer", "Punjabi songs", "Sea to Sky", "Unfold", "Honsle", latestRelease.title],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    siteName: `${artist.name} — Official Site`,
    title: `${artist.name} — Official Site`,
    description,
    url: "/",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: `${artist.name} — Official Site`,
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0b0a09",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  name: artist.name,
  url: artist.siteUrl,
  genre: ["Punjabi", "Punjabi Pop", "Hip-Hop"],
  image: artist.portrait.src,
  sameAs: [...artist.socials, ...artist.streaming].map((s) => s.url),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${archivo.variable} ${instrument.variable} antialiased`}>
      <body className="min-h-dvh overflow-x-clip">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-paper focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}

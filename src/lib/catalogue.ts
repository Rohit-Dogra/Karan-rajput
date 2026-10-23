import generated from "@/data/catalogue.generated.json";
import { videos } from "@/data/videos";
import type { Platform, Release, ReleaseType } from "@/data/types";

/** Every release on the artist's verified Apple Music profile, newest first. */
export const releases: Release[] = (generated.releases as Release[])
  .slice()
  .sort((a, b) => b.releaseDate.localeCompare(a.releaseDate));

export const catalogueSyncedAt = generated.syncedAt;

export const latestRelease = releases[0];

export const trackCount = new Set(
  releases.flatMap((r) => r.tracks.map((t) => `${t.title.toLowerCase()}|${t.durationSec}`)),
).size;

export function releaseById(id: string) {
  return releases.find((r) => r.id === id);
}

export function videosForRelease(id: string) {
  return videos.filter((v) => v.releaseId === id);
}

export const platformLabels: Record<Platform, string> = {
  spotify: "Spotify",
  appleMusic: "Apple Music",
  youtubeMusic: "YouTube Music",
  youtube: "YouTube",
  amazonMusic: "Amazon Music",
  deezer: "Deezer",
  tidal: "TIDAL",
  soundcloud: "SoundCloud",
};

/** Order platforms appear in on cards and filters. */
export const platformOrder: Platform[] = [
  "spotify",
  "appleMusic",
  "youtubeMusic",
  "youtube",
  "amazonMusic",
  "deezer",
  "tidal",
  "soundcloud",
];

export const releaseTypeLabels: Record<ReleaseType, string> = {
  album: "Album",
  ep: "EP",
  single: "Single",
};

/** Credits other than Karan Rajput himself, parsed from the store's artist string and track titles. */
export function collaborators(release: Release): string[] {
  const names = new Set<string>();
  const add = (s: string) =>
    s
      .split(/,|&/)
      .map((n) => n.trim())
      .filter((n) => n && n !== "Karan Rajput")
      .forEach((n) => names.add(n));
  add(release.artists);
  for (const t of release.tracks) {
    add(t.artists);
    const feat = t.title.match(/\(feat\. ([^)]+)\)/);
    if (feat) add(feat[1]);
  }
  return [...names];
}

export function formatDate(iso: string, opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "short", year: "numeric" }) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", { ...opts, timeZone: "UTC" });
}

export function formatDuration(sec: number) {
  return `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, "0")}`;
}

/** Sized variant of an Apple artwork URL. */
export function coverAt(url: string, px: number) {
  return url.includes("mzstatic.com") ? url.replace(/\/\d+x\d+bb\.jpg$/, `/${px}x${px}bb.jpg`) : url;
}

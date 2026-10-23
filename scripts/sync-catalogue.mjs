#!/usr/bin/env node
/**
 * Refreshes src/data/catalogue.generated.json from Apple's public iTunes Lookup API —
 * every release + track on the verified Apple Music artist profile (release dates,
 * labels, cover art, Apple Music URLs). No API key is needed.
 *
 * Anything added by hand is kept:
 *   - links to other platforms (Spotify, YouTube Music…) on existing releases
 *   - `note` fields
 *   - releases whose id starts with `sp-` (found on Spotify but not on Apple Music)
 *
 * New Apple releases are added with an Apple Music link only; the script prints them so
 * you can paste in the Spotify album URL (open the release on Spotify → Share → Copy link).
 *
 * Usage:  npm run catalogue:sync
 */
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const APPLE_ARTIST_ID = "1626364025";
const COUNTRY = "in";
const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), "../src/data/catalogue.generated.json");

async function lookup(entity) {
  const url = `https://itunes.apple.com/lookup?id=${APPLE_ARTIST_ID}&entity=${entity}&limit=200&country=${COUNTRY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`iTunes lookup failed: ${res.status}`);
  return (await res.json()).results.slice(1);
}

function releaseType(name, trackCount) {
  if (/ - EP$/.test(name)) return "ep";
  if (/ - Single$/.test(name) || trackCount === 1) return "single";
  return "album";
}

const cleanTitle = (name) => name.replace(/ - (Single|EP)$/, "");
const artwork = (url) => url.replace(/\/\d+x\d+bb\.(jpg|png)$/, "/1200x1200bb.jpg");

async function main() {
  const previous = JSON.parse(await readFile(OUT, "utf8"));
  const byId = new Map(previous.releases.map((r) => [r.id, r]));

  const [albums, songs] = await Promise.all([lookup("album"), lookup("song")]);
  const added = [];

  const fromApple = albums.map((a) => {
    const id = String(a.collectionId);
    const old = byId.get(id);
    if (!old) added.push(cleanTitle(a.collectionName));
    const tracks = songs
      .filter((s) => s.collectionId === a.collectionId)
      .sort((x, y) => x.discNumber - y.discNumber || x.trackNumber - y.trackNumber)
      .map((s) => ({
        title: s.trackName,
        artists: s.artistName,
        trackNumber: s.trackNumber,
        durationSec: Math.round((s.trackTimeMillis ?? 0) / 1000),
        firstReleased: s.releaseDate.slice(0, 10),
        appleMusic: `${s.trackViewUrl.split("?")[0]}?i=${s.trackId}`,
      }));
    return {
      id,
      appleId: id,
      title: cleanTitle(a.collectionName),
      artists: a.artistName,
      type: releaseType(a.collectionName, a.trackCount),
      releaseDate: a.releaseDate.slice(0, 10),
      trackCount: a.trackCount,
      label: (a.copyright ?? "").replace(/^℗\s*\d{4}\s*/, "").trim() || null,
      genre: a.primaryGenreName ?? null,
      explicit: a.collectionExplicitness === "explicit",
      cover: artwork(a.artworkUrl100),
      links: { ...old?.links, appleMusic: a.collectionViewUrl.split("?")[0] },
      tracks,
      ...(old?.note ? { note: old.note } : {}),
    };
  });

  const manual = previous.releases.filter((r) => r.id.startsWith("sp-"));
  const releases = [...fromApple, ...manual].sort((a, b) => b.releaseDate.localeCompare(a.releaseDate));

  const data = { ...previous, syncedAt: new Date().toISOString().slice(0, 10), releases };
  await writeFile(OUT, JSON.stringify(data, null, 2) + "\n");

  console.log(`Wrote ${releases.length} releases to ${path.relative(process.cwd(), OUT)}`);
  if (added.length) {
    console.log(`\nNew on Apple Music — add their Spotify album URLs under "links":`);
    for (const t of added) console.log(`  • ${t}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

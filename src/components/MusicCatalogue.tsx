"use client";

import Image from "next/image";
import { useDeferredValue, useMemo, useState } from "react";
import type { Release, ReleaseType } from "@/data/types";
import { coverAt, formatDate, formatDuration, releaseTypeLabels } from "@/lib/catalogue";
import { SearchIcon } from "./icons";
import { StreamLinks } from "./StreamLinks";

type Item = Release & { collabs: string[]; videoUrl?: string };
type TypeFilter = "all" | ReleaseType;
type PlatformFilter = "all" | "spotify" | "appleMusic" | "video";

const PAGE = 12;

const typeOptions: { value: TypeFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "album", label: "Albums" },
  { value: "ep", label: "EPs" },
  { value: "single", label: "Singles" },
];

const platformOptions: { value: PlatformFilter; label: string }[] = [
  { value: "all", label: "Any platform" },
  { value: "spotify", label: "On Spotify" },
  { value: "appleMusic", label: "On Apple Music" },
  { value: "video", label: "Has a video" },
];

export function MusicCatalogue({ items }: { items: Item[] }) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<TypeFilter>("all");
  const [platform, setPlatform] = useState<PlatformFilter>("all");
  const [year, setYear] = useState("all");
  const [sort, setSort] = useState<"new" | "old">("new");
  const [limit, setLimit] = useState(PAGE);
  const q = useDeferredValue(query.trim().toLowerCase());

  const years = useMemo(() => [...new Set(items.map((i) => i.releaseDate.slice(0, 4)))], [items]);

  const results = useMemo(() => {
    const list = items.filter((r) => {
      if (type !== "all" && r.type !== type) return false;
      if (year !== "all" && !r.releaseDate.startsWith(year)) return false;
      if (platform === "video" ? !r.videoUrl : platform !== "all" && !r.links[platform]) return false;
      if (!q) return true;
      const hay = [r.title, r.artists, r.label ?? "", ...r.collabs, ...r.tracks.map((t) => t.title)].join(" ").toLowerCase();
      return hay.includes(q);
    });
    return sort === "new" ? list : list.slice().reverse();
  }, [items, type, year, platform, q, sort]);

  const visible = results.slice(0, limit);
  const filtered = type !== "all" || platform !== "all" || year !== "all" || q !== "";

  const reset = () => {
    setQuery("");
    setType("all");
    setPlatform("all");
    setYear("all");
    setLimit(PAGE);
  };

  const selectCls =
    "eyebrow h-11 cursor-pointer appearance-none rounded-full border border-line bg-ink px-4 pr-9 text-paper transition-colors hover:border-paper/60 bg-[length:10px] bg-[right_1rem_center] bg-no-repeat";
  const chevron = {
    backgroundImage:
      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' fill='none' stroke='%23f1e8da' stroke-width='1.4'/%3E%3C/svg%3E\")",
  };

  return (
    <div>
      {/* Controls */}
      <div className="z-20 -mx-4 mb-10 lg:sticky lg:top-20 border-y border-line bg-ink/85 px-4 py-4 backdrop-blur-xl sm:-mx-8 sm:px-8 md:top-20">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <label className="relative flex-1">
            <span className="sr-only">Search songs, albums and collaborators</span>
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setLimit(PAGE);
              }}
              placeholder="Search songs, albums, collaborators…"
              className="h-11 w-full rounded-full border border-line bg-ink-2 pl-11 pr-4 text-sm text-paper placeholder:text-muted focus:border-paper/60 focus:outline-none"
            />
          </label>

          <div role="group" aria-label="Release type" className="flex gap-1 overflow-x-auto rounded-full border border-line p-1">
            {typeOptions.map((o) => (
              <button
                key={o.value}
                type="button"
                aria-pressed={type === o.value}
                onClick={() => {
                  setType(o.value);
                  setLimit(PAGE);
                }}
                className={`eyebrow h-9 shrink-0 rounded-full px-4 transition-colors ${
                  type === o.value ? "bg-paper text-ink" : "text-paper/70 hover:text-paper"
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <label>
              <span className="sr-only">Platform</span>
              <select value={platform} onChange={(e) => { setPlatform(e.target.value as PlatformFilter); setLimit(PAGE); }} className={selectCls} style={chevron}>
                {platformOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </label>
            <label>
              <span className="sr-only">Year</span>
              <select value={year} onChange={(e) => { setYear(e.target.value); setLimit(PAGE); }} className={selectCls} style={chevron}>
                <option value="all">All years</option>
                {years.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </label>
            <label>
              <span className="sr-only">Sort</span>
              <select value={sort} onChange={(e) => setSort(e.target.value as "new" | "old")} className={selectCls} style={chevron}>
                <option value="new">Newest first</option>
                <option value="old">Oldest first</option>
              </select>
            </label>
          </div>
        </div>
        <p className="mt-3 text-xs text-muted" aria-live="polite">
          {results.length} of {items.length} releases
          {filtered ? (
            <>
              {" · "}
              <button type="button" onClick={reset} className="underline decoration-ember underline-offset-4 hover:text-paper">
                Clear filters
              </button>
            </>
          ) : null}
        </p>
      </div>

      {/* Grid */}
      {visible.length ? (
        <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((r) => (
            <li key={r.id}>
              <ReleaseCard release={r} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="border border-dashed border-line px-6 py-16 text-center">
          <p className="display text-4xl">Nothing matches</p>
          <p className="mt-2 text-muted">Try another title or clear the filters.</p>
          <button type="button" onClick={reset} className="eyebrow mt-6 rounded-full border border-paper/40 px-5 py-3 hover:bg-paper hover:text-ink">
            Clear filters
          </button>
        </div>
      )}

      {results.length > limit ? (
        <div className="mt-14 flex justify-center">
          <button
            type="button"
            onClick={() => setLimit((l) => l + PAGE)}
            className="eyebrow rounded-full border border-paper/40 px-8 py-4 transition-colors hover:border-paper hover:bg-paper hover:text-ink"
          >
            Show more · {results.length - limit} left
          </button>
        </div>
      ) : null}
    </div>
  );
}

function ReleaseCard({ release: r }: { release: Item }) {
  return (
    <article className="group flex h-full flex-col">
      <div className="relative mb-5 aspect-square overflow-hidden bg-ink-2">
        <Image
          src={coverAt(r.cover, 600)}
          alt={`${r.title} cover art`}
          fill
          sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"
          quality={70}
          className="object-cover transition-transform duration-1000 ease-out-expo group-hover:scale-105"
        />
        <span className="eyebrow absolute left-3 top-3 rounded-full bg-ink/80 px-3 py-1.5 backdrop-blur">
          {releaseTypeLabels[r.type]}
          {r.trackCount > 1 ? ` · ${r.trackCount} tracks` : ""}
        </span>
        {r.explicit ? (
          <span className="absolute right-3 top-3 grid size-6 place-items-center rounded bg-paper/90 text-[0.6rem] font-bold text-ink" title="Explicit">
            E<span className="sr-only">xplicit</span>
          </span>
        ) : null}
      </div>

      <h3 className="display text-4xl transition-colors group-hover:text-ember">{r.title}</h3>
      <p className="mt-2 text-sm text-muted">
        <time dateTime={r.releaseDate}>{formatDate(r.releaseDate)}</time>
        {r.collabs.length ? <> · with {r.collabs.join(", ")}</> : null}
      </p>
      {r.label ? <p className="text-sm text-muted/70">{r.label}</p> : null}
      {r.note ? <p className="mt-2 text-xs italic text-sand">{r.note}</p> : null}

      {r.trackCount > 1 ? (
        <details className="mt-3 text-sm [&_summary::-webkit-details-marker]:hidden">
          <summary className="eyebrow cursor-pointer list-none text-paper/70 hover:text-paper">
            <span className="mr-1 inline-block transition-transform [details[open]_&]:rotate-45">+</span> Tracklist
          </summary>
          <ol className="mt-3 divide-y divide-line border-y border-line">
            {r.tracks.map((t) => (
              <li key={`${t.trackNumber}-${t.title}`} className="flex items-baseline gap-3 py-2">
                <span className="w-5 text-xs text-muted">{t.trackNumber}</span>
                {t.appleMusic ? (
                  <a href={t.appleMusic} target="_blank" rel="noopener noreferrer" className="flex-1 hover:text-ember">
                    {t.title}
                    <span className="sr-only"> on Apple Music (opens in a new tab)</span>
                  </a>
                ) : (
                  <span className="flex-1">{t.title}</span>
                )}
                <span className="text-xs tabular-nums text-muted">{formatDuration(t.durationSec)}</span>
              </li>
            ))}
          </ol>
        </details>
      ) : null}

      <div className="mt-auto pt-5">
        <StreamLinks release={r} videoUrl={r.videoUrl} size="sm" />
      </div>
    </article>
  );
}

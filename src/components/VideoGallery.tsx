"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Video } from "@/data/types";
import { thumbnail, watchUrl } from "@/data/videos";
import { formatDate } from "@/lib/catalogue";
import { ArrowIcon, CloseIcon, PlayIcon } from "./icons";
import { YouTubePlayer } from "./YouTubePlayer";

type Filter = "videos" | "audio" | "all";
const PAGE = 9;

const filters: { value: Filter; label: string; match: (v: Video) => boolean }[] = [
  { value: "videos", label: "Music videos", match: (v) => v.kind === "Official Video" || v.kind === "Performance" },
  { value: "audio", label: "Audio & visualizers", match: (v) => v.kind !== "Official Video" && v.kind !== "Performance" },
  { value: "all", label: "Everything", match: () => true },
];

export function VideoGallery({ videos, featured }: { videos: Video[]; featured: Video }) {
  const [filter, setFilter] = useState<Filter>("videos");
  const [limit, setLimit] = useState(PAGE);
  const [playing, setPlaying] = useState<Video | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const list = videos.filter(filters.find((f) => f.value === filter)!.match).filter((v) => v.id !== featured.id);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (playing && !d.open) d.showModal();
    if (!playing && d.open) d.close();
  }, [playing]);

  return (
    <div>
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <YouTubePlayer video={featured} />
        </div>
        <div className="lg:col-span-4">
          <p className="eyebrow text-ember">Now showing</p>
          <h3 className="display mt-3 text-[clamp(3rem,6vw,5.5rem)]">{featured.title}</h3>
          <p className="mt-3 text-muted">
            {featured.kind} · {formatDate(featured.published)} · {featured.channel}
          </p>
        </div>
      </div>

      <div role="group" aria-label="Filter videos" className="-mx-4 mb-8 mt-16 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        {filters.map((f) => (
          <button
            key={f.value}
            type="button"
            aria-pressed={filter === f.value}
            onClick={() => {
              setFilter(f.value);
              setLimit(PAGE);
            }}
            className={`eyebrow shrink-0 rounded-full border px-5 py-3 transition-colors ${
              filter === f.value ? "border-paper bg-paper text-ink" : "border-line text-paper/70 hover:border-paper/60 hover:text-paper"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {list.slice(0, limit).map((v) => {
          const inner = (
            <>
              <span className="relative block aspect-video overflow-hidden bg-ink-2">
                <Image
                  src={thumbnail(v)}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 92vw"
                  quality={70}
                  className="object-cover transition-transform duration-1000 ease-out-expo group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-ink/20 transition-colors group-hover:bg-transparent" />
                <span className="absolute bottom-3 left-3 grid size-11 place-items-center rounded-full bg-paper text-ink transition-[transform,background-color] duration-500 group-hover:scale-110 group-hover:bg-ember">
                  {v.embeddable ? <PlayIcon size={14} /> : <ArrowIcon size={14} />}
                </span>
              </span>
              <span className="mt-4 flex items-baseline justify-between gap-4">
                <span className="display text-3xl transition-colors group-hover:text-ember">{v.title}</span>
                <span className="eyebrow shrink-0 text-muted">{v.published.slice(0, 4)}</span>
              </span>
              <span className="mt-1 block text-sm text-muted">
                {v.kind} · {v.channel}
                {!v.embeddable ? " · plays on YouTube" : ""}
              </span>
            </>
          );
          return (
            <li key={v.id}>
              {v.embeddable ? (
                <button type="button" onClick={() => setPlaying(v)} className="group block w-full text-left" aria-label={`Play ${v.title} — ${v.kind}`}>
                  {inner}
                </button>
              ) : (
                <a href={watchUrl(v.id)} target="_blank" rel="noopener noreferrer" className="group block" aria-label={`Watch ${v.title} — ${v.kind} on YouTube (opens in a new tab)`}>
                  {inner}
                </a>
              )}
            </li>
          );
        })}
      </ul>

      {list.length > limit ? (
        <div className="mt-14 flex justify-center">
          <button
            type="button"
            onClick={() => setLimit((l) => l + PAGE)}
            className="eyebrow rounded-full border border-paper/40 px-8 py-4 transition-colors hover:border-paper hover:bg-paper hover:text-ink"
          >
            More videos · {list.length - limit} left
          </button>
        </div>
      ) : null}

      <dialog
        ref={dialogRef}
        onClose={() => setPlaying(null)}
        onClick={(e) => e.target === dialogRef.current && setPlaying(null)}
        aria-label={playing ? `${playing.title} — ${playing.kind}` : "Video player"}
        className="m-auto w-[min(1200px,calc(100vw-2rem))] max-w-none bg-transparent p-0 text-paper backdrop:bg-ink/90 backdrop:backdrop-blur-sm"
      >
        {playing ? (
          <div className="fade-in">
            <div className="mb-3 flex items-center justify-between gap-4">
              <p className="display truncate text-3xl">
                {playing.title} <span className="font-serif text-xl normal-case italic text-muted">{playing.kind}</span>
              </p>
              <button type="button" onClick={() => setPlaying(null)} className="eyebrow flex shrink-0 items-center gap-2 hover:text-ember" autoFocus>
                Close <CloseIcon />
              </button>
            </div>
            <YouTubePlayer key={playing.id} video={playing} autoplay />
          </div>
        ) : null}
      </dialog>
    </div>
  );
}

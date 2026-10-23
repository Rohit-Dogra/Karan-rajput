"use client";

import Image from "next/image";
import { useState } from "react";
import { thumbnail, watchUrl } from "@/data/videos";
import type { Video } from "@/data/types";
import { ArrowIcon, PlayIcon } from "./icons";

/**
 * Click-to-load YouTube player: shows the official thumbnail until the visitor presses play,
 * so no third-party player (or its cookies) loads with the page. Uses youtube-nocookie.com.
 * Videos whose uploader disabled embedding open on YouTube instead.
 */
export function YouTubePlayer({ video, autoplay = false, className = "" }: { video: Video; autoplay?: boolean; className?: string }) {
  const [active, setActive] = useState(autoplay);
  const [loaded, setLoaded] = useState(false);
  const label = `${video.title} — ${video.kind}`;

  if (active && video.embeddable) {
    return (
      <div className={`relative aspect-video w-full overflow-hidden bg-ink-2 ${className}`}>
        {!loaded ? (
          <div className="absolute inset-0 grid place-items-center" role="status">
            <span className="size-10 animate-spin rounded-full border-2 border-paper/20 border-t-ember" />
            <span className="sr-only">Loading video</span>
          </div>
        ) : null}
        <iframe
          className="absolute inset-0 size-full"
          src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`}
          title={label}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          onLoad={() => setLoaded(true)}
        />
      </div>
    );
  }

  const poster = (
    <>
      <Image
        src={thumbnail(video)}
        alt=""
        fill
        sizes="(min-width: 1024px) 60vw, 100vw"
        className="object-cover transition-transform duration-1000 ease-out-expo group-hover:scale-[1.03]"
      />
      <span className="absolute inset-0 bg-ink/30 transition-colors duration-500 group-hover:bg-ink/10" />
      <span className="absolute inset-0 grid place-items-center">
        <span className="flex items-center gap-3 rounded-full bg-paper px-6 py-4 text-ink shadow-2xl transition-[transform,background-color] duration-500 ease-out-expo group-hover:scale-105 group-hover:bg-ember">
          {video.embeddable ? <PlayIcon size={16} /> : <ArrowIcon size={16} />}
          <span className="eyebrow">{video.embeddable ? "Play" : "Watch on YouTube"}</span>
        </span>
      </span>
    </>
  );

  return video.embeddable ? (
    <button
      type="button"
      onClick={() => setActive(true)}
      className={`group relative block aspect-video w-full overflow-hidden bg-ink-2 ${className}`}
      aria-label={`Play ${label}`}
    >
      {poster}
    </button>
  ) : (
    <a
      href={watchUrl(video.id)}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative block aspect-video w-full overflow-hidden bg-ink-2 ${className}`}
      aria-label={`Watch ${label} on YouTube (opens in a new tab)`}
    >
      {poster}
    </a>
  );
}

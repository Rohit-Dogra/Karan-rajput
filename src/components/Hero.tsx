import type React from "react";
import Image from "next/image";
import { artist } from "@/data/artist";
import { formatDate, latestRelease, releases } from "@/lib/catalogue";
import { PlayIcon } from "./icons";

export function Hero() {
  const [first, last] = artist.name.toUpperCase().split(" ");
  const firstYear = releases.at(-1)!.releaseDate.slice(0, 4);

  return (
    <section id="top" aria-labelledby="hero-title" className="grain relative isolate flex min-h-[100svh] flex-col overflow-hidden">
      {/* Portrait — official channel photo, right-weighted on desktop, full-bleed on mobile */}
      <div className="absolute inset-x-0 top-0 bottom-[42%] -z-10 [mask-image:linear-gradient(to_bottom,black_55%,transparent)] md:bottom-0 md:left-[34%] md:top-16 md:[mask-image:linear-gradient(to_right,transparent,black_35%)]">
        <div className="parallax absolute inset-0">
          <Image
            src={artist.hero.src}
            alt={artist.hero.alt}
            fill
            preload
            quality={85}
            sizes="(min-width: 768px) 62vw, 100vw"
            className="fade-in object-cover object-[var(--pos-m)] md:object-[var(--pos-d)]"
            style={{ "--pos-m": artist.hero.position.mobile, "--pos-d": artist.hero.position.desktop } as React.CSSProperties}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/20" />
        <div className="absolute inset-0 bg-ink/15 md:hidden" />
      </div>

      <div className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-end px-4 pb-10 pt-28 sm:px-8 md:pb-14">
        <p className="eyebrow rise mb-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-paper/80" style={{ animationDelay: "150ms" }}>
          <span className="inline-block size-2 rounded-full bg-ember" aria-hidden />
          {artist.roles.join(" · ")}
          <span className="text-paper/40">/</span>
          Releasing since {firstYear}
        </p>

        <h1 id="hero-title" className="display text-[clamp(5.5rem,min(24vw,30svh),22rem)]">
          <span className="block overflow-hidden">
            <span className="rise block" style={{ animationDelay: "250ms" }}>
              {first}
            </span>
          </span>
          <span className="block overflow-hidden">
            <span className="rise block text-transparent [-webkit-text-stroke:1.5px_var(--paper)] md:[-webkit-text-stroke:2px_var(--paper)]" style={{ animationDelay: "380ms" }}>
              {last}
            </span>
          </span>
        </h1>

        <div className="mt-8 grid gap-8 md:mt-10 md:grid-cols-12 md:items-end">
          <p className="rise font-serif text-[clamp(1.6rem,3.4vw,2.75rem)] italic leading-[1.05] text-paper md:col-span-5" style={{ animationDelay: "520ms" }}>
            {artist.tagline}
          </p>

          <div className="rise flex flex-wrap gap-3 md:col-span-4" style={{ animationDelay: "640ms" }}>
            <a href="#music" className="eyebrow inline-flex items-center gap-3 rounded-full bg-ember px-7 py-4 text-ink transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-paper">
              <PlayIcon size={14} /> Listen now
            </a>
            <a href="#videos" className="eyebrow inline-flex items-center gap-3 rounded-full border border-paper/40 px-7 py-4 transition-colors duration-300 hover:border-paper hover:bg-paper hover:text-ink">
              Watch videos
            </a>
          </div>

          <a
            href="#featured"
            className="rise group flex items-center gap-4 border-t border-line pt-4 md:col-span-3 md:justify-self-end"
            style={{ animationDelay: "760ms" }}
          >
            <span className="relative size-16 shrink-0 overflow-hidden">
              <Image src={latestRelease.cover} alt="" fill sizes="64px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
            </span>
            <span>
              <span className="eyebrow block text-ember">Out now</span>
              <span className="display block text-3xl">{latestRelease.title}</span>
              <span className="text-sm text-muted">{formatDate(latestRelease.releaseDate)}</span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

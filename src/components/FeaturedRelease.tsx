import Image from "next/image";
import { collaborators, formatDate, formatDuration, latestRelease, releaseTypeLabels, videosForRelease } from "@/lib/catalogue";
import { watchUrl } from "@/data/videos";
import { Reveal } from "./Reveal";
import { StreamLinks } from "./StreamLinks";
import { YouTubePlayer } from "./YouTubePlayer";

export function FeaturedRelease() {
  const r = latestRelease;
  const video = videosForRelease(r.id)[0];
  const collabs = collaborators(r);
  const duration = r.tracks.reduce((s, t) => s + t.durationSec, 0);

  return (
    <section id="featured" aria-labelledby="featured-title" className="relative overflow-hidden border-y border-line bg-ink-2">
      {/* Oversized backdrop title */}
      <p aria-hidden className="display pointer-events-none absolute -right-4 top-6 select-none text-[clamp(8rem,30vw,28rem)] text-paper/[0.03]">
        {r.title}
      </p>

      <div className="relative mx-auto grid max-w-[1600px] gap-10 px-4 py-20 sm:px-8 md:py-32 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow mb-6 flex items-center gap-3 text-muted">
            <span className="text-ember">Featured release</span>
            <span aria-hidden className="h-px w-8 bg-line" />
            Newest
          </p>
          <div className="relative aspect-square w-full max-w-[560px] overflow-hidden shadow-[0_40px_120px_-40px_rgba(229,67,44,0.45)]">
            <Image src={r.cover} alt={`${r.title} cover art`} fill sizes="(min-width: 1024px) 40vw, 92vw" quality={85} className="object-cover" />
          </div>
        </Reveal>

        <div className="flex flex-col justify-end gap-8 lg:col-span-7">
          <Reveal>
            <h2 id="featured-title" className="display text-[clamp(4rem,13vw,11rem)]">
              {r.title}
            </h2>
            <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-6 text-sm sm:grid-cols-4">
              <div>
                <dt className="eyebrow text-muted">Type</dt>
                <dd className="mt-1">{releaseTypeLabels[r.type]}</dd>
              </div>
              <div>
                <dt className="eyebrow text-muted">Released</dt>
                <dd className="mt-1">{formatDate(r.releaseDate)}</dd>
              </div>
              <div>
                <dt className="eyebrow text-muted">Length</dt>
                <dd className="mt-1">{formatDuration(duration)}</dd>
              </div>
              <div>
                <dt className="eyebrow text-muted">Label</dt>
                <dd className="mt-1">{r.label ?? "—"}</dd>
              </div>
              {collabs.length ? (
                <div className="col-span-2 sm:col-span-4">
                  <dt className="eyebrow text-muted">With</dt>
                  <dd className="mt-1">{collabs.join(", ")}</dd>
                </div>
              ) : null}
            </dl>
          </Reveal>

          {video ? (
            <Reveal delay={120}>
              <YouTubePlayer video={video} />
              <p className="mt-3 text-sm text-muted">
                {video.kind} · {video.channel} on YouTube
              </p>
            </Reveal>
          ) : null}

          <Reveal delay={200}>
            <StreamLinks release={r} videoUrl={video ? watchUrl(video.id) : undefined} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

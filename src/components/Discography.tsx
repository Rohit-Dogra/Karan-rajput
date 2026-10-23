import Image from "next/image";
import { artist } from "@/data/artist";
import { collaborators, coverAt, formatDate, releases, releaseTypeLabels } from "@/lib/catalogue";
import { AppleMusicIcon, ArrowIcon, SpotifyIcon } from "./icons";
import { Reveal } from "./Reveal";

export function Discography() {
  const byYear = Map.groupBy(releases, (r) => r.releaseDate.slice(0, 4));
  const longForm = releases.filter((r) => r.type !== "single");

  return (
    <div className="space-y-24">
      {/* Albums & EPs */}
      <div>
        <h3 className="eyebrow mb-8 text-muted">Albums &amp; EPs</h3>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {longForm.map((r, i) => (
            <Reveal as="li" key={r.id} delay={i * 100}>
              <a href={r.links.spotify ?? r.links.appleMusic} target="_blank" rel="noopener noreferrer" className="group block">
                <span className="relative block aspect-square overflow-hidden">
                  <Image src={coverAt(r.cover, 1200)} alt={`${r.title} cover art`} fill sizes="(min-width: 1024px) 23vw, (min-width: 640px) 46vw, 92vw" className="object-cover transition-transform duration-1000 ease-out-expo group-hover:scale-105" />
                </span>
                <span className="mt-5 flex items-baseline justify-between gap-4 border-b border-line pb-4">
                  <span className="display text-4xl transition-colors group-hover:text-ember">{r.title}</span>
                  <span className="eyebrow text-muted">
                    {releaseTypeLabels[r.type]} · {r.releaseDate.slice(0, 4)}
                  </span>
                </span>
                <span className="mt-3 block text-sm text-muted">
                  {r.trackCount} tracks · {r.label} <ArrowIcon size={12} className="ml-1 inline" />
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>

      {/* Full timeline */}
      <div>
        <h3 className="eyebrow mb-8 text-muted">Every release, by year</h3>
        <div className="border-t border-line">
          {[...byYear].map(([year, list]) => (
            <Reveal key={year} className="grid gap-4 border-b border-line py-8 md:grid-cols-12">
              <p className="display text-6xl text-paper/25 md:col-span-2 md:text-7xl">{year}</p>
              <ol className="md:col-span-10">
                {list.map((r) => {
                  const collabs = collaborators(r);
                  return (
                    <li key={r.id} className="grid grid-cols-[1fr_auto] items-baseline gap-x-4 gap-y-1 py-2 sm:grid-cols-[7rem_1fr_auto]">
                      <time dateTime={r.releaseDate} className="hidden text-sm tabular-nums text-muted sm:block">
                        {formatDate(r.releaseDate, { day: "numeric", month: "short" })}
                      </time>
                      <p className="min-w-0">
                        <span className="font-semibold">{r.title}</span>
                        <span className="ml-2 text-sm text-muted">
                          {releaseTypeLabels[r.type]}
                          {collabs.length ? ` · with ${collabs.join(", ")}` : ""}
                          <span className="sm:hidden"> · {formatDate(r.releaseDate)}</span>
                        </span>
                      </p>
                      <span className="flex gap-3 text-muted">
                        {r.links.spotify ? (
                          <a href={r.links.spotify} target="_blank" rel="noopener noreferrer" className="hover:text-paper" aria-label={`${r.title} on Spotify`}>
                            <SpotifyIcon size={16} />
                          </a>
                        ) : null}
                        {r.links.appleMusic ? (
                          <a href={r.links.appleMusic} target="_blank" rel="noopener noreferrer" className="hover:text-paper" aria-label={`${r.title} on Apple Music`}>
                            <AppleMusicIcon size={16} />
                          </a>
                        ) : null}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Credits on other artists' releases */}
      <div className="grid gap-8 md:grid-cols-12">
        <h3 className="eyebrow text-muted md:col-span-2">Also credited on</h3>
        <ul className="grid gap-4 sm:grid-cols-2 md:col-span-10">
          {artist.credits.map((c) => (
            <li key={c.title}>
              <a href={c.url} target="_blank" rel="noopener noreferrer" className="group flex items-baseline justify-between gap-4 border border-line p-5 transition-colors hover:border-paper/50">
                <span>
                  <span className="display block text-3xl group-hover:text-ember">{c.title}</span>
                  <span className="text-sm text-muted">{c.role}</span>
                </span>
                <span className="eyebrow text-muted">{c.year}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

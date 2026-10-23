import Image from "next/image";
import { artist, sources } from "@/data/artist";
import { releases } from "@/lib/catalogue";
import { Reveal } from "./Reveal";

export function About() {
  const firstYear = releases.at(-1)!.releaseDate.slice(0, 4);

  return (
    <section id="about" aria-labelledby="about-title" className="grain relative bg-paper text-ink">
      <div className="mx-auto max-w-[1600px] px-4 py-24 sm:px-8 md:py-36">
        <Reveal>
          <p className="eyebrow mb-4 flex items-center gap-3 text-ink/60">
            <span className="text-ember">04</span>
            <span aria-hidden className="h-px w-8 bg-ink/20" />
            About the artist
          </p>
          <h2 id="about-title" className="display text-[clamp(3.25rem,11vw,9.5rem)]">
            Writes it.
            <br />
            Sings it<span className="text-ember">.</span>
          </h2>
        </Reveal>

        <Reveal className="relative mt-14 aspect-[2048/339] min-h-56 w-full overflow-hidden md:mt-20">
          <Image src={artist.banner.src} alt={artist.banner.alt} fill sizes="100vw" quality={85} className="object-cover object-[80%_50%]" />
        </Reveal>
        <p className="mt-3 text-xs text-ink/50">{artist.banner.credit}</p>

        <div className="mt-16 grid gap-12 md:grid-cols-12">
          <Reveal className="space-y-6 text-lg leading-relaxed md:col-span-7 md:text-xl">
            <p className="font-serif text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.1]">{artist.bio[0]}</p>
            {artist.bio.slice(1).map((p) => (
              <p key={p.slice(0, 24)} className="text-ink/80">
                {p}
              </p>
            ))}
          </Reveal>

          <Reveal as="aside" delay={150} className="space-y-10 md:col-span-4 md:col-start-9">
            <dl className="grid grid-cols-2 gap-6 border-t border-ink/15 pt-6">
              <div>
                <dt className="eyebrow text-ink/50">Roles</dt>
                <dd className="mt-2">{artist.roles.join(", ")}</dd>
              </div>
              <div>
                <dt className="eyebrow text-ink/50">From</dt>
                <dd className="mt-2">{artist.country}</dd>
              </div>
              <div>
                <dt className="eyebrow text-ink/50">Releasing since</dt>
                <dd className="mt-2">{firstYear}</dd>
              </div>
              <div>
                <dt className="eyebrow text-ink/50">Releases</dt>
                <dd className="mt-2">{releases.length}</dd>
              </div>
            </dl>
            <div className="border-t border-ink/15 pt-6">
              <p className="eyebrow text-ink/50">Collaborators</p>
              <p className="mt-2 leading-relaxed">{artist.collaborators.join(" · ")}</p>
            </div>
            <div className="border-t border-ink/15 pt-6">
              <p className="eyebrow text-ink/50">Labels</p>
              <p className="mt-2 leading-relaxed">{artist.labels.join(" · ")}</p>
            </div>
            <div className="border-t border-ink/15 pt-6">
              <p className="eyebrow text-ink/50">Sources</p>
              <ul className="mt-2 space-y-1 text-sm">
                {sources.map((s) => (
                  <li key={s.url}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="underline decoration-ink/25 underline-offset-4 hover:decoration-ember">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

import { artist } from "@/data/artist";
import { catalogueSyncedAt } from "@/lib/catalogue";
import { PlatformIcon } from "./icons";
import { navItems } from "@/data/nav";

export function SiteFooter() {
  const year = new Date(`${catalogueSyncedAt}T00:00:00Z`).getUTCFullYear();

  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-[1600px] px-4 pb-10 pt-20 sm:px-8">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-serif text-3xl italic leading-tight">{artist.tagline}</p>
            <ul className="mt-8 flex gap-3">
              {artist.socials.map((s) => (
                <li key={s.url}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${s.label} ${s.handle}`}
                    className="grid size-12 place-items-center rounded-full border border-line transition-colors hover:border-paper hover:bg-paper hover:text-ink"
                  >
                    <PlatformIcon platform={s.platform} size={18} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer" className="md:col-span-3">
            <p className="eyebrow mb-4 text-muted">Explore</p>
            <ul className="space-y-2">
              {navItems.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="hover:text-ember">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <p className="eyebrow mb-4 text-muted">Listen</p>
            <ul className="space-y-2">
              {artist.streaming.map((s) => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-ember">
                    <PlatformIcon platform={s.platform} size={16} /> {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p aria-hidden className="display mt-20 select-none whitespace-nowrap text-[clamp(4rem,19.5vw,22rem)] leading-[0.75] text-paper/[0.06]">
          {artist.name}
        </p>

        <div className="mt-8 flex flex-col gap-2 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:justify-between">
          <p>
            © {year} {artist.name}. Music, artwork and videos © their respective labels and rights holders.
          </p>
          <p>Catalogue last checked {catalogueSyncedAt}.</p>
        </div>
      </div>
    </footer>
  );
}

import { milestones, press } from "@/data/artist";
import { formatDate } from "@/lib/catalogue";
import { ArrowIcon } from "./icons";
import { Reveal } from "./Reveal";

export function Press() {
  return (
    <div className="space-y-16">
      <ul className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {milestones.map((m, i) => (
          <Reveal as="li" key={m.label} delay={(i % 3) * 80} className="flex flex-col bg-ink p-8">
            <p className="display text-[clamp(4rem,8vw,6.5rem)] text-sand">{m.figure}</p>
            <p className="mt-4 flex-1 text-lg leading-snug">{m.label}</p>
            <a href={m.source.url} target="_blank" rel="noopener noreferrer" className="eyebrow mt-6 inline-flex items-center gap-2 text-muted hover:text-paper">
              Source: {m.source.label} <ArrowIcon size={12} />
            </a>
          </Reveal>
        ))}
      </ul>

      {press.length ? (
        <ul className="border-t border-line">
          {press.map((p) => (
            <li key={p.url} className="border-b border-line">
              <a href={p.url} target="_blank" rel="noopener noreferrer" className="group grid gap-2 py-6 md:grid-cols-[14rem_1fr_auto] md:items-baseline">
                <span className="eyebrow text-muted">{p.outlet}</span>
                <span className="font-serif text-3xl group-hover:text-ember">{p.title}</span>
                {p.date ? <span className="text-sm text-muted">{formatDate(p.date)}</span> : null}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="max-w-2xl text-sm text-muted">
          View counts were read from the linked YouTube pages on 23 October 2026. Press features and interviews will be listed here as they are published.
        </p>
      )}
    </div>
  );
}

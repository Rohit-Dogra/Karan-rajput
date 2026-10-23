import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function SectionHeading({
  index,
  eyebrow,
  title,
  aside,
  id,
}: {
  index: string;
  eyebrow: string;
  title: ReactNode;
  aside?: ReactNode;
  id?: string;
}) {
  return (
    <Reveal className="mb-10 grid gap-6 md:mb-16 md:grid-cols-12 md:items-end">
      <div className="md:col-span-8">
        <p className="eyebrow mb-4 flex items-center gap-3 text-muted">
          <span className="text-ember">{index}</span>
          <span aria-hidden className="h-px w-8 bg-line" />
          {eyebrow}
        </p>
        <h2 id={id} className="display text-[clamp(3.25rem,11vw,9.5rem)]">
          {title}
        </h2>
      </div>
      {aside ? <div className="text-base leading-relaxed text-muted md:col-span-4 md:pb-3">{aside}</div> : null}
    </Reveal>
  );
}

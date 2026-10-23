import { events } from "@/data/artist";
import { formatDate } from "@/lib/catalogue";
import { ArrowIcon } from "./icons";
import { Reveal } from "./Reveal";

export function Live() {
  if (events.length) {
    return (
      <ul className="border-t border-line">
        {events.map((e) => (
          <Reveal as="li" key={`${e.date}-${e.city}`} className="grid grid-cols-[auto_1fr] items-center gap-6 border-b border-line py-6 md:grid-cols-[12rem_1fr_1fr_auto]">
            <time dateTime={e.date} className="display text-4xl">
              {formatDate(e.date, { day: "2-digit", month: "short" })}
            </time>
            <p className="display text-4xl">{e.city}</p>
            <p className="text-muted">{e.venue}</p>
            {e.ticketsUrl ? (
              <a href={e.ticketsUrl} target="_blank" rel="noopener noreferrer" className="eyebrow rounded-full bg-paper px-5 py-3 text-ink hover:bg-ember">
                Tickets
              </a>
            ) : null}
          </Reveal>
        ))}
      </ul>
    );
  }

  return (
    <Reveal className="grid gap-10 border border-line p-6 sm:p-10 md:grid-cols-12 md:p-14">
      <div className="md:col-span-7">
        <p className="eyebrow text-ember">No dates announced</p>
        <p className="display mt-4 text-[clamp(2.75rem,7vw,6rem)]">Bring the set to your stage.</p>
      </div>
      <div className="flex flex-col justify-end gap-6 md:col-span-5">
        <p className="text-lg leading-relaxed text-muted">
          There are no confirmed upcoming shows right now. To book Karan for a live show or private event, send an enquiry with the date and city.
        </p>
        <a href="#contact" className="eyebrow inline-flex w-fit items-center gap-3 rounded-full bg-ember px-7 py-4 text-ink transition-colors hover:bg-paper">
          Booking enquiry <ArrowIcon size={14} />
        </a>
      </div>
    </Reveal>
  );
}

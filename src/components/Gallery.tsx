import Image from "next/image";
import { gallery, type GalleryImage } from "@/data/gallery";
import { Reveal } from "./Reveal";

/** Editorial, asymmetric grid — each image's placement is set in data/gallery.ts. */
export function Gallery() {
  return (
    <ul className="grid auto-rows-[minmax(16rem,auto)] gap-4 md:grid-cols-12 md:gap-6">
      {gallery.map((g, i) => (
        <Reveal as="li" key={g.src} delay={(i % 3) * 90} className={g.span}>
          <Tile image={g} priority={i < 2} />
        </Reveal>
      ))}
    </ul>
  );
}

function Tile({ image: g, priority }: { image: GalleryImage; priority: boolean }) {
  const cols = Number(g.span.match(/col-span-(\d+)/)?.[1] ?? 6);
  const inner = (
    <>
      <Image
        src={g.src}
        alt={g.alt}
        fill
        sizes={`(min-width: 768px) ${Math.round((cols / 12) * 100)}vw, 92vw`}
        quality={85}
        loading={priority ? "eager" : "lazy"}
        style={g.position ? { objectPosition: g.position } : undefined}
        className="object-cover grayscale-[35%] transition-[transform,filter] duration-1000 ease-out-expo group-hover:scale-105 group-hover:grayscale-0"
      />
      <span className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-ink/90 to-transparent p-4 pt-12 text-sm opacity-0 transition-[opacity,transform] duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
        {g.caption}
      </span>
    </>
  );
  const cls = "group relative block h-full min-h-72 overflow-hidden bg-ink-2";

  return g.href ? (
    <a href={g.href} target="_blank" rel="noopener noreferrer" className={cls}>
      {inner}
    </a>
  ) : (
    <figure className={cls} tabIndex={0}>
      {inner}
    </figure>
  );
}

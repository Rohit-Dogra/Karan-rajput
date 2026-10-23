import { platformLabels, platformOrder } from "@/lib/catalogue";
import type { Release } from "@/data/types";
import { PlatformIcon } from "./icons";

/** Buttons for every platform the release is verified on. Platforms without a link are simply not shown. */
export function StreamLinks({
  release,
  videoUrl,
  size = "md",
}: {
  release: Pick<Release, "title" | "links">;
  videoUrl?: string;
  size?: "sm" | "md";
}) {
  const links = platformOrder
    .filter((p) => release.links[p])
    .map((p) => ({ key: p, label: platformLabels[p], url: release.links[p]! }));
  if (videoUrl && !release.links.youtube) links.push({ key: "youtube", label: "YouTube", url: videoUrl });

  const cls =
    size === "sm"
      ? "gap-1.5 px-3 py-2 text-[0.65rem]"
      : "gap-2.5 px-5 py-3 text-[0.7rem]";

  return (
    <ul className="flex flex-wrap gap-2" aria-label={`Listen to ${release.title}`}>
      {links.map((l) => (
        <li key={l.key}>
          <a
            href={l.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center rounded-full border border-line font-semibold uppercase tracking-[0.16em] transition-colors duration-300 hover:border-paper hover:bg-paper hover:text-ink ${cls}`}
          >
            <PlatformIcon platform={l.key} size={size === "sm" ? 13 : 16} />
            {l.label}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

# Karan Rajput — Official Site

The official website for Punjabi singer, lyricist and composer **Karan Rajput**, built with Next.js 16 (App Router, Cache Components), TypeScript and Tailwind CSS 4.

The page is a single scrolling page with these sections: Hero → Featured release → Music catalogue → Videos → Discography → About → Gallery → Live → Press & milestones → Booking → Footer.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (fully static except /api/contact)
npm run start
npm run lint && npm run typecheck
```

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` before deploying. That URL is used in the canonical link, the Open Graph tags and the sitemap.

## Where the content lives

All content is data, so you can update the site without touching any components.

| File | What it holds |
| --- | --- |
| `src/data/catalogue.generated.json` | Every release and track. It comes from Apple Music, is cross-checked against Spotify, and stores the links to both. |
| `src/data/videos.ts` | Official YouTube uploads (his channel and his labels), each with a flag saying whether it can be embedded. |
| `src/data/artist.ts` | Bio, social links, labels, collaborators, milestones, press, events, and the sources for these facts. |
| `src/data/gallery.ts` | Gallery images and their credits. |
| `src/data/nav.ts` | Navigation links. |

### Adding a new release

1. Run `npm run catalogue:sync`. It pulls the latest releases from Apple's public iTunes Lookup API (no key needed), keeps every link and note you added by hand, and lists any new releases.
2. For each new release, add its Spotify album URL under `"links"` in `catalogue.generated.json` (on Spotify: Share → Copy link).
3. If it has an official video, add a line at the top of `src/data/videos.ts`. Set `embeddable: false` when the uploader has turned off embedding, which you can check with `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=ID` (it returns a 401). Set `hasMaxRes: true` when `https://i.ytimg.com/vi/ID/maxresdefault.jpg` is a real image and not a 120×90 placeholder.

The newest release automatically becomes the Featured release and the "Out now" card in the hero.

Releases that only exist on Spotify (currently *L.A*) have ids starting with `sp-`. The sync script never touches them.

To take a release off the site, delete it from `releases` and add `{ "id", "title" }` to the `excluded` list in the same file. The sync script will never re-add anything in that list.

### Adding press, events or a booking address

- **Press:** append to `press` in `src/data/artist.ts`. The press list appears once it has entries.
- **Events:** append to `events`. The section switches from the booking panel to a dates list.
- **Booking:** see below.

## Booking form

The form validates input in the browser, and the server validates it again in `src/app/api/contact/route.ts`. The route also has a honeypot field and a simple per-IP rate limit. Delivery is set up with **server-only** environment variables, so no secret ever reaches the browser:

| Option | Variables |
| --- | --- |
| Email via [Resend](https://resend.com) | `RESEND_API_KEY`, `BOOKING_EMAIL`, and optionally `CONTACT_FROM_EMAIL` (a sender on a domain you've verified in Resend) |
| Webhook (Zapier, Make, Slack, a CRM…) | `CONTACT_WEBHOOK_URL`, which receives each enquiry as JSON |

With neither set, the API answers `503`. The form then says online booking isn't switched on yet, disables the Send button, and points visitors to Instagram. No enquiry is lost or silently dropped.

## Media and rights

- Cover art, video thumbnails and channel art are **hot-linked from the official platforms** (Apple, Spotify, YouTube) through `next/image`. Nothing is downloaded or re-hosted, and the allowed hosts are listed in `next.config.ts`.
- Videos play in a click-to-load `youtube-nocookie.com` embed, so nothing from YouTube loads until a visitor presses play. Uploads with embedding disabled link out to YouTube instead.
- To use your own press photos, put them in `public/` and change the paths in `src/data/artist.ts` and `src/data/gallery.ts`.

## Accessibility and performance

- Semantic sections with labelled headings, plus a skip link.
- The mobile menu is a dialog that traps focus while open; the video modal uses a native `<dialog>`.
- Visible focus rings, and `aria-live` result counts on the catalogue filters.
- With `prefers-reduced-motion`, the reveal animations, parallax and marquee are turned off.
- The page is prerendered as static HTML, and images are served in AVIF/WebP at responsive sizes.

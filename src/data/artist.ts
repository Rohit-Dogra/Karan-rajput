import { releases } from "@/lib/catalogue";
import type { LiveEvent, PressItem, SourceLink } from "./types";

/**
 * Verified artist profile. Every fact here was checked against an official source on
 * 23 Oct 2026 — see `sources`. Anything not publicly verifiable is left out, not guessed.
 */
export const artist = {
  name: "Karan Rajput",
  tagline: "Punjabi songs, in his own words.",
  roles: ["Singer", "Lyricist", "Composer"],
  country: "India",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  portrait: {
    src: "https://yt3.googleusercontent.com/iHUG-iSw0AU9a97ZgS33SMksFV-_y83DK1jE2eF5fybX74XqbbvrzYyVC4gkmRjL0yl2iyVWLQ=s900-c-k-c0x00ffffff-no-rj",
    alt: "Karan Rajput in a black utility jacket against a warm sand backdrop",
    credit: "Official YouTube channel portrait",
  },
  /** Hero image — supplied by the artist's team (public/gallery). */
  hero: {
    src: "/gallery/karan-lakeside.jpg",
    alt: "Karan Rajput seated on a folding stool by a lake, a ukulele resting against a tent beside him",
    /** Keeps him in frame as the image is cropped: desktop, mobile. */
    position: { desktop: "25% 50%", mobile: "38% 50%" },
  },
  banner: {
    src: "https://yt3.googleusercontent.com/nV7ogU4rWVl4HUzuYgZySnqJw9CQtYTuiRDkowtYi7YCLG-lecauwxIiQUcOdHZLMuilHUmlDg=w2120-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj",
    alt: "Karan Rajput playing a ukulele by a row of sunlit windows",
    credit: "Official YouTube channel banner",
  },

  socials: [
    { platform: "instagram", label: "Instagram", handle: "@amkaranrajput", url: "https://www.instagram.com/amkaranrajput" },
    { platform: "youtube", label: "YouTube", handle: "@amKaranRajput", url: "https://www.youtube.com/@amKaranRajput" },
    { platform: "facebook", label: "Facebook", handle: "amkaranrajput", url: "https://www.facebook.com/amkaranrajput" },
  ],
  streaming: [
    { platform: "spotify", label: "Spotify", url: "https://open.spotify.com/artist/3rZGJqExmdvtQ7PquyY8bM" },
    { platform: "appleMusic", label: "Apple Music", url: "https://music.apple.com/in/artist/karan-rajput/1626364025" },
    { platform: "youtubeMusic", label: "YouTube Music", url: "https://music.youtube.com/channel/UCKAiRmsIu8sdI5XBIOBlHfQ" },
    { platform: "youtube", label: "YouTube", url: "https://www.youtube.com/@amKaranRajput" },
  ],

  /** Labels that have released his music, per the ℗ lines on Apple Music and Spotify. */
  labels: ["Folkstylee Music", "Define Records", "J.B.K Records", "UrbanLok", "Pindox Studios", "FamBeats Studios"],

  bio: [
    "Karan Rajput is a Punjabi singer, lyricist and composer from India. He writes his own words: the credits on his official releases read “Singer – Karan Rajput / Lyrics – Karan Rajput”.",
    "He has put out more than forty official releases, from the Honsle EP (2022) and the eight-track album Unfold (2024) to Sea to Sky (2026), his seven-track album released under his own name.",
    "The catalogue moves between moods: romantic Punjabi pop like Naina and Yaar Vasda, harder hip-hop cuts like Gangland, G Type and Sigma, lo-fi reworks, and devotional recordings including Shri Ram Stuti and Bhole Sarkar.",
  ],

  collaborators: ["Anky", "Jagga Virk", "Ravit Music", "Aditya Sharma", "Sukh Locham", "Manu V", "Mehakdeep Singh", "Folkstylee Music"],


  /**
   * Public booking contact. None has been verified yet, so the booking form runs in
   * "configure" mode. Set BOOKING_EMAIL (server) once the artist's team confirms an address.
   */
  bookingEmail: process.env.BOOKING_EMAIL ?? null,
};

/** Milestones that a reader can check by following the link. View counts are as of 23 Oct 2026. */
export const milestones: { figure: string; label: string; source: SourceLink }[] = [
  { figure: String(releases.length), label: "Official releases across Spotify and Apple Music", source: { label: "Spotify discography", url: "https://open.spotify.com/artist/3rZGJqExmdvtQ7PquyY8bM/discography/all" } },
  { figure: "2", label: "Albums — Unfold (2024) and Sea to Sky (2026) — plus the Honsle EP (2022)", source: { label: "Apple Music", url: "https://music.apple.com/in/artist/karan-rajput/1626364025" } },
  { figure: "249K", label: "Views on the Sheesha official video (J.B.K Records)", source: { label: "YouTube", url: "https://www.youtube.com/watch?v=UpePm_LsTDA" } },
  { figure: "156K", label: "Views on the Dil De Tukde official music video (J.B.K Records)", source: { label: "YouTube", url: "https://www.youtube.com/watch?v=Z9uM8MIXts8" } },
  { figure: "138K", label: "Views on the Rohab official video (Pindox Studios, 2026)", source: { label: "YouTube", url: "https://www.youtube.com/watch?v=2PIFhNyRrCc" } },
  { figure: "100K", label: "Views on the Honsle official video (Folkstylee Music)", source: { label: "YouTube", url: "https://www.youtube.com/watch?v=aeBnVW2SCcU" } },
];

/** Press coverage. No independent articles or interviews could be verified yet — add them here. */
export const press: PressItem[] = [];

/** Confirmed upcoming shows only. None were verifiable on 23 Oct 2026. */
export const events: LiveEvent[] = [];

export const sources: SourceLink[] = [
  { label: "Apple Music artist profile", url: "https://music.apple.com/in/artist/karan-rajput/1626364025" },
  { label: "Spotify artist profile", url: "https://open.spotify.com/artist/3rZGJqExmdvtQ7PquyY8bM" },
  { label: "Official YouTube channel", url: "https://www.youtube.com/@amKaranRajput" },
  { label: "Folkstylee Music (label) YouTube", url: "https://www.youtube.com/@folkstyleemusic" },
  { label: "Unfold full-album credits", url: "https://www.youtube.com/watch?v=ZlW-bH3fJ38" },
  { label: "Honsle official video credits", url: "https://www.youtube.com/watch?v=aeBnVW2SCcU" },
];

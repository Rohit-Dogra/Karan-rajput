export type Platform =
  | "spotify"
  | "appleMusic"
  | "youtubeMusic"
  | "youtube"
  | "amazonMusic"
  | "deezer"
  | "tidal"
  | "soundcloud";

export type ReleaseType = "album" | "ep" | "single";

export type Track = {
  title: string;
  artists: string;
  trackNumber: number;
  durationSec: number;
  /** Date the track first appeared — can predate the release it sits on. */
  firstReleased: string;
  appleMusic?: string;
};

export type Release = {
  /** Apple collection ID, or `sp-<spotify album id>` for releases only found on Spotify. */
  id: string;
  appleId?: string;
  title: string;
  /** Credited artists exactly as the store lists them. */
  artists: string;
  type: ReleaseType;
  /** ISO date as listed on Apple Music. */
  releaseDate: string;
  trackCount: number;
  label: string | null;
  genre: string | null;
  explicit: boolean;
  cover: string;
  links: Partial<Record<Platform, string>>;
  tracks: Track[];
  /** Shown on the card when something about the listing is worth flagging. */
  note?: string;
};

export type Video = {
  /** Official YouTube video ID. */
  id: string;
  title: string;
  kind: "Official Video" | "Official Audio" | "Full Album" | "Performance" | "Visualizer" | "Lyric Video";
  published: string;
  /** Channel that uploaded it — only the artist's own channel or the releasing label. */
  channel: string;
  /** Apple ID of the matching release, when there is one. */
  releaseId?: string;
  /** Whether YouTube serves a 1280px thumbnail for this video. */
  hasMaxRes?: boolean;
  /** False when the uploader has disabled playback on other sites. */
  embeddable: boolean;
};

export type PressItem = {
  outlet: string;
  title: string;
  url: string;
  date?: string;
};

export type LiveEvent = {
  date: string;
  city: string;
  venue: string;
  ticketsUrl?: string;
};

export type SourceLink = { label: string; url: string };

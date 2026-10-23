import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const base = (size: number, props: SVGProps<SVGSVGElement>) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  "aria-hidden": true,
  focusable: false,
  ...props,
});

export function SpotifyIcon({ size = 18, ...p }: IconProps) {
  return (
    <svg {...base(size, p)} fill="currentColor">
      <path d="M12 1.5a10.5 10.5 0 1 0 0 21 10.5 10.5 0 0 0 0-21Zm4.82 15.14a.65.65 0 0 1-.9.22c-2.46-1.5-5.55-1.84-9.2-1.01a.65.65 0 1 1-.29-1.27c3.99-.91 7.42-.52 10.17 1.16.31.19.41.59.22.9Zm1.28-2.86a.82.82 0 0 1-1.12.27c-2.81-1.73-7.1-2.23-10.43-1.22a.82.82 0 1 1-.47-1.56c3.8-1.15 8.53-.59 11.75 1.39.38.24.5.74.27 1.12Zm.11-2.98C14.84 8.8 9.28 8.61 6.06 9.59a.98.98 0 1 1-.57-1.88c3.7-1.12 9.84-.9 13.72 1.4a.98.98 0 0 1-1 1.69Z" />
    </svg>
  );
}

export function AppleMusicIcon({ size = 18, ...p }: IconProps) {
  return (
    <svg {...base(size, p)} fill="currentColor">
      <path d="M19.5 2.6 9 4.7a1 1 0 0 0-.8 1v10.1a3.4 3.4 0 0 0-1.6-.4 3.2 3.2 0 1 0 3.3 3.2V9.4l8.6-1.7v6.6a3.4 3.4 0 0 0-1.6-.4 3.2 3.2 0 1 0 3.3 3.2V3.6a1 1 0 0 0-1.2-1Z" />
    </svg>
  );
}

export function YouTubeIcon({ size = 18, ...p }: IconProps) {
  return (
    <svg {...base(size, p)} fill="currentColor">
      <path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8ZM9.8 15.1V8.9L15.6 12l-5.8 3.1Z" />
    </svg>
  );
}

export function YouTubeMusicIcon({ size = 18, ...p }: IconProps) {
  return (
    <svg {...base(size, p)} fill="none" stroke="currentColor" strokeWidth={1.6}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="5.2" />
      <path d="m10.5 9.6 3.6 2.4-3.6 2.4z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function InstagramIcon({ size = 18, ...p }: IconProps) {
  return (
    <svg {...base(size, p)} fill="none" stroke="currentColor" strokeWidth={1.6}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon({ size = 18, ...p }: IconProps) {
  return (
    <svg {...base(size, p)} fill="currentColor">
      <path d="M13.5 21.5v-8h2.7l.4-3.2h-3.1v-2c0-.9.3-1.6 1.6-1.6h1.7V3.9a22 22 0 0 0-2.5-.1c-2.4 0-4.1 1.5-4.1 4.2v2.3H7.5v3.2h2.7v8h3.3Z" />
    </svg>
  );
}

export function PlayIcon({ size = 18, ...p }: IconProps) {
  return (
    <svg {...base(size, p)} fill="currentColor">
      <path d="M7 4.5v15a.8.8 0 0 0 1.2.7l12-7.5a.8.8 0 0 0 0-1.4l-12-7.5A.8.8 0 0 0 7 4.5Z" />
    </svg>
  );
}

export function ArrowIcon({ size = 18, ...p }: IconProps) {
  return (
    <svg {...base(size, p)} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function CloseIcon({ size = 18, ...p }: IconProps) {
  return (
    <svg {...base(size, p)} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function SearchIcon({ size = 18, ...p }: IconProps) {
  return (
    <svg {...base(size, p)} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-4.2-4.2" />
    </svg>
  );
}

export const platformIcons = {
  spotify: SpotifyIcon,
  appleMusic: AppleMusicIcon,
  youtube: YouTubeIcon,
  youtubeMusic: YouTubeMusicIcon,
  instagram: InstagramIcon,
  facebook: FacebookIcon,
} as const;

export function PlatformIcon({ platform, ...p }: IconProps & { platform: string }) {
  const Icon = platformIcons[platform as keyof typeof platformIcons];
  return Icon ? <Icon {...p} /> : <ArrowIcon {...p} />;
}

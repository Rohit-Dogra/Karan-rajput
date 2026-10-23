import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    // Official artwork is served from the platforms that host it — nothing is re-hosted.
    remotePatterns: [
      { protocol: "https", hostname: "*.mzstatic.com", pathname: "/image/**" }, // Apple Music cover art
      { protocol: "https", hostname: "*.spotifycdn.com", pathname: "/image/**" }, // Spotify cover art
      { protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" }, // YouTube video thumbnails
      { protocol: "https", hostname: "yt3.googleusercontent.com" }, // Official YouTube channel art
    ],
    qualities: [70, 85],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;

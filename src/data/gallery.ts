import { artist } from "./artist";
import { thumbnail, watchUrl } from "./videos";

export type GalleryImage = {
  src: string;
  alt: string;
  caption: string;
  /** Where the image was published; omitted for photos supplied directly by the artist's team. */
  href?: string;
  /** Grid placement on desktop (12-column grid). */
  span: string;
  /** CSS object-position, for images whose subject isn't centred. */
  position?: string;
};

/**
 * Gallery images. Photos supplied by the artist's team live in /public/gallery; the rest
 * are hot-linked from where the artist or his label published them and credited to that source.
 */
export const gallery: GalleryImage[] = [
  { src: "/gallery/karan-portrait-green.webp", alt: "Karan Rajput, hand at his chin, in a green half-zip against a white backdrop", caption: "Studio portrait", span: "md:col-span-4 md:row-span-2", position: "50% 85%" },
  { src: "/gallery/karan-lakeside.jpg", alt: "Karan Rajput seated on a folding stool by a lake, a ukulele resting against a tent beside him", caption: "Lakeside, with his ukulele", span: "md:col-span-8" },
  { src: "/gallery/karan-garden.webp", alt: "Karan Rajput in a plaid shirt and glasses on a garden path at golden hour", caption: "Adorable — promotional portrait, 2026", span: "md:col-span-4", position: "50% 30%" },
  { src: artist.portrait.src, alt: artist.portrait.alt, caption: artist.portrait.credit, href: "https://www.youtube.com/@amKaranRajput", span: "md:col-span-4", position: "50% 20%" },
  { src: thumbnail({ id: "5A53Qkav0Jw", hasMaxRes: true }), alt: "Karan Rajput lying in long grass, arm over his eyes", caption: "Yaar Vasda — official video still, 2025", href: watchUrl("5A53Qkav0Jw"), span: "md:col-span-6" },
  { src: thumbnail({ id: "1N-adZic0tY" }), alt: "Karan Rajput seated on a chair in a dark studio holding a framed record", caption: "May God — Sea to Sky, 2026", href: watchUrl("1N-adZic0tY"), span: "md:col-span-6" },
  { src: thumbnail({ id: "Se6uTyKDP0k", hasMaxRes: true }), alt: "Karan Rajput standing with two dobermans in front of a red sports car", caption: "Daur — official video still, 2026", href: watchUrl("Se6uTyKDP0k"), span: "md:col-span-4" },
  { src: thumbnail({ id: "jp-UpbvPTls" }), alt: "Karan Rajput walking through a forest with a co-star", caption: "Changa Nai — official video still, 2026", href: watchUrl("jp-UpbvPTls"), span: "md:col-span-4" },
  { src: thumbnail({ id: "2PIFhNyRrCc" }), alt: "Karan Rajput sitting with friends in a field", caption: "Rohab — official video still, 2026", href: watchUrl("2PIFhNyRrCc"), span: "md:col-span-4" },
  { src: thumbnail({ id: "UpePm_LsTDA", hasMaxRes: true }), alt: "Karan Rajput walking with a co-star in autumn light", caption: "Sheesha — official video still (J.B.K Records), 2021", href: watchUrl("UpePm_LsTDA"), span: "md:col-span-6" },
  { src: thumbnail({ id: "VMGSoGYeL_U", hasMaxRes: true }), alt: "Karan Rajput seated on a vintage motorcycle", caption: "Tere Shehar — official video still, 2020", href: watchUrl("VMGSoGYeL_U"), span: "md:col-span-6" },
];

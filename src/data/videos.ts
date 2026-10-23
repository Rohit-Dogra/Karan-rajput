import type { Video } from "./types";

/**
 * Official uploads only — from Karan Rajput's own YouTube channel (UCP9ue9YxrvnUSYRRtLlFmEQ)
 * or the label that released the track (Folkstylee Music, Pindox Studios, Define Records,
 * J.B.K Records, UrbanLok, Hollywood Hills Music Company). Checked 23 Oct 2026. Newest first.
 * Lyric/teaser/slowed duplicates on label channels are left out on purpose.
 *
 * `embeddable: false` — the uploader has disabled playback on other sites, so the gallery
 * links out to YouTube instead of opening the in-page player.
 * `releaseId` is the matching `id` in catalogue.generated.json.
 */
export const videos: Video[] = [
  { id: "LjTc_IlpGEE", title: "Adorable", kind: "Official Audio", published: "2026-10-23", channel: "Pindox Studios", releaseId: "6824786393", hasMaxRes: true, embeddable: true },
  { id: "LsgFgjyvNhU", title: "Aaja Ve", kind: "Official Audio", published: "2026-09-08", channel: "Karan Rajput", releaseId: "6792665194", hasMaxRes: true, embeddable: true },
  { id: "2PIFhNyRrCc", title: "Rohab", kind: "Official Video", published: "2026-08-20", channel: "Pindox Studios", releaseId: "6802562244", embeddable: true },
  { id: "6yEkZQma75U", title: "6vi Vaari Pyar (8K)", kind: "Official Video", published: "2026-08-19", channel: "Folkstylee Music", releaseId: "1729161367", hasMaxRes: true, embeddable: true },
  { id: "Se6uTyKDP0k", title: "Daur", kind: "Official Video", published: "2026-05-27", channel: "Pindox Studios", releaseId: "6772915947", hasMaxRes: true, embeddable: true },
  { id: "jp-UpbvPTls", title: "Changa Nai", kind: "Official Video", published: "2026-05-10", channel: "Karan Rajput", releaseId: "1891609533", embeddable: true },
  { id: "1N-adZic0tY", title: "May God", kind: "Official Video", published: "2026-04-16", channel: "Karan Rajput", releaseId: "1891609533", embeddable: true },
  { id: "InU7JPnjAJg", title: "Jandi Ni", kind: "Official Audio", published: "2026-04-16", channel: "Karan Rajput", releaseId: "1891609533", hasMaxRes: true, embeddable: true },
  { id: "J-finOZEK1Y", title: "High Life", kind: "Official Audio", published: "2026-04-16", channel: "Karan Rajput", releaseId: "1891609533", hasMaxRes: true, embeddable: true },
  { id: "NGB04tUOkAE", title: "Husan", kind: "Official Audio", published: "2026-04-16", channel: "Karan Rajput", releaseId: "1891609533", hasMaxRes: true, embeddable: true },
  { id: "Qrx2G1wNSD4", title: "Adore", kind: "Official Audio", published: "2026-04-16", channel: "Karan Rajput", releaseId: "1891609533", hasMaxRes: true, embeddable: true },
  { id: "RuXUOF77p0Q", title: "Changa Nai", kind: "Official Audio", published: "2026-04-16", channel: "Karan Rajput", releaseId: "1891609533", hasMaxRes: true, embeddable: true },
  { id: "gQ7gq_9Z5vg", title: "Grindin", kind: "Official Audio", published: "2026-04-16", channel: "Karan Rajput", releaseId: "1891609533", hasMaxRes: true, embeddable: true },
  { id: "xNB5-El3qHY", title: "Taur Kdh K", kind: "Official Video", published: "2026-01-12", channel: "Folkstylee Music", releaseId: "1868303324", hasMaxRes: true, embeddable: true },
  { id: "SxpO5lf6VTc", title: "Beimani", kind: "Official Video", published: "2025-11-08", channel: "Karan Rajput", releaseId: "1849862954", embeddable: false },
  { id: "py4sb0YvnnA", title: "Malka", kind: "Visualizer", published: "2025-11-04", channel: "Folkstylee Music", releaseId: "1729157993", hasMaxRes: true, embeddable: true },
  { id: "tchqa2U9DYs", title: "Mehndi", kind: "Official Audio", published: "2025-10-05", channel: "Karan Rajput", releaseId: "1719306177", hasMaxRes: true, embeddable: true },
  { id: "arXVVs_Mdek", title: "Brag", kind: "Official Audio", published: "2025-09-14", channel: "Karan Rajput", releaseId: "1839193905", hasMaxRes: true, embeddable: false },
  { id: "VuiW2dPWfDI", title: "Naina (Unplugged)", kind: "Performance", published: "2025-08-22", channel: "Karan Rajput", releaseId: "1834908593", hasMaxRes: true, embeddable: false },
  { id: "5A53Qkav0Jw", title: "Yaar Vasda", kind: "Official Video", published: "2025-07-24", channel: "Karan Rajput", releaseId: "1828149258", hasMaxRes: true, embeddable: true },
  { id: "Fs5j-FW_C8Y", title: "Naina", kind: "Official Audio", published: "2025-04-27", channel: "Karan Rajput", releaseId: "1810493548", hasMaxRes: true, embeddable: false },
  { id: "ZlW-bH3fJ38", title: "Unfold", kind: "Full Album", published: "2024-06-23", channel: "Folkstylee Music", releaseId: "1753467112", hasMaxRes: true, embeddable: false },
  { id: "eR_9IHfHddQ", title: "Afsana", kind: "Lyric Video", published: "2024-06-15", channel: "Folkstylee Music", releaseId: "1712169949", hasMaxRes: true, embeddable: true },
  { id: "Ker4s2lObdo", title: "Sigma (Anky x Karan Rajput)", kind: "Official Video", published: "2024-04-24", channel: "Folkstylee Music", releaseId: "1742160407", hasMaxRes: true, embeddable: false },
  { id: "bg0pk5WQyik", title: "Mundri", kind: "Official Audio", published: "2024-04-11", channel: "Folkstylee Music", releaseId: "1740133083", embeddable: false },
  { id: "1ovdZsk8_XQ", title: "Bewafai", kind: "Official Video", published: "2024-02-09", channel: "Define Records", releaseId: "1729781466", hasMaxRes: true, embeddable: true },
  { id: "FGfxKiM-JQU", title: "G Type", kind: "Official Video", published: "2024-01-28", channel: "Define Records", releaseId: "1727330394", hasMaxRes: true, embeddable: true },
  { id: "A-Q1wzU_UCg", title: "Cadaques", kind: "Official Video", published: "2024-01-12", channel: "Define Records", releaseId: "1725022062", hasMaxRes: true, embeddable: true },
  { id: "APUv-OCTa7Y", title: "Afsana", kind: "Official Video", published: "2023-10-18", channel: "Folkstylee Music", releaseId: "1712169949", hasMaxRes: true, embeddable: false },
  { id: "mILbwpoUIOw", title: "Hikk (Karan Rajput x Ravit)", kind: "Official Audio", published: "2023-09-30", channel: "Folkstylee Music", releaseId: "1709554497", hasMaxRes: true, embeddable: false },
  { id: "olOXwQC2nyA", title: "Begairat", kind: "Official Video", published: "2023-09-13", channel: "Folkstylee Music", releaseId: "1707013230", hasMaxRes: true, embeddable: false },
  { id: "JvKDNwxCag4", title: "Gangland", kind: "Official Audio", published: "2023-08-26", channel: "Folkstylee Music", releaseId: "1704343476", hasMaxRes: true, embeddable: false },
  { id: "7425u8jvhJo", title: "Case Chaldee (x Jagga Virk)", kind: "Official Audio", published: "2023-06-09", channel: "Folkstylee Music", releaseId: "1691836020", hasMaxRes: true, embeddable: false },
  { id: "M7LHbhNBzjk", title: "6vi Vaari Pyar", kind: "Official Video", published: "2023-03-03", channel: "Folkstylee Music", releaseId: "1729161367", hasMaxRes: true, embeddable: false },
  { id: "4k9nUZ0Ah3A", title: "Doubt", kind: "Official Video", published: "2022-12-05", channel: "Folkstylee Music", releaseId: "1729151481", embeddable: false },
  { id: "Z9uM8MIXts8", title: "Dil De Tukde", kind: "Official Video", published: "2022-05-27", channel: "J.B.K Records", releaseId: "1729156458", hasMaxRes: true, embeddable: false },
  { id: "aeBnVW2SCcU", title: "Honsle", kind: "Official Video", published: "2022-05-07", channel: "Folkstylee Music", releaseId: "1729151481", hasMaxRes: true, embeddable: false },
  { id: "UpePm_LsTDA", title: "Sheesha", kind: "Official Video", published: "2021-12-17", channel: "J.B.K Records", releaseId: "1729159310", hasMaxRes: true, embeddable: true },
  { id: "TmO0fcqWpDU", title: "Hanju (Aditya Sharma with Karan Rajput)", kind: "Official Video", published: "2021-05-08", channel: "Folkstylee Music", hasMaxRes: true, embeddable: false },
  { id: "VMGSoGYeL_U", title: "Tere Shehar", kind: "Official Video", published: "2020-07-03", channel: "Folkstylee Music", releaseId: "1729151481", hasMaxRes: true, embeddable: true },
  { id: "cPnZu3Io3gY", title: "Pulwama (feat. Manu V)", kind: "Official Video", published: "2019-02-15", channel: "UrbanLok", releaseId: "1732247873", hasMaxRes: true, embeddable: true },
];

export function thumbnail(v: Pick<Video, "id" | "hasMaxRes">) {
  return `https://i.ytimg.com/vi/${v.id}/${v.hasMaxRes ? "maxresdefault" : "hqdefault"}.jpg`;
}

export function watchUrl(id: string) {
  return `https://www.youtube.com/watch?v=${id}`;
}

import { About } from "@/components/About";
import { ContactForm } from "@/components/ContactForm";
import { Discography } from "@/components/Discography";
import { FeaturedRelease } from "@/components/FeaturedRelease";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { Live } from "@/components/Live";
import { MusicCatalogue } from "@/components/MusicCatalogue";
import { Press } from "@/components/Press";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { VideoGallery } from "@/components/VideoGallery";
import { artist } from "@/data/artist";
import { videos, watchUrl } from "@/data/videos";
import { collaborators, releases, trackCount } from "@/lib/catalogue";
import { contactConfigured } from "@/lib/contact";

function Section({ id, children, className = "" }: { id: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`mx-auto max-w-[1600px] px-4 py-24 sm:px-8 md:py-36 ${className}`}>
      {children}
    </section>
  );
}

export default function Home() {
  const catalogue = releases.map((r) => {
    const video = videos.find((v) => v.releaseId === r.id && v.kind === "Official Video") ?? videos.find((v) => v.releaseId === r.id);
    return { ...r, collabs: collaborators(r), videoUrl: video ? watchUrl(video.id) : undefined };
  });
  const featuredVideo = videos.find((v) => v.kind === "Official Video" && v.embeddable)!;
  const instagram = artist.socials.find((s) => s.platform === "instagram")!;

  return (
    <>
      <SiteHeader name={artist.name} />
      <main id="main">
        <Hero />

        {/* Title marquee */}
        <div aria-hidden className="overflow-hidden border-b border-line py-5">
          <div className="marquee-track flex w-max gap-10">
            {[0, 1].map((k) => (
              <p key={k} className="display flex shrink-0 gap-10 text-5xl text-paper/80">
                {releases.slice(0, 18).map((r) => (
                  <span key={r.id} className="flex items-center gap-10">
                    {r.title}
                    <span className="text-ember">✦</span>
                  </span>
                ))}
              </p>
            ))}
          </div>
        </div>

        <FeaturedRelease />

        <Section id="music">
          <SectionHeading
            id="music-title"
            index="01"
            eyebrow="Music"
            title={
              <>
                The full
                <br />
                catalogue
              </>
            }
            aside={
              <>
                {releases.length} official releases and {trackCount} songs, cross-checked between Apple Music and Spotify. New music is added as it&apos;s released — if something&apos;s missing, it hasn&apos;t been verified yet.
              </>
            }
          />
          <MusicCatalogue items={catalogue} />
        </Section>

        <section id="videos" aria-labelledby="videos-title" className="border-y border-line bg-ink-2">
          <div className="mx-auto max-w-[1600px] px-4 py-24 sm:px-8 md:py-36">
            <SectionHeading
              id="videos-title"
              index="02"
              eyebrow="Music videos"
              title={
                <>
                  Watch<span className="text-ember">.</span>
                </>
              }
              aside={<>Official uploads from Karan&apos;s channel and his labels. A few uploaders don&apos;t allow playback outside YouTube — those open there.</>}
            />
            <VideoGallery videos={videos} featured={featuredVideo} />
          </div>
        </section>

        <Section id="discography">
          <SectionHeading
            id="discography-title"
            index="03"
            eyebrow="Discography"
            title={
              <>
                {releases.at(-1)!.releaseDate.slice(0, 4)}
                <span className="font-serif text-[0.5em] normal-case italic text-muted"> to </span>
                now
              </>
            }
          />
          <Discography />
        </Section>

        <About />

        <Section id="gallery">
          <SectionHeading
            id="gallery-title"
            index="05"
            eyebrow="Gallery"
            title={
              <>
                In frame<span className="text-ember">.</span>
              </>
            }
            aside="Official portraits and stills from his music videos. Each image links to where it was published."
          />
          <Gallery />
        </Section>

        <Section id="live" className="pt-0 md:pt-0">
          <SectionHeading
            id="live-title"
            index="06"
            eyebrow="Live & events"
            title={
              <>
                On stage
              </>
            }
          />
          <Live />
        </Section>

        <section id="press" aria-labelledby="press-title" className="border-y border-line bg-ink-2">
          <div className="mx-auto max-w-[1600px] px-4 py-24 sm:px-8 md:py-36">
            <SectionHeading
              id="press-title"
              index="07"
              eyebrow="Press & milestones"
              title={
                <>
                  By the
                  <br />
                  numbers
                </>
              }
              aside="Every figure links to the page it was taken from."
            />
            <Press />
          </div>
        </section>

        <Section id="contact">
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHeading
                id="contact-title"
                index="08"
                eyebrow="Contact & booking"
                title={
                  <>
                    Let&apos;s
                    <br />
                    talk<span className="text-ember">.</span>
                  </>
                }
              />
              <Reveal className="-mt-4 space-y-4 text-lg leading-relaxed text-muted">
                <p>Shows, private events, collaborations and press — send the details and the team will get back to you.</p>
                <p>
                  Prefer social? Karan is on{" "}
                  <a href={instagram.url} target="_blank" rel="noopener noreferrer" className="text-paper underline decoration-ember underline-offset-4">
                    Instagram {instagram.handle}
                  </a>
                  .
                </p>
              </Reveal>
            </div>
            <Reveal className="lg:col-span-6 lg:col-start-7 lg:pt-24" delay={120}>
              <ContactForm configured={contactConfigured()} instagramUrl={instagram.url} />
            </Reveal>
          </div>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}

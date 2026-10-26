import Image from "next/image";
import { site, socials } from "@/content/site";
import { Clock } from "./clock";
import { ArrowRight, ArrowUpRight } from "./icons";

export function Hero() {
  const links = [...socials, { label: "Email", href: `mailto:${site.email}` }];

  return (
    <section
      aria-labelledby="hero-title"
      className="mx-auto grid min-h-[calc(100svh-3.5rem)] max-w-[1120px] content-center gap-x-8 gap-y-12 px-4 py-10 md:grid-cols-12 md:items-center md:px-8"
    >
      <div className="md:col-span-7">
        <div className="meta flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-rule bg-surface px-3 py-1 text-ink">
            <span aria-hidden className="relative flex size-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-[#22c55e] opacity-60 motion-reduce:hidden" />
              <span className="relative size-2 rounded-full bg-[#22c55e]" />
            </span>
            {site.availability}
          </span>
          <span className="text-muted">{site.status}</span>
        </div>

        <h1 id="hero-title" className="mt-8">
          <span className="block text-[clamp(1.5rem,3vw,2.1rem)] leading-tight text-muted">
            Hi, I’m
          </span>
          <span className="display display-wide mt-1 block text-[clamp(3.25rem,8.5vw,5.75rem)] leading-[0.92] font-[650]">
            {site.name}
          </span>
        </h1>

        <p className="mt-6 max-w-[46ch] text-[clamp(1.1rem,1.6vw,1.3rem)] leading-snug text-balance">
          {site.headline}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="#work"
            className="group meta inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-bg transition-transform hover:-translate-y-0.5"
          >
            See my work
            <ArrowRight className="rotate-90 transition-transform group-hover:translate-y-0.5" />
          </a>
          <a
            href={site.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="meta inline-flex h-11 items-center gap-1.5 rounded-full border border-ink/80 px-5 text-ink transition-colors hover:bg-ink hover:text-bg"
          >
            Résumé
            <ArrowUpRight />
          </a>
        </div>

        <ul className="meta mt-6 flex flex-wrap gap-x-5 gap-y-2" aria-label="Links">
          {links.map((l) => {
            const external = l.href.startsWith("http");
            return (
              <li key={l.label}>
                <a
                  href={l.href}
                  {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                  className="group inline-flex min-h-6 items-center gap-0.5 text-muted transition-colors hover:text-accent"
                >
                  {l.label}
                  {external && <ArrowUpRight className="transition-transform group-hover:-translate-y-px" />}
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      <Portrait />
    </section>
  );
}

function Portrait() {
  return (
    <div className="relative mx-auto w-full max-w-[360px] md:col-span-5 md:mr-0 md:max-w-[420px]">
      <div className="relative aspect-[4/5]">
        {/* Cobalt panel with a faint dot grid: the cheerful block of colour behind the photo. */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-[14%] bottom-0 rounded-[2rem] bg-accent"
          style={{
            backgroundImage:
              "radial-gradient(color-mix(in oklab, var(--accent-ink) 22%, transparent) 1.2px, transparent 1.2px)",
            backgroundSize: "18px 18px",
          }}
        />
        <div className="absolute inset-0 overflow-hidden rounded-b-[2rem]">
          <Image
            src="/me/headshot-v3.webp"
            alt="Dev Kansal in a black suit and tie, smiling"
            fill
            sizes="(min-width: 768px) 420px, 360px"
            loading="eager"
            fetchPriority="high"
            // Already a pre-sized 880px WebP: skip the optimizer round trip for the LCP image.
            unoptimized
            className="object-cover object-bottom"
          />
        </div>
      </div>

      <div
        className="sticker meta absolute top-[10%] -left-2 bg-sun px-3.5 py-2.5 sm:-left-8"
        style={{ "--tilt": "-6deg" } as React.CSSProperties}
      >
        <span className="display block text-[1.05rem] font-semibold">ICPC 2026</span>
        <span>Third Prize, rank 35</span>
      </div>

      <div
        className="sticker meta absolute top-[58%] -right-2 bg-mint px-3.5 py-2.5 sm:top-[44%] sm:-right-6"
        style={{ "--tilt": "5deg" } as React.CSSProperties}
      >
        <span className="block opacity-70">Local time</span>
        <span className="display block text-[1.05rem] font-semibold">
          <Clock city={site.location.city} timeZone={site.location.timeZone} />
        </span>
      </div>

      <div
        className="sticker meta absolute bottom-[4%] -left-2 bg-rose px-3.5 py-2.5 sm:bottom-[7%] sm:-left-10"
        style={{ "--tilt": "-3deg" } as React.CSSProperties}
      >
        <span className="display block text-[1.05rem] font-semibold">4,000+ attendees</span>
        <span>checked in on my portal</span>
      </div>
    </div>
  );
}

import { site, socials } from "@/content/site";
import { Clock } from "./clock";
import { ArrowUpRight } from "./icons";

export function Hero() {
  const links = [
    ...socials,
    { label: "Email", href: `mailto:${site.email}` },
    { label: "Résumé", href: site.resume },
  ];

  return (
    <section aria-labelledby="hero-title" className="mx-auto max-w-[1120px] px-4 pt-10 md:px-8 md:pt-28 md:pb-4">
      <h1
        id="hero-title"
        className="display display-wide text-[clamp(3.5rem,11vw,8.25rem)] leading-[0.9] font-[650]"
      >
        {site.name}
      </h1>

      <div className="mt-6 grid gap-y-8 md:mt-10 md:grid-cols-12 md:gap-x-8">
        <div className="md:col-span-8">
          <p className="max-w-[24ch] text-[clamp(1.55rem,3.4vw,2.35rem)] leading-[1.18] tracking-[-0.01em] text-balance">
            {site.headline}
          </p>
          <p className="mt-5 max-w-[56ch] text-muted">
            Lately that means ride matching guarded by Redis and Postgres locks, check-in for a
            4,000-person summit, and graph memory for AI agents. I work mostly in TypeScript,
            NestJS, Postgres and Redis.
          </p>
        </div>

        <div className="meta flex flex-col gap-5 text-muted md:col-span-4 md:justify-end">
          <div className="space-y-1">
            <p className="flex items-center gap-2 text-ink">
              <span aria-hidden className="size-1.5 rounded-full bg-accent" />
              {site.availability}
            </p>
            <p>{site.status}</p>
            <p>
              <Clock city={site.location.city} timeZone={site.location.timeZone} />
            </p>
          </div>
          <ul className="flex flex-wrap gap-x-4 gap-y-2" aria-label="Links">
            {links.map((l) => {
              const external = l.href.startsWith("http") || l.href.endsWith(".pdf");
              return (
                <li key={l.label}>
                  <a
                    href={l.href}
                    {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                    className="group inline-flex items-center gap-0.5 text-ink transition-colors hover:text-accent"
                  >
                    {l.label}
                    {external && (
                      <ArrowUpRight className="text-muted transition-transform group-hover:-translate-y-px group-hover:translate-x-px group-hover:text-accent" />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

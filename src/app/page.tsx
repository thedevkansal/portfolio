import Image from "next/image";
import { CopyEmail } from "@/components/copy-email";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { ArrowUpRight } from "@/components/icons";
import { Nav } from "@/components/nav";
import { Section } from "@/components/section";
import { TechIcon } from "@/components/tech-icon";
import { WorkList } from "@/components/work-list";
import { projects } from "@/content/projects";
import { achievements, roles, site, socials, stack } from "@/content/site";

const tints = ["bg-sun", "bg-mint", "bg-sky", "bg-rose"];

export default function Home() {
  const cards = projects.map(({ slug, title, problem, stack, shot, context }) => ({
    slug,
    title,
    problem,
    stack,
    shot,
    context,
  }));

  return (
    <>
      <Nav home />
      <main id="main">
        <Hero />

        <WorkList projects={cards} />

        <Section id="achievements" title="Achievements">
          <ul className="grid gap-4 sm:grid-cols-2">
            {achievements.map((a, i) => (
              <li
                key={a.title}
                className={`${tints[i % tints.length]} ${
                  achievements.length === 1 ? "sm:col-span-2 sm:flex-row sm:items-end sm:justify-between" : ""
                } flex min-h-36 flex-col justify-between gap-6 rounded-2xl p-6 text-sticker-ink`}
              >
                <span>
                  <span className="meta block opacity-70">{a.date}</span>
                  <span className="display mt-2 block text-[clamp(1.6rem,3vw,2.2rem)] leading-tight font-semibold">
                    {a.detail}
                  </span>
                </span>
                <span className="max-w-[30ch] sm:text-right">{a.title}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="experience" title="Experience">
          <ol>
            {roles.map((r) => (
              <li
                key={r.role + r.org}
                className="grid gap-x-6 gap-y-1 border-b border-rule py-5 first:pt-0 last:border-b-0 sm:grid-cols-[1fr_auto]"
              >
                <h3 className="display text-[1.1rem] font-semibold">
                  {r.role}
                  <span className="font-normal text-muted">, {r.org}</span>
                </h3>
                <span className="meta text-muted sm:col-start-2 sm:row-start-1 sm:pt-1">{r.dates}</span>
                <p className="max-w-[60ch] text-muted sm:col-span-2">{r.summary}</p>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="stack" title="Stack">
          <dl className="grid gap-x-6 gap-y-4 sm:grid-cols-[8rem_1fr]">
            {stack.map((g) => (
              <div key={g.group} className="contents">
                <dt className="meta pt-2 text-muted">{g.group}</dt>
                <dd>
                  <ul className="flex flex-wrap gap-2">
                    {g.items.map((item) => (
                      <li
                        key={item}
                        className="inline-flex items-center gap-2 rounded-full border border-rule bg-surface py-1.5 pr-3.5 pl-2.5 text-[0.95rem] leading-snug transition-transform hover:-translate-y-0.5"
                      >
                        <TechIcon name={item} className="size-[18px] shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </Section>

        <section
          id="contact"
          aria-labelledby="contact-title"
          className="mx-auto mt-16 max-w-[1120px] px-4 md:mt-24 md:px-8"
        >
          <div
            data-reveal
            className="relative overflow-hidden rounded-[2rem] bg-accent px-6 py-10 text-accent-ink sm:px-10 md:px-14 md:py-14"
            style={{
              backgroundImage:
                "radial-gradient(color-mix(in oklab, var(--accent-ink) 16%, transparent) 1.2px, transparent 1.2px)",
              backgroundSize: "18px 18px",
            }}
          >
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div className="max-w-[30rem]">
                <h2 id="contact-title" className="meta flex items-center gap-3">
                  <Image
                    src="/me/headshot-avatar.webp"
                    alt=""
                    width={56}
                    height={56}
                    className="size-14 rounded-full ring-2 ring-accent-ink"
                  />
                  <span className="opacity-80">Contact</span>
                </h2>
                <p className="mt-5 text-[clamp(1.45rem,2.6vw,1.9rem)] leading-[1.2] text-balance">
                  Hiring backend or infrastructure interns for summer 2027? I’d like to hear from you.
                </p>
              </div>

              <div className="flex flex-col gap-5 md:items-end">
                <div className="flex flex-wrap gap-3">
                  <CopyEmail email={site.email} className="border-accent-ink/40 text-accent-ink hover:border-accent-ink" />
                  <a
                    href={`mailto:${site.email}`}
                    className="meta inline-flex items-center rounded-md bg-accent-ink px-3 py-2 text-accent transition-opacity hover:opacity-90"
                  >
                    Write an email
                  </a>
                </div>
                <ul className="meta flex flex-wrap gap-x-5 gap-y-2" aria-label="Elsewhere">
                  {[...socials, { label: "Résumé", href: site.resume }].map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex min-h-6 items-center gap-0.5 opacity-85 transition-opacity hover:opacity-100"
                      >
                        {s.label}
                        <ArrowUpRight className="transition-transform group-hover:-translate-y-px" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

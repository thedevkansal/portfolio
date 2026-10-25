import Link from "next/link";
import { CopyEmail } from "@/components/copy-email";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { ArrowUpRight } from "@/components/icons";
import { Nav } from "@/components/nav";
import { Section } from "@/components/section";
import { WorkList } from "@/components/work-list";
import { projects } from "@/content/projects";
import { achievements, roles, site, socials, stack } from "@/content/site";

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
          <ul>
            {achievements.map((a) => {
              const body = (
                <>
                  <span className="block">{a.title}</span>
                  <span className="block text-muted">{a.detail}</span>
                </>
              );
              return (
                <li
                  key={a.title}
                  className="grid grid-cols-[1fr_auto] items-baseline gap-x-6 border-b border-rule py-4 first:pt-0 last:border-b-0"
                >
                  {a.href ? (
                    a.href.startsWith("/") ? (
                      <Link href={a.href} className="group hover:text-accent">
                        {body}
                      </Link>
                    ) : (
                      <a href={a.href} target="_blank" rel="noopener noreferrer" className="group hover:text-accent">
                        {body}
                      </a>
                    )
                  ) : (
                    <div>{body}</div>
                  )}
                  <span className="meta text-muted">{a.date}</span>
                </li>
              );
            })}
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
                <span className="meta text-muted sm:row-start-1 sm:col-start-2 sm:pt-1">{r.dates}</span>
                <p className="max-w-[60ch] text-muted sm:col-span-2">{r.summary}</p>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="stack" title="Stack">
          <dl className="grid grid-cols-[6.5rem_1fr] gap-x-6 gap-y-3 sm:grid-cols-[8rem_1fr]">
            {stack.map((g) => (
              <div key={g.group} className="contents">
                <dt className="meta pt-1 text-muted">{g.group}</dt>
                <dd>
                  <ul className="flex flex-wrap gap-x-4 gap-y-1">
                    {g.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section id="contact" title="Contact">
          <p className="max-w-[32ch] text-[clamp(1.4rem,2.8vw,1.9rem)] leading-[1.2] text-balance">
            Hiring backend or infrastructure interns for summer 2027? I’d like to hear from you.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <CopyEmail email={site.email} />
            <a
              href={`mailto:${site.email}`}
              className="meta rounded-md bg-ink px-3 py-2 text-bg transition-opacity hover:opacity-85"
            >
              Write an email
            </a>
          </div>
          <ul className="meta mt-8 flex flex-wrap gap-x-5 gap-y-2" aria-label="Elsewhere">
            {[...socials, { label: "Résumé", href: site.resume }].map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-0.5 transition-colors hover:text-accent"
                >
                  {s.label}
                  <ArrowUpRight className="text-muted group-hover:text-accent" />
                </a>
              </li>
            ))}
          </ul>
        </Section>
      </main>
      <Footer />
    </>
  );
}

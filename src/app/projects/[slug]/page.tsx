import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense, type ReactNode } from "react";
import { Footer } from "@/components/footer";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "@/components/icons";
import { Nav } from "@/components/nav";
import { Rich } from "@/components/rich";
import { getProject, projectIndex, projects } from "@/content/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.problem,
    alternates: { canonical: `/projects/${p.slug}` },
    openGraph: {
      title: p.title,
      description: p.problem,
      url: `/projects/${p.slug}`,
      type: "article",
    },
    twitter: { title: p.title, description: p.problem },
  };
}

function Block({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby={id} data-reveal className="mt-14 md:mt-16">
      <h2 id={id} className="display mb-4 text-[1.05rem] font-semibold">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  return (
    <>
      <Nav />
      <Suspense fallback={<main id="main" className="min-h-dvh" />}>
        <ProjectContent params={params} />
      </Suspense>
      <Footer />
    </>
  );
}

async function ProjectContent({
  params,
}: {
  params: PageProps<"/projects/[slug]">["params"];
}) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const i = projects.indexOf(p);
  const next = projects[(i + 1) % projects.length];
  const n = projectIndex(p.slug);
  const repo = p.links.find((l) => l.href.includes("github.com"));

  return (
    <main id="main" className="mx-auto max-w-[1120px] px-4 md:px-8">
      <Link
        href="/#work"
        className="meta group mt-8 inline-flex items-center gap-1.5 text-muted transition-colors hover:text-ink md:mt-12"
      >
        <ArrowLeft className="transition-transform group-hover:-translate-x-0.5" />
        All work
      </Link>

      <header className="mt-8 md:mt-12">
        <p
          className="display display-narrow text-[3.5rem] leading-none font-light text-accent tabular-nums md:text-[4.5rem]"
          aria-hidden
        >
          {n}
        </p>
        <h1 className="display display-wide mt-3 text-[clamp(2.2rem,6vw,4rem)] leading-[1] font-[650]">
          {p.title}
        </h1>
        <p className="mt-5 max-w-[34ch] text-[clamp(1.25rem,2.4vw,1.6rem)] leading-[1.3] text-balance">
          {p.problem}
        </p>
      </header>

      <div className="mt-12 grid gap-x-8 gap-y-10 border-t border-rule pt-8 md:grid-cols-12">
        <aside className="md:col-span-3 md:col-start-10 md:row-start-1">
          <dl className="meta grid grid-cols-[5.5rem_1fr] gap-x-4 gap-y-3 md:sticky md:top-24 md:grid-cols-1 md:gap-y-1">
            <dt className="text-muted">Year</dt>
            <dd className="md:mb-4">{p.year}</dd>
            <dt className="text-muted">Role</dt>
            <dd className="md:mb-4">{p.role}</dd>
            {p.context && (
              <>
                <dt className="text-muted">Context</dt>
                <dd className="md:mb-4">{p.context}</dd>
              </>
            )}
            <dt className="text-muted">Stack</dt>
            <dd className="md:mb-4">
              <ul className="flex flex-wrap gap-x-3 md:block">
                {p.stack.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </dd>
            <dt className="text-muted">Links</dt>
            <dd>
              <ul className="space-y-0.5">
                {p.links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex min-h-6 items-center gap-0.5 text-ink transition-colors hover:text-accent"
                    >
                      {l.label}
                      <ArrowUpRight className="text-muted group-hover:text-accent" />
                    </a>
                  </li>
                ))}
                {!repo && p.repoNote && (
                  <li className="text-muted">{p.repoNote}</li>
                )}
              </ul>
            </dd>
          </dl>
        </aside>

        <article className="md:col-span-8 md:row-start-1">
          {p.shot && (
            <figure className="overflow-hidden rounded-md border border-rule bg-surface">
              <Image
                src={p.shot.src}
                alt={p.shot.alt}
                width={p.shot.width}
                height={p.shot.height}
                sizes="(min-width: 1120px) 700px, (min-width: 768px) 66vw, 100vw"
                loading="eager"
                fetchPriority="high"
                className="h-auto w-full"
              />
            </figure>
          )}

          <div className="max-w-[66ch]">
            <Block id="problem" title="Problem">
              <div className="space-y-4">
                {p.why.map((t) => (
                  <p key={t}>
                    <Rich text={t} />
                  </p>
                ))}
              </div>
            </Block>

            <Block id="approach" title="Approach">
              <div className="space-y-4">
                {p.approach.map((t) => (
                  <p key={t}>
                    <Rich text={t} />
                  </p>
                ))}
              </div>

              <div className="mt-8 border-l-2 border-accent pl-5">
                <h3 className="display text-[1.15rem] font-semibold">
                  {p.decision.title}
                </h3>
                <p className="meta mt-0.5 text-muted">The hardest decision</p>
                <div className="mt-3 space-y-4">
                  {p.decision.body.map((t) => (
                    <p key={t}>
                      <Rich text={t} />
                    </p>
                  ))}
                </div>
              </div>
            </Block>

            <Block id="architecture" title="Architecture">
              <ol className="relative">
                {p.architecture.map((s, idx) => (
                  <li
                    key={s.step}
                    className="relative grid grid-cols-[2rem_1fr] gap-x-3 pb-5 last:pb-0"
                  >
                    {idx < p.architecture.length - 1 && (
                      <span
                        aria-hidden
                        className="absolute top-7 bottom-1 left-[0.6rem] w-px bg-rule"
                      />
                    )}
                    <span className="meta grid size-5 place-items-center rounded-full border border-rule bg-bg text-[0.68rem] text-muted">
                      {idx + 1}
                    </span>
                    <div>
                      <p className="display text-[1rem] font-semibold">
                        {s.step}
                      </p>
                      <p className="mt-0.5 text-muted">
                        <Rich text={s.detail} />
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </Block>

            <Block id="learned" title="What I learned">
              <ul className="space-y-3">
                {p.learned.map((t) => (
                  <li key={t} className="grid grid-cols-[1rem_1fr] gap-x-2">
                    <span
                      aria-hidden
                      className="mt-[0.7em] h-px w-2.5 bg-muted"
                    />
                    <span>
                      <Rich text={t} />
                    </span>
                  </li>
                ))}
              </ul>
            </Block>
          </div>

          {p.gallery && p.gallery.length > 0 && (
            <div data-reveal className="mt-14 grid gap-4 sm:grid-cols-2">
              {p.gallery.map((g) => (
                <figure
                  key={g.src}
                  className={`overflow-hidden rounded-md border border-rule bg-surface ${
                    g.width / g.height > 1.6 || p.gallery!.length === 1
                      ? "sm:col-span-2"
                      : ""
                  }`}
                >
                  <Image
                    src={g.src}
                    alt={g.alt}
                    width={g.width}
                    height={g.height}
                    sizes="(min-width: 768px) 700px, 100vw"
                    className="h-auto w-full"
                  />
                </figure>
              ))}
            </div>
          )}
        </article>
      </div>

      <nav
        aria-label="Next project"
        className="mt-20 border-t border-rule pt-6 md:mt-28"
      >
        <Link
          href={`/projects/${next.slug}`}
          className="group flex items-end justify-between gap-6"
        >
          <span>
            <span className="meta block text-muted">Next project</span>
            <span className="display display-wide mt-2 block text-[clamp(1.6rem,4vw,2.6rem)] leading-none font-[650] transition-colors group-hover:text-accent">
              {next.title}
            </span>
          </span>
          <ArrowRight className="mb-1 size-6 shrink-0 text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent" />
        </Link>
      </nav>
    </main>
  );
}

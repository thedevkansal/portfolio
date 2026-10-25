"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Project } from "@/content/types";
import { ArrowRight } from "./icons";
import { Section } from "./section";

/** Each row gets a sticker colour, cycling, used for its hover wash and preview frame. */
const tints = ["var(--sky)", "var(--mint)", "var(--sun)", "var(--rose)"];

type Card = Pick<Project, "slug" | "title" | "problem" | "stack" | "shot" | "context">;

/**
 * Selected work. On wide screens with a pointer, hovering or focusing a row
 * wipes its screenshot into the sticky left column.
 */
export function WorkList({ projects }: { projects: Card[] }) {
  const [active, setActive] = useState<string | null>(null);
  const total = String(projects.length).padStart(2, "0");

  const aside = (
    <div className="mt-3 hidden lg:block">
      <p className="text-[0.95rem] leading-snug text-muted">
        {projects.length} projects, strongest first. Each one opens a write-up of the problem,
        the approach and the architecture.
      </p>
      <div className="relative mt-6 aspect-[16/10] w-full" aria-hidden>
        {projects.map((p, i) => {
          const on = active === p.slug;
          return (
            <figure
              key={p.slug}
              className="absolute inset-0 overflow-hidden rounded-xl border border-rule p-2 transition-[clip-path,opacity] duration-[220ms] ease-out-soft"
              style={{
                clipPath: on ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
                opacity: on ? 1 : 0,
                background: tints[i % tints.length],
              }}
            >
              {p.shot ? (
                <div className="relative h-full overflow-hidden rounded-md">
                  <Image src={p.shot.src} alt="" fill sizes="260px" className="object-cover object-top" />
                </div>
              ) : (
                <div className="flex h-full flex-col justify-between p-4">
                  <span className="display display-narrow text-5xl font-light text-sticker-ink">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="meta text-sticker-ink/70">No screenshots: private event data</span>
                </div>
              )}
            </figure>
          );
        })}
      </div>
    </div>
  );

  return (
    <Section id="work" title="Selected work" aside={aside}>
      <ol className="-mt-2 md:-mt-4" onMouseLeave={() => setActive(null)}>
        {projects.map((p, i) => {
          const n = String(i + 1).padStart(2, "0");
          return (
            <li
              key={p.slug}
              className="border-b border-rule last:border-b-0"
              style={{ "--tint": tints[i % tints.length] } as React.CSSProperties}
            >
              <Link
                href={`/projects/${p.slug}`}
                onMouseEnter={() => setActive(p.slug)}
                onFocus={() => setActive(p.slug)}
                onBlur={() => setActive(null)}
                className="group -mx-3 grid grid-cols-[2.75rem_1fr] gap-x-3 rounded-lg px-3 py-6 transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-[color-mix(in_oklab,var(--tint)_38%,var(--surface))] focus-visible:bg-[color-mix(in_oklab,var(--tint)_38%,var(--surface))] sm:grid-cols-[4.5rem_1fr_auto] sm:gap-x-5 md:py-7"
              >
                <span
                  aria-hidden
                  className="display display-narrow pt-0.5 text-[2.4rem] leading-[0.85] font-light text-muted tabular-nums transition-colors group-hover:text-ink sm:text-[3.4rem]"
                >
                  {n}
                </span>
                <div className="min-w-0">
                  <h3 className="display text-[1.3rem] font-semibold sm:text-[1.55rem]">
                    <span className="sr-only">{`${n} of ${total}: `}</span>
                    {p.title}
                  </h3>
                  {p.context && <p className="meta mt-1 text-muted">{p.context}</p>}
                  <p className="mt-2 max-w-[58ch] text-[1rem] leading-relaxed text-muted sm:text-[1.0625rem]">
                    {p.problem}
                  </p>
                  <ul className="meta mt-3 flex flex-wrap gap-x-3 gap-y-1 text-muted" aria-label="Stack">
                    {p.stack.slice(0, 5).map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
                <span className="meta col-start-2 mt-3 flex items-center text-ink sm:col-start-3 sm:mt-0 sm:self-center sm:text-muted sm:group-hover:text-accent">
                  <span className="sr-only">Read the write-up</span>
                  <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}

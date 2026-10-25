import { site } from "@/content/site";
import { ArrowUpRight } from "./icons";

const built = new Date(process.env.BUILD_DATE ?? "2026-10-26");

const updated = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: site.location.timeZone,
}).format(built);

export function Footer() {
  return (
    <footer className="mx-auto mt-24 max-w-[1120px] px-4 pb-10 md:mt-32 md:px-8">
      <div className="meta flex flex-col gap-2 border-t border-rule pt-6 text-muted md:flex-row md:justify-between">
        <p>© {built.getFullYear()} {site.name}</p>
        <p>
          <a
            href={site.source}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex min-h-6 items-center gap-0.5 transition-colors hover:text-accent"
          >
            Source on GitHub
            <ArrowUpRight className="transition-transform group-hover:-translate-y-px" />
          </a>
        </p>
        <p>
          Last updated <time dateTime={built.toISOString().slice(0, 10)}>{updated}</time>
        </p>
      </div>
    </footer>
  );
}

export type Link = { label: string; href: string };

export type Shot = { src: string; alt: string; width: number; height: number };

export type Project = {
  slug: string;
  title: string;
  /** One line: the problem it solves. Shown on the index card. */
  problem: string;
  year: string;
  role: string;
  /** Where it was built, e.g. a hackathon or an org. */
  context?: string;
  stack: string[];
  /** Longer framing of the problem for the detail page. */
  why: string[];
  /** What was built. */
  approach: string[];
  /** The hardest technical decision and its reasoning. */
  decision: { title: string; body: string[] };
  /** The request path or data flow, in order. */
  architecture: { step: string; detail: string }[];
  learned: string[];
  links: Link[];
  /** Shown instead of a repo link when the code is private. */
  repoNote?: string;
  shot?: Shot;
  /** Extra screenshots for the detail page. */
  gallery?: Shot[];
};

export type Achievement = {
  title: string;
  detail: string;
  date: string;
  href?: string;
};

export type Role = {
  role: string;
  org: string;
  dates: string;
  summary: string;
};

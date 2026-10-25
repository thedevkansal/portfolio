import type { Achievement, Link, Role } from "./types";

export const site = {
  name: "Dev Kansal",
  handle: "thedevkansal",
  headline: "Backend engineer building systems that stay correct when everyone hits them at once.",
  description:
    "Dev Kansal is a pre-final year student at IIT Roorkee building backends, distributed systems and cloud-native infrastructure with TypeScript, NestJS, Postgres and Redis.",
  status: "Pre-final year @ IIT Roorkee",
  availability: "Open to SDE internships, summer 2027",
  location: { city: "Roorkee", timeZone: "Asia/Kolkata" },
  email: "devkansal24024@gmail.com",
  resume: "/Dev_Kansal_Resume.pdf",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
};

export const socials: Link[] = [
  { label: "GitHub", href: "https://github.com/thedevkansal" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/thedevkansal" },
  { label: "X", href: "https://x.com/thedevkansal" },
];

export const achievements: Achievement[] = [
  {
    title: "ICPC 2026 Online Challenge, powered by Huawei",
    detail: "Third Prize, rank 35",
    date: "Oct 2026",
  },
  // TODO: ETHGlobal Mumbai (Nov 2026): add the result once it's done.
];

export const roles: Role[] = [
  {
    role: "Software Developer Intern",
    org: "Jastro",
    dates: "May – Jul 2025",
    summary:
      "Built 12+ REST APIs and backend services in Express, and shipped Next.js and Postgres features, for an AI astrology platform with 2,000+ users and 100+ paid subscribers.",
  },
  {
    role: "Head of Zero to One",
    org: "E-Cell, IIT Roorkee",
    dates: "May 2026 – now",
    summary:
      "Lead a 60+ member team taking campus problems from 250+ surveys to PRDs and five MVPs.",
  },
  {
    role: "Placement Coordinator",
    org: "PIC, IIT Roorkee",
    dates: "May 2026 – now",
    summary:
      "Coordinate outreach to 40+ companies and recruitment logistics for 1,000+ students.",
  },
];

export const stack: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["TypeScript", "C++", "Python", "SQL"] },
  { group: "Backend", items: ["Node.js", "NestJS", "Express", "FastAPI"] },
  { group: "Data", items: ["PostgreSQL", "Redis", "Prisma", "Drizzle", "FalkorDB"] },
  { group: "Infra", items: ["Docker", "BullMQ", "Socket.IO", "Vercel", "Render"] },
  { group: "Frontend", items: ["React", "Next.js", "Tailwind CSS"] },
];

export const sections = [
  { id: "work", label: "Work" },
  { id: "achievements", label: "Achievements" },
  { id: "experience", label: "Experience" },
  { id: "stack", label: "Stack" },
  { id: "contact", label: "Contact" },
] as const;

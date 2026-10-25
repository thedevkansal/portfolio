import {
  siCplusplus,
  siDocker,
  siDrizzle,
  siExpress,
  siFastapi,
  siNestjs,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPrisma,
  siPython,
  siReact,
  siRedis,
  siRender,
  siSocketdotio,
  siTailwindcss,
  siTypescript,
  siVercel,
  type SimpleIcon,
} from "simple-icons";

const brands: Record<string, SimpleIcon> = {
  TypeScript: siTypescript,
  "C++": siCplusplus,
  Python: siPython,
  "Node.js": siNodedotjs,
  NestJS: siNestjs,
  Express: siExpress,
  FastAPI: siFastapi,
  PostgreSQL: siPostgresql,
  Redis: siRedis,
  Prisma: siPrisma,
  Drizzle: siDrizzle,
  Docker: siDocker,
  "Socket.IO": siSocketdotio,
  Vercel: siVercel,
  Render: siRender,
  React: siReact,
  "Next.js": siNextdotjs,
  "Tailwind CSS": siTailwindcss,
};

/** Hand-drawn glyphs (24×24) for tools without a brand mark in simple-icons. */
const glyphs: Record<string, string> = {
  // database cylinder
  SQL: "M12 3c4.4 0 8 1.3 8 3v12c0 1.7-3.6 3-8 3s-8-1.3-8-3V6c0-1.7 3.6-3 8-3zm6 5.4C16.5 9.2 14.4 9.6 12 9.6S7.5 9.2 6 8.4V12c0 .5 2.3 1.6 6 1.6s6-1.1 6-1.6V8.4zm0 6C16.5 15.2 14.4 15.6 12 15.6s-4.5-.4-6-1.2V18c0 .5 2.3 1.6 6 1.6s6-1.1 6-1.6v-3.6zM12 5C8.3 5 6 6 6 6.5S8.3 8 12 8s6-1 6-1.5S15.7 5 12 5z",
  // three connected nodes: a graph
  FalkorDB:
    "M6 4a3 3 0 1 1-2.2 5l-.1-.1A3 3 0 0 1 6 4zm12 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zM9 15a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm-.6-6.4 6.9 1.2-.3 1.6-6.9-1.2.3-1.6zM7 9.6l1.7 5.6-1.5.5-1.7-5.6L7 9.6zm9.5 2.7 1.1 1.2-6.3 5.6-1.1-1.2 6.3-5.6z",
  // stacked jobs: a queue
  BullMQ: "M4 5h16v3H4V5zm0 5.5h16v3H4v-3zM4 16h10v3H4v-3zm12 0h4v3h-4v-3z",
};

/** Brand colours that disappear on one of the themes fall back to the text colour. */
function fill(hex: string) {
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return lum < 0.12 || lum > 0.7 ? "currentColor" : `#${hex}`;
}

export function TechIcon({ name, className }: { name: string; className?: string }) {
  const brand = brands[name];
  const path = brand?.path ?? glyphs[name];
  if (!path) return null;
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill={brand ? fill(brand.hex) : "currentColor"}>
      <path d={path} />
    </svg>
  );
}

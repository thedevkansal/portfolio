import { getProject, projectIndex, projects } from "@/content/projects";
import { site } from "@/content/site";
import { ogImage, ogSize } from "@/lib/og";

export const alt = "Project write-up";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  return ogImage({
    kicker: p ? projectIndex(p.slug) : undefined,
    title: p?.title ?? site.name,
    body: p?.problem ?? site.headline,
    footer: p ? p.stack.slice(0, 4).join("  ") : site.availability,
  });
}

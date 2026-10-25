import { site } from "@/content/site";
import { ogImage, ogSize } from "@/lib/og";

export const alt = `${site.name}: ${site.headline}`;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    title: site.name,
    body: site.headline,
    footer: site.availability,
    aside: "IIT Roorkee",
  });
}

import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const ogSize = { width: 1200, height: 630 };

type FontSpec = { name: string; family: string; text: string; weight: 400 | 600 | 700 };

/** Fetches a TTF subset of a Google font containing only `text`. Returns null when offline. */
async function loadFont({ family, text }: FontSpec) {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=${family}&text=${encodeURIComponent(text)}`,
    ).then((r) => r.text());
    const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    if (!url) return null;
    return await fetch(url).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

async function fonts(specs: FontSpec[]) {
  const loaded = await Promise.all(specs.map(loadFont));
  return specs.flatMap((s, i) => {
    const data = loaded[i];
    return data ? [{ name: s.name, data, weight: s.weight, style: "normal" as const }] : [];
  });
}

const c = { bg: "#F3F4F6", ink: "#14161A", muted: "#5A616C", rule: "#D9DCE1", accent: "#2340D9" };

export async function ogImage({
  kicker,
  title,
  body,
  footer,
  aside = site.name,
}: {
  kicker?: string;
  title: string;
  body: string;
  footer: string;
  aside?: string;
}) {
  const specs: FontSpec[] = [
    { name: "Archivo", family: "Archivo:wdth,wght@112,650", text: `${kicker ?? ""}${title}`, weight: 700 },
    { name: "Source Serif", family: "Source+Serif+4", text: body, weight: 400 },
    { name: "Fragment Mono", family: "Fragment+Mono", text: `${footer}${aside}`, weight: 400 },
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: c.bg,
          color: c.ink,
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          {kicker && (
            <div style={{ fontFamily: "Archivo", fontSize: 72, color: c.accent, lineHeight: 1 }}>
              {kicker}
            </div>
          )}
          <div
            style={{
              fontFamily: "Archivo",
              fontSize: title.length > 18 ? 84 : 104,
              letterSpacing: "-0.03em",
              lineHeight: 1,
              marginTop: kicker ? 20 : 0,
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontFamily: "Source Serif",
              fontSize: 40,
              lineHeight: 1.25,
              marginTop: 32,
              maxWidth: 900,
            }}
          >
            {body}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: `2px solid ${c.rule}`,
            paddingTop: 28,
            fontFamily: "Fragment Mono",
            fontSize: 24,
            color: c.muted,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 12, height: 12, borderRadius: 6, background: c.accent }} />
            {footer}
          </div>
          <div style={{ color: c.ink }}>{aside}</div>
        </div>
      </div>
    ),
    { ...ogSize, fonts: await fonts(specs) },
  );
}

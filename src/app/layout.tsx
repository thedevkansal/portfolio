import type { Metadata, Viewport } from "next";
import { Archivo, Fragment_Mono, Source_Serif_4 } from "next/font/google";
import { CommandMenuLauncher } from "@/components/command-menu-launcher";
import { RevealObserver } from "@/components/reveal-observer";
import { site } from "@/content/site";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  display: "swap",
});

const fragmentMono = Fragment_Mono({
  variable: "--font-fragment-mono",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name}: backend and distributed systems`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.name,
    description: site.headline,
    url: "/",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@thedevkansal",
    title: site.name,
    description: site.headline,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafc" },
    { media: "(prefers-color-scheme: dark)", color: "#121418" },
  ],
};

// Runs before paint: marks JS as available, applies a stored theme, and sets up the
// scroll reveal on DOMContentLoaded so content already in view shows without waiting for
// hydration. RevealObserver takes over on client navigations.
const bootScript = `(function(){var d=document.documentElement;d.classList.add('js');try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')d.dataset.theme=t}catch(e){}document.addEventListener('DOMContentLoaded',function(){var els=document.querySelectorAll('[data-reveal]');if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('is-in')});return}var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('is-in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px',threshold:0.05});els.forEach(function(e){io.observe(e)})})})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${archivo.variable} ${sourceSerif.variable} ${fragmentMono.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body className="min-h-dvh">
        <a
          href="#main"
          className="meta sr-only z-50 rounded bg-ink px-3 py-2 text-bg focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        {children}
        <CommandMenuLauncher />
        <RevealObserver />
      </body>
    </html>
  );
}

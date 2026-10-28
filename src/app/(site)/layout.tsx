import type { Metadata } from "next";
import "@fontsource/barlow-condensed/600.css";
import "@fontsource/barlow-condensed/700.css";
import "@fontsource/barlow-condensed/800.css";
import "@fontsource-variable/manrope";
import "./site.css";
import { getSite } from "@/lib/content";
import { Header, MotionObserver } from "@/components/Experience";
import { Footer } from "@/components/Sections";
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://callwowzer.com",
  ),
  title: {
    default: "Wowzer! | Plumbing & Air in Tampa Bay",
    template: "%s | Wowzer!",
  },
  description:
    "Plumbing and heating & air services with upfront pricing, honest answers, and a whole lot of Wow. Serving Tampa, Brandon and surrounding communities.",
  robots:
    process.env.ALLOW_INDEXING === "true"
      ? { index: true, follow: true }
      : { index: false, follow: false },
  icons: { icon: "/icon.svg" },
  openGraph: {
    type: "website",
    siteName: "Wowzer!",
    images: [
      {
        url: "/images/wowzer-van.png",
        width: 1200,
        height: 720,
        alt: "Wowzer Plumbing and Air service van",
      },
    ],
  },
};
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const site = await getSite();
  return (
    <html lang="en">
      <body id="top">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header site={site} />
        <main id="main">{children}</main>
        <Footer site={site} />
        <MotionObserver />
      </body>
    </html>
  );
}

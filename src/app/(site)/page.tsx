import type { Metadata } from "next";
import { ArrowDown, ArrowUpRight, Phone } from "lucide-react";
import { getSite, getServices } from "@/lib/content";
import { BookButton, MotionScene } from "@/components/Experience";
import {
  TrustStrip,
  Services,
  PromiseSection,
  Membership,
  AreaSection,
  FAQs,
  Closing,
} from "@/components/Sections";
export const metadata: Metadata = { alternates: { canonical: "/" } };
export default async function Home() {
  const [site, services] = await Promise.all([getSite(), getServices()]);
  const jsonLD = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: "Wowzer Plumbing & Air",
    url: "https://callwowzer.com",
    telephone: site.phone,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "6802 Lakeview Center Drive, Unit 3-305",
      addressLocality: "Tampa",
      addressRegion: "FL",
      postalCode: "33619",
      addressCountry: "US",
    },
    areaServed: site.serviceAreas.map((name) => ({ "@type": "City", name })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Home services",
      itemListElement: services.map((s) => ({
        "@type": "OfferCatalog",
        name: s.title,
      })),
    },
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLD).replace(/</g, "\\u003c"),
        }}
      />
      <section className="hero">
        <div className="hero-copy">
          <h1>
            {site.heroTitle}
            <br />
            <span>{site.heroAccent}</span>
          </h1>
          <p>{site.heroDescription}</p>
          <div className="hero-buttons">
            <BookButton>Bring on the Wow</BookButton>
            <a
              className="hero-call"
              href={`tel:+1${site.phone.replace(/\D/g, "")}`}
            >
              <Phone size={18} />
              <span>
                Call your local team
                <ArrowUpRight size={14} />
              </span>
            </a>
          </div>
          <div className="hero-note">
            <span /> Same-day appointments when available
          </div>
        </div>
        <MotionScene van={site.vanPath} />
        <a className="explore" href="#services">
          <ArrowDown size={16} /> A better day starts here
        </a>
      </section>
      <TrustStrip />
      <Services services={services} />
      <PromiseSection site={site} />
      <Membership site={site} />
      <AreaSection site={site} />
      <FAQs items={site.faqs} />
      <Closing site={site} />
    </>
  );
}

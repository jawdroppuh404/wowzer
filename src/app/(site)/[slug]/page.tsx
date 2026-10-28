import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Droplets, Wind, Check } from "lucide-react";
import { getSite, getServices } from "@/lib/content";
import { BookButton, MotionScene } from "@/components/Experience";
import { TrustStrip, FAQs, Closing, AreaSection } from "@/components/Sections";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = (await getServices()).find((p) => p.slug === slug);
  return page
    ? {
        title: { absolute: page.seoTitle },
        description: page.seoDescription,
        alternates: { canonical: `/${slug}` },
      }
    : { title: "Page not found" };
}
export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [site, services] = await Promise.all([getSite(), getServices()]);
  const page = services.find((p) => p.slug === slug);
  if (!page) notFound();
  return (
    <>
      <section className={`service-hero ${page.theme}`}>
        <div className="service-hero-copy">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            {page.title}
          </div>
          <h1>
            {page.heroTitle}
            <br />
            <span>{page.heroAccent}</span>
          </h1>
          <p>{page.description}</p>
          <BookButton>
            Schedule {page.slug === "hvac" ? "heating & air" : "plumbing"}{" "}
            service
          </BookButton>
          <div className="service-hero-note">
            <Check size={16} /> Upfront pricing. Clear answers. Friendly people.
          </div>
        </div>
        <MotionScene
          backdrop={
            page.theme === "water" ? site.homeImage : site.backyardImage
          }
          theme={page.theme}
          van={page.image || site.vanPath}
          alt={page.imageAlt}
        />
      </section>
      <TrustStrip />
      <section className="offerings section-pad">
        <div className="section-heading reveal">
          <h2>{page.introTitle}</h2>
          <p>{page.intro}</p>
        </div>
        <div className="offerings-list">
          {page.offerings.map((o) => (
            <article className="offering reveal" key={o.title}>
              <div className="offering-icon">
                {page.theme === "water" ? <Droplets /> : <Wind />}
              </div>
              <div>
                <h3>{o.title}</h3>
                <p>{o.description}</p>
              </div>
              <Link
                href="/schedule"
                aria-label={`Schedule ${o.title.toLowerCase()}`}
              >
                <ArrowUpRight />
              </Link>
            </article>
          ))}
        </div>
      </section>
      <section className="service-promise section-pad">
        <h2>
          We fix the problem.
          <br />
          <em>You keep the peace of mind.</em>
        </h2>
        <div>
          <p>
            We start by listening. Then we explain what we find, walk through
            your options, and give you the price before work begins.
          </p>
          <p>
            No pressure. Just the information you need and a team ready to help.
          </p>
          <BookButton className="outline" />
        </div>
      </section>
      <AreaSection site={site} />
      <FAQs items={page.faqs} />
      <Closing site={site} />
    </>
  );
}

import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  Check,
  Droplets,
  Wind,
  MapPin,
  ArrowRight,
  Plus,
  Phone,
} from "lucide-react";
import type { FAQ, Service, SiteSettings } from "@/lib/defaults";
import { BookButton } from "./Experience";
export function TrustStrip() {
  return (
    <div className="trust-strip">
      <span>
        <Check /> Upfront pricing
      </span>
      <span>
        <Check /> Free second opinions
      </span>
      <span>
        <Check /> Same-day service when available
      </span>
      <span>
        <Check /> A team that cares
      </span>
    </div>
  );
}
export function Services({
  services,
  site,
}: {
  services: Service[];
  site: SiteSettings;
}) {
  return (
    <section className="services section-pad" id="services">
      <div className="section-heading reveal">
        <h2>
          How can we
          <br />
          <em>wow you today?</em>
        </h2>
        <p>
          One familiar van.
          <br />
          So many ways to feel at home.
        </p>
      </div>
      <div className="service-panels">
        {services.map((s) => (
          <Link
            href={`/${s.slug}`}
            className={`service-panel photo-panel ${s.theme} reveal`}
            key={s.slug}
          >
            <div className="service-panel-top">
              <span className="service-name">{s.title}</span>
              <span className="circle-arrow">
                <ArrowUpRight />
              </span>
            </div>
            <Image
              sizes="(max-width: 600px) 90vw, 45vw"
              className="service-photo"
              src={s.theme === "water" ? site.homeImage : site.backyardImage}
              alt={
                s.theme === "water"
                  ? "Illustrative Florida home framed by palms"
                  : "Illustrative Florida backyard with a shaded lanai"
              }
              width={1536}
              height={1024}
              loading="lazy"
            />
            <div className="service-panel-bottom">
              <h3>
                {s.theme === "water" ? (
                  <>
                    Less drip.
                    <br />
                    More ahhh.
                  </>
                ) : (
                  <>
                    More comfort.
                    <br />
                    Less hot & bothered.
                  </>
                )}
              </h3>
              <span>
                {s.theme === "water"
                  ? "Leaks · Drains · Water heaters · Repiping"
                  : "AC · Heating · Ductwork · Air quality"}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
export function PromiseSection({ site }: { site: SiteSettings }) {
  return (
    <section className="promise section-pad" id="why-wowzer">
      <div className="promise-intro reveal">
        <div className="little-star" aria-hidden="true">
          <Plus />
        </div>
        <h2>{site.promiseTitle}</h2>
        <p>{site.promiseDescription}</p>
        <BookButton className="outline" />
      </div>
      <div className="promise-list">
        {site.promises.map((p, i) => (
          <article className="reveal" key={p.title}>
            <span className="promise-mark" aria-hidden="true">
              {i === 0 ? <Check /> : i === 1 ? <Plus /> : <ArrowUpRight />}
            </span>
            <div>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
export function Membership({ site }: { site: SiteSettings }) {
  return (
    <section className="membership section-pad">
      <div className="membership-main reveal">
        <div>
          <span className="plan-name">The Wow Wellness Plan</span>
          <h2>{site.membershipTitle}</h2>
          <p>{site.membershipDescription}</p>
          <a className="text-link" href={site.membershipURL}>
            Meet your maintenance plan <ArrowUpRight />
          </a>
        </div>
        <div className="membership-seal">
          <div className="seal-words">A happier home starts here</div>
          <strong>{site.membershipPrice}</strong>
          <span>{site.membershipPeriod}</span>
          <small>{site.membershipAnnual}</small>
        </div>
      </div>
      <div className="finance reveal">
        <span className="finance-symbol" aria-hidden="true">
          <ArrowUpRight />
        </span>
        <div>
          <h3>{site.financingTitle}</h3>
          <p>{site.financingDescription}</p>
          <a className="text-link" href={site.financingURL}>
            Explore financing <ArrowUpRight />
          </a>
        </div>
      </div>
    </section>
  );
}
export function AreaSection({ site }: { site: SiteSettings }) {
  return (
    <section className="area section-pad" id="service-area">
      <div className="area-intro reveal">
        <MapPin className="area-pin" />
        <h2>
          Local people.
          <br />
          <em>Neighborly service.</em>
        </h2>
        <p>
          From Tampa to the communities around it, a whole lot of Wow is closer
          than you think.
        </p>
        <a
          className="text-link"
          href={`tel:+1${site.phone.replace(/\D/g, "")}`}
        >
          Ask about your neighborhood <ArrowUpRight />
        </a>
      </div>
      <div className="area-list reveal">
        {site.serviceAreas.map((a) => (
          <span key={a}>
            {a}
            <ArrowUpRight size={16} />
          </span>
        ))}
      </div>
      <figure className="neighborhood-photo reveal">
        <Image
          sizes="90vw"
          src={site.neighborhoodImage}
          alt="Illustrative aerial view of a palm-lined South Florida neighborhood around a lake"
          width={1536}
          height={1024}
          loading="lazy"
        />
        <figcaption>Room to unwind. A place to call home.</figcaption>
      </figure>
    </section>
  );
}
export function FAQs({ items }: { items: FAQ[] }) {
  return (
    <section className="faq section-pad">
      <div className="faq-heading reveal">
        <h2>
          A few good
          <br />
          <em>questions.</em>
        </h2>
        <p>Helpful answers. It’s kind of our thing.</p>
      </div>
      <div className="faq-list">
        {items.map((f) => (
          <details key={f.question} className="reveal">
            <summary>
              {f.question}
              <Plus size={21} />
            </summary>
            <p>{f.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
export function Closing({ site }: { site: SiteSettings }) {
  return (
    <section className="closing">
      <div className="closing-marquee" aria-hidden="true">
        <span>PLUMBING. AIR. WOW. &nbsp; PLUMBING. AIR. WOW. &nbsp;</span>
        <span>PLUMBING. AIR. WOW. &nbsp; PLUMBING. AIR. WOW. &nbsp;</span>
      </div>
      <div className="closing-content reveal">
        <h2>{site.ctaTitle}</h2>
        <div>
          <BookButton className="cream">Let’s make it a Wowzer day</BookButton>
          <a
            className="closing-phone"
            href={`tel:+1${site.phone.replace(/\D/g, "")}`}
          >
            <Phone size={17} /> {site.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
export function Footer({ site }: { site: SiteSettings }) {
  return (
    <footer className="footer">
      <div className="footer-main">
        <Link href="/" className="footer-brand" aria-label="Wowzer home">
          <img src={site.logoPath} alt="Wowzer!" width="180" height="120" />
        </Link>
        <p>
          Good people.
          <br />
          Great service.
          <br />
          <strong>A whole lotta Wow.</strong>
        </p>
        <nav aria-label="Footer services">
          <Link href="/plumbing">
            Plumbing <ArrowUpRight size={15} />
          </Link>
          <Link href="/hvac">
            Heating & air <ArrowUpRight size={15} />
          </Link>
          <Link href="/schedule">
            Schedule service <ArrowUpRight size={15} />
          </Link>
        </nav>
        <div className="footer-contact">
          <a href={`tel:+1${site.phone.replace(/\D/g, "")}`}>{site.phone}</a>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <address>{site.address}</address>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Wowzer. All rights reserved.</span>
        <a href="https://callwowzer.com/privacy-policy/">Privacy policy</a>
        <a href="#top">
          Back to top <ArrowRight size={14} />
        </a>
      </div>
    </footer>
  );
}

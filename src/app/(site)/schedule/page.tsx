import type { Metadata } from "next";
import { getSite } from "@/lib/content";
import { Scheduler } from "@/components/Experience";
export const metadata: Metadata = {
  title: "Schedule service",
  alternates: { canonical: "/schedule" },
};
export default async function Schedule() {
  const site = await getSite();
  return (
    <section className="schedule-page section-pad">
      <div>
        <h1>
          A better day
          <br />
          <em>is on the way.</em>
        </h1>
        <p>Tell us what your home needs. We’ll help you take the next step.</p>
        <Scheduler site={site} />
      </div>
      <img
        src={site.vanPath}
        alt="Wowzer service van"
        width="800"
        height="380"
      />
    </section>
  );
}

import Link from "next/link";
export default function NotFound() {
  return (
    <section className="section-pad not-found">
      <h1>A little detour.</h1>
      <p>We couldn’t find that page. Let’s get you back home.</p>
      <Link className="button" href="/">
        Back to Wowzer
      </Link>
    </section>
  );
}

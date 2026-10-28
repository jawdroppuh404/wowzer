# Wowzer — Payload + Next.js

Animated marketing website for Wowzer Plumbing & Air. Homepage, Plumbing, HVAC, and a scheduling utility page. Built with Next.js 16, Payload 3, Neon PostgreSQL, and Vercel Blob. GitHub deploys to the `wowzer` Vercel project under Jaw's projects.

## Develop

Use Node 24+. Run `npm ci`, `vercel link --project wowzer`, then `vercel env pull .env.local`. Never commit environment files. `npm run dev` starts the app. `npm run typecheck`, `npm run check`, and `npm run build` verify it.

## Content editing

Studio lives at `/admin`; `studio.callwowzer.com` redirects to `/admin` once its DNS is configured. Sign in with your named account. **Website & homepage** controls contact details, assets, homepage copy, service areas, membership, financing and FAQs. **Pages** controls Plumbing and HVAC page copy, offerings, FAQs and SEO. Upload files to **Media** (up to 4 MB). Publishing takes effect on the next public page request; drafts stay private. Global homepage changes are live immediately and retain versions. Back up before large edits.

Roles: administrators manage accounts; editors edit content; agents use authenticated REST keys and cannot open the studio or manage users. Public requests can read published pages and public global content, but cannot mutate data. No public account registration is enabled after the initial admin is seeded.

Email delivery is deliberately not configured. Password resets require an administrator until a transactional email provider is added; reset emails are not logged or sent to a stub provider. Change the temporary administrator password after first sign-in.

## Agent harness

Create a dedicated user with role `agent` in the studio and enable its API key. Keep the key in your agent's secret manager. Set `WOWZER_URL` and `WOWZER_API_KEY`; use:

```sh
node scripts/agent.mjs list
node scripts/agent.mjs site
node scripts/agent.mjs get 1
node scripts/agent.mjs draft 1 content.json
node scripts/agent.mjs publish 1
```

REST uses `Authorization: users API-Key <key>`. Page endpoints are `/api/pages`; site content is `/api/globals/site`. The harness uses drafts for edits and a separate explicit publish action. Payload enforces all role permissions for REST requests. Never use an administrator key in an external agent.

## Schema and first initialization

Migrations are versioned in `src/migrations`. Use the direct Neon connection for migration tasks. Set `DATABASE_URL` to the direct connection only in the migration process. `node --env-file=.env.local node_modules/payload/bin.js migrate` applies migrations. `npm run seed` initializes missing content without replacing existing edits; it needs BOOTSTRAP_EMAIL and BOOTSTRAP_PASSWORD only when no user exists. The initial migration and seed were applied on October 28, 2026. Do not run seeds during production builds.

Neon was provisioned on the free plan. The initial app environments share this new site's content store; do not use preview builds for destructive schema tests. Create an isolated Neon branch before migration testing or adding a production release pipeline.

## Booking and existing pages

On callwowzer.com, the schedule page loads the existing public ServiceTitan embed. The provider currently restricts it to that hostname. Review deployments instead link directly to the existing contact/booking page and offer a phone link. No test appointment should be submitted to the live business. Financing, maintenance and privacy links remain on the current live website because those pages are outside this phase.

## Domains and launch

The current main-domain site has not been switched. Review the Vercel deployment first. `ALLOW_INDEXING` defaults to false so the review site is noindexed. When launching, migrate remaining linked pages or redirect them appropriately, set NEXT_PUBLIC_SITE_URL=https://callwowzer.com and ALLOW_INDEXING=true, verify both www and apex DNS, and preserve mail records. The studio is always noindexed and protected with Payload authentication.

GoDaddy DNS for the studio, as returned by Vercel:

| Type  | Name    | Value                                                       |
| ----- | ------- | ----------------------------------------------------------- |
| CNAME | studio  | 9d4af614ac757acd.vercel-dns-017.com                         |
| TXT   | _vercel | vc-domain-verify=studio.callwowzer.com,2776bac3b9867b2a574c |

Then verify the domain in Vercel. No nameserver changes are needed.

## Assets and factual content

The supplied logo and van are preserved under public/images; WebP variants trim transparent margins for layout and reduce transfer size. Business facts came from callwowzer.com on October 28, 2026. Electrical is intentionally excluded by owner instruction. No invented testimonials, review scores, licenses or 24/7 promises are used.

## Dependency notes

Next.js and sharp were upgraded to patched releases; DOMPurify is overridden to 3.4.17. Remaining npm advisories concern upstream deepmerge (low) and the Drizzle development tool's esbuild chain (moderate); none are high or critical at verification. No dependency development server is exposed.

## Florida imagery

The neighborhood, house, and backyard photographs were generated at the owner's request. They depict illustrative South Florida settings rather than real customer jobs or named locations. Prompts and provenance are in `public/images/florida/PROVENANCE.md`. Replace their assignments in **Website & homepage → Florida imagery**. Responsive image delivery preserves the neutral color balance without a warm overlay.

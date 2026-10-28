# Wowzer build

Confirmed: new marketing website using supplied assets, Payload, GitHub and Vercel. Scope home and main service pages. Existing repository empty.
Source: https://callwowzer.com and its Plumbing/HVAC pages, accessed 2026-10-28.
Included: responsive animated design; reusable service template; Payload content models, admin, scoped agent API access; metadata, sitemap, booking integration.
Deferred: subservice pages, CRM, blog, analytics, new email provider, main-domain DNS cutover until review.
Open: Electrical availability; database provisioning; studio DNS; initial editor identity.
Architecture: one Next.js/Payload application, managed PostgreSQL, studio host routes to Payload admin. Existing booking provider retained.
Extraction: reuse business facts/ServiceTitan configuration and user-supplied brand media only. No prior client code, identifiers or secrets copied.

2026-10-28 implementation: confirmed Plumbing + HVAC only, admin jaw.droppuh404@gmail.com. Neon free database and Vercel Blob provisioned in Wowzer project; initial schema migrated and content seeded. Named admin and scoped content-agent accounts created; credentials stored only in private local handoff. No email provider configured.
Studio domain attached in Vercel, pending GoDaddy CNAME and TXT records (README). Main-domain DNS unchanged. Initial release is noindexed. Existing ServiceTitan permits callwowzer.com only, so review deployments link to the working current contact page. Main-domain deployment will use embedded scheduler.

Photography revision: owner requested removal of yellow tint and generated South Florida suburb imagery. White/cool-neutral surfaces now replace cream/beige, and the large closing color block is pale blue. Three generated photographs are stored in the repository and Payload Media, with editable assignments under Website & homepage → Florida imagery. Generated scenes are illustrative, not claims of customer projects or added service areas. Additive migration 20261028_155601 applied before deployment.

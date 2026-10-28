import { config as dotenv } from "dotenv";
dotenv({ path: ".env.local", quiet: true });
const { getPayload } = await import("payload");
const config = (await import("../src/payload.config")).default;
const { defaults, serviceDefaults } = await import("../src/lib/defaults");
const payload = await getPayload({ config });
const users = await payload.find({ collection: "users", limit: 1 });
if (!users.totalDocs) {
  if (!process.env.BOOTSTRAP_EMAIL || !process.env.BOOTSTRAP_PASSWORD)
    throw new Error("Bootstrap credentials required");
  await payload.create({
    collection: "users",
    data: {
      email: process.env.BOOTSTRAP_EMAIL,
      password: process.env.BOOTSTRAP_PASSWORD,
      role: "admin",
      name: "Jaw",
    },
  });
  console.log("Initial administrator created.");
}
const site = await payload.findGlobal({ slug: "site" });
if (!site.heroTitle)
  await payload.updateGlobal({
    slug: "site",
    data: {
      ...defaults,
      serviceAreas: defaults.serviceAreas.map((name) => ({ name })),
    },
  });
for (const service of serviceDefaults) {
  const existing = await payload.find({
    collection: "pages",
    where: { slug: { equals: service.slug } },
    limit: 1,
  });
  if (!existing.totalDocs)
    await payload.create({
      collection: "pages",
      data: {
        ...service,
        slug: service.slug as "plumbing" | "hvac",
        _status: "published",
      },
    });
}
console.log("Wowzer content seeded without overwriting existing edits.");
await payload.destroy();

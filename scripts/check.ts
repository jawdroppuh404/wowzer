import { config as dotenv } from "dotenv";
dotenv({ path: ".env.local", quiet: true });
import assert from "node:assert/strict";
const { getPayload } = await import("payload");
const config = (await import("../src/payload.config")).default;
const payload = await getPayload({ config });
const publicPages = await payload.find({
  collection: "pages",
  overrideAccess: false,
});
assert.equal(publicPages.totalDocs, 2);
assert(publicPages.docs.every((p) => p._status === "published"));
let denied = false;
try {
  await payload.updateGlobal({
    slug: "site",
    data: { heroTitle: "UNAUTHORIZED" },
    overrideAccess: false,
  });
} catch {
  denied = true;
}
assert(denied, "Anonymous content writes must be rejected");
denied = false;
try {
  await payload.create({
    collection: "users",
    data: {
      email: "unauthorized@example.invalid",
      password: "not-a-real-account",
      role: "admin",
    },
    overrideAccess: false,
  });
} catch {
  denied = true;
}
assert(denied, "Anonymous user creation must be rejected");
const users = await payload.find({
  collection: "users",
  where: { role: { equals: "admin" } },
  limit: 1,
});
assert(users.totalDocs >= 1);
assert.equal(users.docs[0].role, "admin");
console.log(
  "PASS: published content loads, anonymous writes and registrations blocked, administrator exists.",
);
await payload.destroy();
process.exit(0);

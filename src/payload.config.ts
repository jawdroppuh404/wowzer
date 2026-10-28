import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Users } from "./collections/Users";
import { Pages } from "./collections/Pages";
import { Media } from "./collections/Media";
import { Site } from "./globals/Site";
const dirname = path.dirname(fileURLToPath(import.meta.url));
export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || "",
  admin: {
    user: "users",
    importMap: { baseDir: dirname },
    meta: { titleSuffix: " · Wowzer Studio" },
  },
  collections: [Users, Pages, Media],
  globals: [Site],
  sharp,
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
      max: 3,
      idleTimeoutMillis: 10000,
      connectionTimeoutMillis: 10000,
    },
    push: false,
    migrationDir: path.resolve(dirname, "migrations"),
  }),
  plugins: [
    vercelBlobStorage({
      enabled: !!process.env.BLOB_READ_WRITE_TOKEN,
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN || "",
    }),
  ],
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
  email: () => ({
    name: "email-disabled",
    defaultFromAddress: "info@callwowzer.com",
    defaultFromName: "Wowzer",
    sendEmail: async () => {
      throw new Error(
        "Email delivery is not configured. Contact your studio administrator to reset access.",
      );
    },
  }),
  graphQL: { disable: true },
  upload: { limits: { fileSize: 4_000_000 } },
});

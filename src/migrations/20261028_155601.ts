import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site" ADD COLUMN "neighborhood_photo_id" integer;
  ALTER TABLE "site" ADD COLUMN "home_photo_id" integer;
  ALTER TABLE "site" ADD COLUMN "backyard_photo_id" integer;
  ALTER TABLE "_site_v" ADD COLUMN "version_neighborhood_photo_id" integer;
  ALTER TABLE "_site_v" ADD COLUMN "version_home_photo_id" integer;
  ALTER TABLE "_site_v" ADD COLUMN "version_backyard_photo_id" integer;
  ALTER TABLE "site" ADD CONSTRAINT "site_neighborhood_photo_id_media_id_fk" FOREIGN KEY ("neighborhood_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site" ADD CONSTRAINT "site_home_photo_id_media_id_fk" FOREIGN KEY ("home_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site" ADD CONSTRAINT "site_backyard_photo_id_media_id_fk" FOREIGN KEY ("backyard_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_v" ADD CONSTRAINT "_site_v_version_neighborhood_photo_id_media_id_fk" FOREIGN KEY ("version_neighborhood_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_v" ADD CONSTRAINT "_site_v_version_home_photo_id_media_id_fk" FOREIGN KEY ("version_home_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_v" ADD CONSTRAINT "_site_v_version_backyard_photo_id_media_id_fk" FOREIGN KEY ("version_backyard_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "site_neighborhood_photo_idx" ON "site" USING btree ("neighborhood_photo_id");
  CREATE INDEX "site_home_photo_idx" ON "site" USING btree ("home_photo_id");
  CREATE INDEX "site_backyard_photo_idx" ON "site" USING btree ("backyard_photo_id");
  CREATE INDEX "_site_v_version_version_neighborhood_photo_idx" ON "_site_v" USING btree ("version_neighborhood_photo_id");
  CREATE INDEX "_site_v_version_version_home_photo_idx" ON "_site_v" USING btree ("version_home_photo_id");
  CREATE INDEX "_site_v_version_version_backyard_photo_idx" ON "_site_v" USING btree ("version_backyard_photo_id");`);
}

export async function down({
  db,
  payload,
  req,
}: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site" DROP CONSTRAINT "site_neighborhood_photo_id_media_id_fk";

  ALTER TABLE "site" DROP CONSTRAINT "site_home_photo_id_media_id_fk";

  ALTER TABLE "site" DROP CONSTRAINT "site_backyard_photo_id_media_id_fk";

  ALTER TABLE "_site_v" DROP CONSTRAINT "_site_v_version_neighborhood_photo_id_media_id_fk";

  ALTER TABLE "_site_v" DROP CONSTRAINT "_site_v_version_home_photo_id_media_id_fk";

  ALTER TABLE "_site_v" DROP CONSTRAINT "_site_v_version_backyard_photo_id_media_id_fk";

  DROP INDEX "site_neighborhood_photo_idx";
  DROP INDEX "site_home_photo_idx";
  DROP INDEX "site_backyard_photo_idx";
  DROP INDEX "_site_v_version_version_neighborhood_photo_idx";
  DROP INDEX "_site_v_version_version_home_photo_idx";
  DROP INDEX "_site_v_version_version_backyard_photo_idx";
  ALTER TABLE "site" DROP COLUMN "neighborhood_photo_id";
  ALTER TABLE "site" DROP COLUMN "home_photo_id";
  ALTER TABLE "site" DROP COLUMN "backyard_photo_id";
  ALTER TABLE "_site_v" DROP COLUMN "version_neighborhood_photo_id";
  ALTER TABLE "_site_v" DROP COLUMN "version_home_photo_id";
  ALTER TABLE "_site_v" DROP COLUMN "version_backyard_photo_id";`);
}

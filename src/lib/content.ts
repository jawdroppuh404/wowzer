import { getPayload } from "payload";
import config from "@payload-config";
import { cache } from "react";
import { defaults, type SiteSettings, type Service } from "./defaults";
export const getSite = cache(async (): Promise<SiteSettings> => {
  const payload = await getPayload({ config });
  const site = await payload.findGlobal({
    slug: "site",
    depth: 1,
    overrideAccess: false,
  });
  return {
    ...defaults,
    ...site,
    serviceAreas:
      site.serviceAreas?.map((a) => a.name) || defaults.serviceAreas,
    logoPath:
      typeof site.logo === "object" && site.logo?.url
        ? site.logo.url
        : site.logoPath || defaults.logoPath,
    vanPath:
      typeof site.van === "object" && site.van?.url
        ? site.van.url
        : site.vanPath || defaults.vanPath,
    promises: site.promises || defaults.promises,
    faqs: site.faqs || defaults.faqs,
  } as SiteSettings;
});
export const getServices = cache(async (): Promise<Service[]> => {
  const payload = await getPayload({ config });
  const pages = await payload.find({
    collection: "pages",
    limit: 10,
    sort: "createdAt",
    depth: 1,
    overrideAccess: false,
    where: { _status: { equals: "published" } },
  });
  return pages.docs.map((p) => ({
    ...p,
    image:
      typeof p.featureImage === "object" && p.featureImage?.url
        ? p.featureImage.url
        : p.image,
  })) as Service[];
});

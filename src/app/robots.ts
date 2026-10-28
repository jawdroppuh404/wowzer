import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  return {
    rules:
      process.env.ALLOW_INDEXING === "true"
        ? {
            userAgent: "*",
            allow: "/",
            disallow: ["/admin", "/api", "/studio"],
          }
        : { userAgent: "*", disallow: "/" },
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL || "https://callwowzer.com"}/sitemap.xml`,
  };
}

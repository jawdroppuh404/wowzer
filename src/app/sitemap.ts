import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const origin = process.env.NEXT_PUBLIC_SITE_URL || "https://callwowzer.com";
  return ["", "/plumbing", "/hvac", "/schedule"].map((path) => ({
    url: `${origin}${path}`,
    changeFrequency: "weekly",
    priority: path ? 0.8 : 1,
  }));
}

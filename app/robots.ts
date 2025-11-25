import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/login", "/admin/", "/dashboard/"],
    },
    sitemap: "https://www.nclsail.com/sitemap.xml",
  }
}

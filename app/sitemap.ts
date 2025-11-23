// frontend/app/sitemap.ts
import { MetadataRoute } from "next";
import { locales } from "../i18n/config";
import { SITE_URL } from "./constants/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;

  const routes = ["", "/convert", "/ai", "/pricing"];

  const urls: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const r of routes) {
      urls.push({
        url: `${baseUrl}/${locale}${r}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: r === "" ? 1 : 0.8,
      });
    }
  }

  return urls;
}

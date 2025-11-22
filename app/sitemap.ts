// frontend/app/sitemap.ts
import { MetadataRoute } from "next";
import { locales } from "../i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://notemorph.com"; // 👈 cámbialo por el real

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

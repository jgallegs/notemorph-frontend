// frontend/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { defaultLocale } from "../i18n/config";
import { SITE_URL } from "./constants/site";

// Metadata dinámico, se traducirá según el locale que resuelva next-intl
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Home");

  const title = t("metaTitle");
  const description = t("metaDescription");

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    openGraph: {
      title,
      description,
      url: SITE_URL,
      siteName: "NoteMorph",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description
    }
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Usamos el idioma por defecto de la app (es) en el html root.
    // El contenido real se traduce con next-intl y el SEO fino lo hacen los metadata por locale.
    <html lang={defaultLocale}>
      <body className="bg-gray-50 text-gray-900 dark:bg-slate-950 dark:text-slate-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}

export const dynamic = "force-dynamic";

import "../globals.css";
import { ReactNode } from "react";

import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import type { Metadata } from "next";
import { locales, Locale } from "../../i18n/config";
import "../globals.css";
import Navbar from "../components/Navbar";

type Props = {
  children: React.ReactNode;
  params: { locale: Locale };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const baseUrl = "https://notemorph.com"; // 👈

  const languages: Record<string, string> = {};
  for (const loc of locales) {
    languages[loc] = `${baseUrl}/${loc}`;
  }

  return {
    alternates: {
      languages,
    },
  };
}

export default function LocaleLayout({ children, params }: Props) {
  const { locale } = params;

  // Validar idioma soportado
  if (!locales.includes(locale as (typeof locales)[number])) {
    notFound();
  }

  // Avisar a next-intl de qué locale se está usando
  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body className="bg-gray-50 text-gray-900 dark:bg-slate-950 dark:text-slate-100 min-h-screen">
        <Navbar />
        <main className="pt-4">{children}</main>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
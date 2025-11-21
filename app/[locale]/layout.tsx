export const dynamic = "force-dynamic";

import "../globals.css";
import { ReactNode } from "react";
import Navbar from "../components/Navbar";

import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales } from "../../i18n/request";

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

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

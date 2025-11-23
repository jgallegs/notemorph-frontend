// frontend/app/[locale]/layout.tsx
export const dynamic = "force-dynamic";

import { ReactNode } from "react";
import { setRequestLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";

import type { Metadata } from "next";
import { locales, type Locale } from "../../i18n/config";
import Navbar from "../components/Navbar";
import { SITE_URL } from "../constants/site";

type LayoutParams = { locale: string };

type Props = {
  children: ReactNode;
  params: Promise<LayoutParams>;
};

function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

// Metadata por locale (hreflang y canonical)
export async function generateMetadata(
  { params }: { params: Props["params"] }
): Promise<Metadata> {
  const { locale: rawLocale } = await params;

  // No necesitamos que sea Locale estricto para el SEO,
  // pero podemos normalizarlo un poco:
  const locale = isLocale(rawLocale) ? rawLocale : locales[0];
  const baseUrl = SITE_URL;

  const languages: Record<string, string> = {};
  for (const loc of locales) {
    languages[loc] = `${baseUrl}/${loc}`;
  }

  return {
    alternates: {
      languages,
      canonical: `${baseUrl}/${locale}`,
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale: rawLocale } = await params;

  // Aquí estrechamos el tipo de string -> Locale
  if (!isLocale(rawLocale)) {
    notFound();
  }

  const locale: Locale = rawLocale;

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Navbar />
      <main className="pt-4">{children}</main>
    </NextIntlClientProvider>
  );
}

export function generateStaticParams() {
  // locales ya viene tipado como Locale[], así que esto va perfecto
  return locales.map((locale) => ({ locale }));
}

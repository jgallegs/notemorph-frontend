// frontend/app/[locale]/layout.tsx
export const dynamic = "force-dynamic";

import { ReactNode } from "react";
import { setRequestLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";

import type { Metadata } from "next";
import { locales, Locale } from "../../i18n/config";
import Navbar from "../components/Navbar";
import { SITE_URL } from "../constants/site";

type LayoutParams = { locale: Locale };

type Props = {
  children: ReactNode;
  params: Promise<LayoutParams>;
};

export async function generateMetadata(
  { params }: { params: Props["params"] }
): Promise<Metadata> {
  const { locale } = await params;

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
  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

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
  return locales.map((locale) => ({ locale }));
}

// frontend/app/[locale]/ai/page.tsx
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { AiPageClient } from "./AIPageClient";
import { SITE_URL } from "../../constants/site";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Ai");

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: SITE_URL,
    },
  };
}

export default function AiPage() {
  return <AiPageClient />;
}

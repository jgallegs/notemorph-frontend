// frontend/app/[locale]/page.tsx
import Link from "next/link";
import AiGlowButton from "../components/AIGlowButton";
import GradientTitle from "../components/GradientTitle";
import {use} from "react";
import {setRequestLocale} from "next-intl/server";
import {useTranslations} from "next-intl";

type Props = {
  params: Promise<{locale: string}>;
};

export default function HomePage({ params }: Props) {
  const {locale} = use(params);
  
  // Necesario para static rendering + uso de hooks de next-intl en Server Components
  setRequestLocale(locale);
  
  const t = useTranslations("Home");

  return (
    <div className="flex flex-col items-center text-center mt-20 px-4">
      <GradientTitle text={t("title")} />
      <p className="mt-4 text-slate-600 dark:text-slate-300 text-center max-w-xl mx-auto">
        {t("subtitle")}
      </p>

      <div className="mt-8 flex gap-4">
        <Link
          href={`./convert`}
          className="px-6 py-3 rounded-xl bg-blue-600 text-white shadow"
        >
          {t("classicButton")}
        </Link>

        <AiGlowButton href={`./ai`}>{t("aiButton")}</AiGlowButton>
      </div>
    </div>
  );
}

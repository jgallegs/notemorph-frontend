// app/[locale]/page.tsx
import Link from "next/link";
import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import AIGlowButton from "../components/AIGlowButton";
import GradientTitle from "../components/GradientTitle";

type Props = {
  params: Promise<{ locale: string }>;
};

export default function HomePage({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);

  const t = useTranslations("Home");

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-white/90 to-transparent dark:from-slate-950/0 pointer-events-none" />

        {/* Fondos IA: se extienden por debajo de la navbar */}
        <div className="pointer-events-none absolute inset-0 -top-32 opacity-30 dark:opacity-60">
          <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-sky-400/20 dark:bg-sky-500/20 blur-3xl" />
          <div className="absolute top-20 -right-32 h-72 w-72 rounded-full bg-violet-400/20 dark:bg-violet-500/25 blur-3xl" />
        </div>

        {/* Contenedor principal del hero */}
        <div className="relative max-w-7xl mx-auto px-4 lg:px-14 pt-10 lg:pt-20 pb-20 lg:pb-32 flex flex-col lg:flex-row items-center gap-16">
          {/* Copy principal */}
          <div className="flex-1 flex flex-col gap-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-300 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 px-3 py-1 text-xs font-medium text-slate-600 dark:text-slate-300 w-fit">
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-sky-400 to-fuchsia-400" />
              {t("badge")}
            </span>

            <div className="space-y-3">
              <GradientTitle text={t("title")} />
              <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-xl">
                {t("subtitle")}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <AIGlowButton href={`/${locale}/convert`}>{t("cta.primary")}</AIGlowButton>
              <Link
                href={`/${locale}/ai`}
                className="text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-sky-500 dark:hover:text-sky-300 transition"
              >
                {t("cta.secondary")} →
              </Link>
            </div>

            <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {t("trust.fast")}
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                {t("trust.format")}
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-400" />
                {t("trust.ai")}
              </div>
            </div>
          </div>

          {/* Mockup preview */}
          <div className="flex-1 w-full">
            <div className="relative mx-auto max-w-md rounded-3xl border border-slate-300 dark:border-slate-800 bg-white/90 dark:bg-slate-900/80 shadow-2xl shadow-sky-500/10 overflow-hidden">
              <div className="border-b border-slate-300 dark:border-slate-800 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span>{t("preview.badge")}</span>
                </div>
                <span className="text-[10px] text-slate-400 dark:text-slate-500">
                  NoteMorph · OCR+AI
                </span>
              </div>

              <div className="p-4 bg-slate-100/60 dark:bg-slate-950/40">
                <div className="mx-auto max-w-sm bg-white dark:bg-slate-950 rounded-2xl shadow-md border border-slate-200 dark:border-slate-800 px-6 py-7">
                  <div className="h-2 w-16 rounded-full bg-slate-200 dark:bg-slate-700 mb-4" />
                  <div className="space-y-2 mb-4">
                    <div className="h-2.5 w-full rounded-full bg-slate-200 dark:bg-slate-700" />
                    <div className="h-2.5 w-5/6 rounded-full bg-slate-200 dark:bg-slate-700" />
                    <div className="h-2.5 w-4/6 rounded-full bg-slate-200 dark:bg-slate-700" />
                  </div>

                  <div className="grid grid-cols-3 gap-3 mt-4 text-[10px] text-slate-500 dark:text-slate-400">
                    <span className="inline-flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-900 px-2 py-1">
                      PDF → DOCX
                    </span>
                    <span className="inline-flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-900 px-2 py-1">
                      OCR
                    </span>
                    <span className="inline-flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-900 px-2 py-1">
                      IA
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-3 text-[11px] text-slate-500 dark:text-slate-400 text-center">
              {t("preview.caption")}
            </p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 py-12 lg:py-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-slate-50">
                {t("features.title")}
              </h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 max-w-xl">
                {t("features.subtitle")}
              </p>
            </div>
            <Link
              href={`/${locale}/pricing`}
              className="text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-sky-500 dark:hover:text-sky-300"
            >
              {t("features.cta")} →
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <FeatureCard
              emoji="⚡"
              title={t("features.items.0.title")}
              description={t("features.items.0.description")}
              accent="sky"
            />
            <FeatureCard
              emoji="🧠"
              title={t("features.items.1.title")}
              description={t("features.items.1.description")}
              accent="violet"
            />
            <FeatureCard
              emoji="📚"
              title={t("features.items.2.title")}
              description={t("features.items.2.description")}
              accent="emerald"
            />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/95">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 py-12 lg:py-16">
          <h2 className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-slate-50 mb-6">
            {t("howItWorks.title")}
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            <StepCard
              step="1"
              title={t("howItWorks.steps.0.title")}
              description={t("howItWorks.steps.0.description")}
            />
            <StepCard
              step="2"
              title={t("howItWorks.steps.1.title")}
              description={t("howItWorks.steps.1.description")}
            />
            <StepCard
              step="3"
              title={t("howItWorks.steps.2.title")}
              description={t("howItWorks.steps.2.description")}
            />
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 py-12 lg:py-16">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <div className="rounded-3xl border border-slate-300 dark:border-slate-800 bg-gradient-to-r from-white via-slate-50 to-white dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 px-6 py-8 md:px-10 md:py-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <h2 className="text-lg md:text-xl font-semibold text-slate-900 dark:text-slate-50">
                {t("ctaFinal.title")}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md">
                {t("ctaFinal.subtitle")}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <AIGlowButton href={`/${locale}/ai`}>{t("ctaFinal.primary")}</AIGlowButton>
              <Link
                href={`/${locale}/pricing`}
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 dark:border-slate-700 px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-100 hover:border-sky-500/70 dark:hover:border-sky-500/70 hover:text-sky-600 dark:hover:text-sky-300 transition"
              >
                {t("ctaFinal.secondary")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  emoji,
  title,
  description,
  accent,
}: {
  emoji: string;
  title: string;
  description: string;
  accent: "sky" | "violet" | "emerald";
}) {
  const accentColor =
    accent === "sky"
      ? "bg-sky-500/15 text-sky-600 dark:text-sky-300"
      : accent === "violet"
      ? "bg-violet-500/15 text-violet-600 dark:text-violet-300"
      : "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300";

  return (
    <div className="rounded-2xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-950 p-4 shadow-sm">
      <div
        className={`inline-flex items-center justify-center h-8 w-8 rounded-xl ${accentColor} text-sm mb-3`}
      >
        {emoji}
      </div>
      <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-1">
        {title}
      </h3>
      <p className="text-xs text-slate-600 dark:text-slate-400">
        {description}
      </p>
    </div>
  );
}

type StepCardProps = {
  step: string;
  title: string;
  description: string;
};

function StepCard({ step, title, description }: StepCardProps) {
  return (
    <div className="relative rounded-2xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-950/70 p-4 shadow-sm">
      <div className="absolute -top-3 left-4 inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded-full bg-sky-500 text-[10px] font-semibold text-white shadow-md">
        {step}
      </div>
      <h3 className="mt-3 text-sm font-semibold text-slate-900 dark:text-slate-50">
        {title}
      </h3>
      <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
        {description}
      </p>
    </div>
  );
}

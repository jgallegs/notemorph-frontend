// app/[locale]/page.tsx
import Link from "next/link";
import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import AIGlowButton from "../components/AIGlowButton";

type Props = {
  params: Promise<{ locale: string }>;
};

export default function HomePage({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);

  const t = useTranslations("Home");

  const rawTitle = t("title");
  const titleWords = rawTitle.split(" ");
  const titleLines: string[] = [];
  for (let i = 0; i < titleWords.length; i += 2) {
    titleLines.push(titleWords.slice(i, i + 2).join(" "));
  }

  return (
    <div className="
      min-h-screen
      text-slate-900 dark:text-slate-50
      bg-gradient-to-br from-white via-slate-50 to-slate-100
      dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-950
    ">
      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* Glows de fondo (detrás del contenido) */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 -left-40 h-72 w-72 rounded-full bg-sky-400/25 dark:bg-sky-500/30 blur-3xl" />
          <div className="absolute top-40 -right-24 h-72 w-72 rounded-full bg-fuchsia-400/20 dark:bg-fuchsia-500/30 blur-3xl" />
        </div>
        
        {/* Contenedor principal del hero */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-14 pt-6 sm:pt-10 lg:pt-16 pb-14 sm:pb-20 lg:pb-28 flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Copy principal */}
          <div className="flex-1 flex flex-col gap-5 w-full">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-300 dark:border-slate-800 bg-white/90 dark:bg-slate-900/70 px-3 py-1 text-[11px] font-medium text-slate-600 dark:text-slate-300 shadow-sm w-fit">
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-sky-400 to-fuchsia-400" />
              {t("badge")}
            </span>

            <div className="space-y-3">
              <h1
                className="
                  text-2xl sm:text-3xl md:text-5xl
                  font-extrabold tracking-tight
                  text-left leading-tight
                "
              >
                {titleLines.map((line, idx) => (
                  <span
                    key={idx}
                    className={
                      "block " +
                      (idx % 2 === 0
                        ? "bg-gradient-to-r from-sky-500 via-indigo-500 to-fuchsia-500 bg-clip-text text-transparent"
                        : "text-slate-900 dark:text-slate-50")
                    }
                  >
                    {line}
                  </span>
                ))}
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-xl">
                {t("subtitle")}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 mt-1">
              <AIGlowButton href={`/${locale}/convert`}>
                {t("cta.primary")}
              </AIGlowButton>

              <Link
                href={`/${locale}/ai`}
                className="text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-300 transition"
              >
                {t("cta.secondary")} →
              </Link>
            </div>

            <div className="mt-3 flex flex-wrap gap-3 text-[11px] text-slate-500 dark:text-slate-400">
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
            <div className="relative mx-auto max-w-md w-full">
              {/* Glow debajo de la tarjeta */}
              <div className="pointer-events-none absolute inset-x-6 -bottom-6 h-10 bg-gradient-to-r from-sky-400/35 via-indigo-400/25 to-fuchsia-400/35 blur-2xl opacity-80 dark:from-sky-500/40 dark:via-indigo-500/30 dark:to-fuchsia-500/40" />

              {/* Tarjeta */}
              <div className="relative rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_6px_24px_rgba(0,0,0,0.06)] transition-shadow overflow-hidden">
                <div className="border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex items-center justify-between bg-white/70 dark:bg-slate-900/60 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    <span>{t("preview.badge")}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500">
                    NoteMorph · OCR+AI
                  </span>
                </div>

                <div className="p-4 bg-slate-50/70 dark:bg-slate-950/40">
                  <div className="mx-auto max-w-sm bg-white dark:bg-slate-950 rounded-2xl shadow-md border border-slate-200 dark:border-slate-800 px-5 py-6">
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
            </div>

            <p className="mt-3 text-[11px] text-slate-500 dark:text-slate-400 text-center">
              {t("preview.caption")}
            </p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-900 dark:text-slate-50">
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-900 dark:text-slate-50 mb-6">
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
      <section className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 py-10 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-300 dark:border-slate-800 bg-gradient-to-r from-white via-slate-50 to-white dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 px-5 sm:px-6 md:px-10 py-7 md:py-10 flex flex-col md:flex-row items-center justify-between gap-5">
            <div className="space-y-2 w-full md:w-auto">
              <h2 className="text-base sm:text-lg md:text-xl font-semibold text-slate-900 dark:text-slate-50">
                {t("ctaFinal.title")}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md">
                {t("ctaFinal.subtitle")}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <AIGlowButton href={`/${locale}/ai`}>
                {t("ctaFinal.primary")}
              </AIGlowButton>
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

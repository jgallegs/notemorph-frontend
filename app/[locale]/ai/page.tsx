// frontend/app/[locale]/ai/page.tsx
"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";

const IA_MODES = ["summary", "mindmap", "flashcards", "ocr"] as const;
type Mode = (typeof IA_MODES)[number];

export default function AiPage() {
  const t = useTranslations("Ai"); // 👈 namespace "Ai" en tu es.json/en.json
  const [mode, setMode] = useState<Mode>("summary");

  // Estado específico para el modo OCR
  const [ocrPreviewHtml, setOcrPreviewHtml] = useState<string | null>(null);
  const [ocrLoading, setOcrLoading] = useState(false);
  const [ocrError, setOcrError] = useState<string | null>(null);

  async function handleOcrSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setOcrError(null);
    setOcrPreviewHtml(null);
    setOcrLoading(true);

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);

      const res = await fetch("/api/ocr-notes", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        let msg = t("errors.serverError");
        try {
          const errorJson = await res.json();
          if (errorJson?.error) msg = errorJson.error;
        } catch {
          // ignoramos parse error
        }
        throw new Error(msg);
      }

      const data = await res.json();
      setOcrPreviewHtml(data.previewHtml || "<p>Sin contenido procesado</p>");
    } catch (err: any) {
      console.error(err);
      setOcrError(err?.message || t("errors.ocrGeneric"));
    } finally {
      setOcrLoading(false);
    }
  }

  const isOcrMode = mode === "ocr";

  return (
    <div className="max-w-5xl mx-auto mt-12 px-4 pb-16">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-slate-50">
          {t("title")}
        </h1>
        <p className="text-gray-600 dark:text-slate-300 max-w-2xl">
          {t("subtitle")}
        </p>
      </div>

      {/* Chips de modos IA */}
      <div className="mt-6 flex flex-wrap gap-3">
        {IA_MODES.map((m) => {
          const selected = m === mode;
          return (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={
                "px-4 py-2 rounded-full text-sm border transition " +
                (selected
                  ? "border-transparent bg-gradient-to-r from-sky-500 via-indigo-500 to-fuchsia-500 text-white shadow-md"
                  : "border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-900/70 text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500")
              }
            >
              {/* Ai.modes.summary / mindmap / flashcards / ocr */}
              {t(`modes.${m}`)}
            </button>
          );
        })}
      </div>

      {/* Panel principal */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Entrada */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm flex flex-col">
          {!isOcrMode ? (
            <>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                  {t("input.title")}
                </h2>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {t("input.subtitle")}
                </span>
              </div>
              <textarea
                className="flex-1 w-full resize-none bg-transparent outline-none text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
                placeholder={t("input.placeholder")}
                rows={12}
              />
              <button
                className="mt-4 w-full bg-blue-600 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700 dark:hover:bg-blue-500 shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
                disabled
              >
                {t("input.buttonSoon")}
              </button>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                  {t("ocr.inputTitle")}
                </h2>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {t("ocr.inputSubtitle")}
                </span>
              </div>

              <form onSubmit={handleOcrSubmit} className="flex flex-col gap-4">
                <input
                  type="file"
                  name="files"
                  multiple
                  accept="image/*"
                  className="text-sm text-slate-700 dark:text-slate-200"
                />

                {ocrError && (
                  <p className="text-xs text-red-500">{ocrError}</p>
                )}

                <button
                  type="submit"
                  disabled={ocrLoading}
                  className="mt-2 w-full bg-blue-600 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700 dark:hover:bg-blue-500 shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {ocrLoading ? t("ocr.buttonLoading") : t("ocr.button")}
                </button>
              </form>
            </>
          )}
        </div>

        {/* Resultado */}
        <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.3),_transparent_60%),_radial-gradient(circle_at_bottom,_rgba(129,140,248,0.25),_transparent_55%)]" />
          <div className="relative">
            <h2 className="text-sm font-semibold text-slate-100 mb-3">
              {t("output.title", { mode: t(`modes.${mode}`) })}
            </h2>
            <p className="text-xs text-slate-400 mb-2">
              {!isOcrMode
                ? t("output.descriptionStandard")
                : t("output.descriptionOcr")}
            </p>

            {!isOcrMode ? (
              <div className="mt-4 text-sm text-slate-200 space-y-2">
                <p className="italic text-slate-400">{t("output.example")}</p>
                {mode === "summary" && (
                  <>
                    <p>{t("examples.summary.line1")}</p>
                    <p>{t("examples.summary.line2")}</p>
                    <p>{t("examples.summary.line3")}</p>
                  </>
                )}
                {mode === "mindmap" && (
                  <>
                    <p>{t("examples.mindmap.line1")}</p>
                    <p>{t("examples.mindmap.line2")}</p>
                    <p>{t("examples.mindmap.line3")}</p>
                  </>
                )}
                {mode === "flashcards" && (
                  <>
                    <p>{t("examples.flashcards.line1")}</p>
                    <p>{t("examples.flashcards.line2")}</p>
                    <p>{t("examples.flashcards.line3")}</p>
                  </>
                )}
              </div>
            ) : (
              <>
                {ocrLoading && (
                  <p className="text-xs text-slate-300 animate-pulse">
                    {t("ocr.loadingText")}
                  </p>
                )}

                {ocrError && (
                  <p className="text-xs text-red-400 mt-2">{ocrError}</p>
                )}

                {ocrPreviewHtml && (
                  <div className="mt-4 text-sm text-slate-200 prose prose-invert max-w-none">
                    <div
                      dangerouslySetInnerHTML={{ __html: ocrPreviewHtml }}
                    />
                  </div>
                )}

                {!ocrLoading && !ocrError && !ocrPreviewHtml && (
                  <p className="text-xs text-slate-400 mt-2">
                    {t("ocr.emptyState")}
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

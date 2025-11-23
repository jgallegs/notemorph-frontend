"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";

const IA_MODES = ["summary", "mindmap", "flashcards", "ocr"] as const;
type Mode = (typeof IA_MODES)[number];

export function AiPageClient() {
  const t = useTranslations("Ai");
  const [mode, setMode] = useState<Mode>("summary");

  const [ocrPreviewPages, setOcrPreviewPages] = useState<string[] | null>(null);
  const [ocrLoading, setOcrLoading] = useState(false);
  const [ocrError, setOcrError] = useState<string | null>(null);

  async function handleOcrSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setOcrError(null);
    setOcrPreviewPages(null);
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

      // Si en el futuro el backend devuelve previewPages: string[]
      const pagesFromApi: string[] | undefined = data.previewPages;

      // Fallback: si solo hay previewHtml, lo usamos como una única página
      const fallbackHtml: string =
        data.previewHtml || "<p>Sin contenido procesado</p>";

      setOcrPreviewPages(
        pagesFromApi && pagesFromApi.length > 0
          ? pagesFromApi
          : [fallbackHtml]
      );
    } catch (err: any) {
      console.error(err);
      setOcrError(err?.message || t("errors.ocrGeneric"));
      setOcrPreviewPages(null);
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
                  <p className="text-xs text-red-500 dark:text-red-400">
                    {ocrError}
                  </p>
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
        <div className="rounded-2xl p-5 shadow-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50 mb-3">
            {t("output.title", { mode: t(`modes.${mode}`) })}
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
            {!isOcrMode
              ? t("output.descriptionStandard")
              : t("output.descriptionOcr")}
          </p>

          {!isOcrMode ? (
            <div className="mt-4 text-sm text-slate-800 dark:text-slate-100 space-y-2">
              <p className="italic text-slate-500 dark:text-slate-400">
                {t("output.example")}
              </p>
            </div>
          ) : (
            <>
              {ocrLoading && (
                <p className="text-xs text-slate-700 dark:text-slate-300 animate-pulse">
                  {t("ocr.loadingMessage")}
                </p>
              )}

              {!ocrLoading && !ocrPreviewPages && !ocrError && (
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {t("ocr.emptyState")}
                </p>
              )}

              {ocrError && (
                <p className="text-xs text-red-500 dark:text-red-400 mt-2">
                  {ocrError}
                </p>
              )}

              {ocrPreviewPages && !ocrError && (
                <OcrWordPreview pages={ocrPreviewPages} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

type OcrWordPreviewProps = {
  pages: string[];
};

function OcrWordPreview({ pages }: OcrWordPreviewProps) {
  const [pageIndex, setPageIndex] = useState(0);

  if (!pages || pages.length === 0) return null;

  const total = pages.length;
  const current = pageIndex + 1;

  const goPrev = () => setPageIndex((p) => Math.max(0, p - 1));
  const goNext = () => setPageIndex((p) => Math.min(total - 1, p + 1));

  return (
    <div className="mt-4 flex flex-col items-center gap-4">
      {/* Zona tipo editor Word */}
      <div className="w-full flex justify-center">
        <div
          className="
            relative
            bg-white
            rounded-2xl
            shadow-md
            border border-slate-200
            overflow-hidden
            px-10 py-12
            max-w-[820px]
            min-h-[1000px]
          "
          style={{
            aspectRatio: "210 / 297", // aproximación A4 vertical
          }}
        >
          <div
            className="prose prose-slate max-w-none text-slate-900"
            dangerouslySetInnerHTML={{ __html: pages[pageIndex] }}
          />
        </div>
      </div>

      {/* Controles de paginación */}
      {total > 1 && (
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={goPrev}
            disabled={pageIndex === 0}
            className="px-3 py-1 rounded-md border border-slate-300 bg-white text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50"
          >
            &lt;
          </button>

          <div className="flex items-center gap-2 text-sm text-slate-700">
            <span>Página</span>
            <span className="font-semibold">
              {current} / {total}
            </span>
          </div>

          <button
            type="button"
            onClick={goNext}
            disabled={pageIndex === total - 1}
            className="px-3 py-1 rounded-md border border-slate-300 bg-white text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50"
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
}

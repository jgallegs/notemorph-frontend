"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function AiPage() {
  const t = useTranslations("AI");

  const IA_MODES = [
    t("mode.summary"),
    t("mode.mindmap"),
    t("mode.flashcards"),
  ];

  const [mode, setMode] = useState<string>(IA_MODES[0]);

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

      {/* Chips */}
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
              {m}
            </button>
          );
        })}
      </div>

      {/* Panel principal */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Entrada */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
              {t("input")}
            </h2>

            <span className="text-xs text-slate-500 dark:text-slate-400">
              {t("pasteHere")}
            </span>
          </div>

          <textarea
            className="flex-1 w-full resize-none bg-transparent outline-none text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
            placeholder={t("placeholder")}
            rows={12}
          />

          <button
            className="mt-4 w-full bg-blue-600 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700 dark:hover:bg-blue-500 shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
            disabled
          >
            {t("soon")}
          </button>
        </div>

        {/* Resultado */}
        <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.3),_transparent_60%),_radial-gradient(circle_at_bottom,_rgba(129,140,248,0.25),_transparent_55%)]" />
          <div className="relative">
            <h2 className="text-sm font-semibold text-slate-100 mb-3">
              {t("result")} ({mode})
            </h2>

            <p className="text-xs text-slate-400 mb-2">{t("resultInfo")}</p>

            {/* Ejemplos */}
            <div className="mt-4 text-sm text-slate-200 space-y-2">
              <p className="italic text-slate-400">{t("example")}:</p>

              {mode === IA_MODES[0] && (
                <>
                  <p>{t("summary.line1")}</p>
                  <p>{t("summary.line2")}</p>
                  <p>{t("summary.line3")}</p>
                </>
              )}

              {mode === IA_MODES[1] && (
                <>
                  <p>{t("mindmap.line1")}</p>
                  <p>{t("mindmap.line2")}</p>
                  <p>{t("mindmap.line3")}</p>
                </>
              )}

              {mode === IA_MODES[2] && (
                <>
                  <p>{t("flashcards.line1")}</p>
                  <p>{t("flashcards.line2")}</p>
                  <p>{t("flashcards.line3")}</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

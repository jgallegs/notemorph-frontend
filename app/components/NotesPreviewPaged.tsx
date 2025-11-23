// app/components/NotesPreviewPaged.tsx
"use client";

import { useState } from "react";

type NotesPreviewPagedProps = {
  pages: string[]; // HTML de cada página
};

export default function NotesPreviewPaged({ pages }: NotesPreviewPagedProps) {
  const [pageIndex, setPageIndex] = useState(0);

  if (!pages || pages.length === 0) {
    return null;
  }

  const total = pages.length;
  const current = pageIndex + 1;

  const goPrev = () => setPageIndex((p) => Math.max(0, p - 1));
  const goNext = () => setPageIndex((p) => Math.min(total - 1, p + 1));

  return (
    <div className="w-full flex flex-col items-center gap-4 py-8 bg-slate-100">
      {/* Área tipo editor */}
      <div className="w-full flex justify-center">
        <div
          className="
            relative
            bg-white
            rounded-2xl
            shadow-xl
            border border-slate-200
            overflow-hidden
            px-10 py-12
            max-w-[850px]
            min-h-[1100px]
          "
          style={{
            // Aproximación a A4 vertical (mantener proporciones tipo Word)
            aspectRatio: "210 / 297",
          }}
        >
          <div
            className="prose prose-slate max-w-none text-slate-900"
            // 👇 Aquí entra el HTML de esa "página"
            dangerouslySetInnerHTML={{ __html: pages[pageIndex] }}
          />
        </div>
      </div>

      {/* Controles de paginación */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={goPrev}
          disabled={pageIndex === 0}
          className="px-3 py-1 rounded-md border border-slate-300 bg-white text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50"
        >
          &lt;
        </button>

        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-600">Página</span>
          <span className="font-medium text-slate-900">
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
    </div>
  );
}

"use client";

import { useTranslations } from "next-intl";

export default function Dropzone({
  placeholder
}: {
  placeholder?: string;
}) {
  const t = useTranslations("Dropzone");

  return (
    <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-600 p-10 rounded-xl cursor-pointer hover:border-slate-400 dark:hover:border-slate-500 transition bg-white/70 dark:bg-slate-900/70">
      <span className="text-sm text-slate-600 dark:text-slate-300 text-center">
        {placeholder ?? t("placeholder")}
      </span>
      <input type="file" className="hidden" />
    </label>
  );
}

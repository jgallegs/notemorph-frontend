import { useTranslations } from "next-intl";
import Dropzone from "../../components/Dropzone";

export default function ConvertPage() {
  const t = useTranslations("Convert");

  return (
    <div className="max-w-3xl mx-auto mt-12 px-4">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-50">
        {t("title")}
      </h1>

      <p className="text-gray-600 dark:text-slate-300 mt-2">
        {t("subtitle")}
      </p>

      <div className="mt-10">
        <Dropzone placeholder={t("drop")} />
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-slate-50">
          {t("type")}
        </h2>

        <select className="mt-3 w-full border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 p-3 rounded-lg shadow-sm">
          <option>{t("opt.pdfWord")}</option>
          <option>{t("opt.wordPdf")}</option>
          <option>{t("opt.imageText")}</option>
          <option>{t("opt.smart")}</option>
          <option>{t("opt.mindmap")}</option>
        </select>
      </div>

      <div className="mt-10 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 p-6 rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-slate-50">
          {t("result")}
        </h3>
        <p className="text-gray-400 dark:text-slate-400">
          {t("resultInfo")}
        </p>
      </div>

      <button className="mt-8 w-full bg-blue-600 text-white py-3 rounded-lg text-lg hover:bg-blue-700 dark:hover:bg-blue-500 shadow-md">
        {t("download")}
      </button>
    </div>
  );
}
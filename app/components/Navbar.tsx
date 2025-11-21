"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useState } from "react";
import AppLogo from "./AppLogo";

const LANGUAGES = [
  {code: "es", label: "Español", short: "ES", flag: "🇪🇸"},
  {code: "en", label: "English", short: "EN", flag: "🇬🇧"},
  // {code: "fr", label: "Français", short: "FR", flag: "🇫🇷"},
  // {code: "de", label: "Deutsch", short: "DE", flag: "🇩🇪"},
];

function getCurrentLocale(pathname: string): string {
  if (pathname.startsWith("/en")) return "en";
  if (pathname.startsWith("/es")) return "es";
  return "es"; // fallback si estás en "/" o algo raro
}

function LanguagePicker() {
  const pathname = usePathname();
  const currentLocale = getCurrentLocale(pathname);
  const [open, setOpen] = useState(false);

  const currentLang =
    LANGUAGES.find((l) => l.code === currentLocale) ?? LANGUAGES[0];

  return (
    <div className="relative">
      {/* Botón principal del selector */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-200/80 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 text-xs sm:text-sm font-medium shadow-sm hover:bg-slate-300/80 dark:hover:bg-slate-700/80 transition"
      >
        <span>{currentLang.flag}</span>
        <span className="hidden sm:inline">{currentLang.short}</span>
        <span className="text-[10px] opacity-70">▼</span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-44 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-lg z-50 overflow-hidden">
          {LANGUAGES.map((lang) => {
            const active = lang.code === currentLocale;
            const href = `/${lang.code}`; // SIMPLE: siempre home de ese idioma

            return (
              <Link
                key={lang.code}
                href={href}
                scroll={false}
                onClick={() => setOpen(false)}
                className={
                  "flex items-center gap-2 px-3 py-2 text-sm cursor-pointer transition " +
                  (active
                    ? "bg-gradient-to-r from-sky-500 via-indigo-500 to-fuchsia-500 text-white"
                    : "text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800")
                }
              >
                <span>{lang.flag}</span>
                <span>{lang.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}


export default function Navbar() {
  const t = useTranslations("Navbar");
  const locale = useLocale();

  return (
    <nav className="flex items-center justify-between px-4 md:px-10 py-4 border-b border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md sticky top-0 z-50">
      {/* Logo izquierda */}
      <div className="flex items-center gap-2 min-w-0">
        <AppLogo />
      </div>

      {/* Enlaces centro */}
      <div className="hidden md:flex items-center gap-6 text-sm font-medium">
        <Link
          href={`/${locale}/convert`}
          className="text-slate-700 dark:text-slate-200 hover:text-sky-500 dark:hover:text-sky-400 transition"
        >
          {t("classic")}
        </Link>

        <Link
          href={`/${locale}/ai`}
          className="flex items-center gap-1 text-slate-700 dark:text-slate-200 hover:text-fuchsia-500 dark:hover:text-fuchsia-400 transition"
        >
          {t("ai")}
          <span className="text-xs ml-1 bg-gradient-to-r from-sky-500 to-fuchsia-500 text-white px-1.5 py-0.5 rounded">
            {t("new")}
          </span>
        </Link>

        <Link
          href={`/${locale}/pricing`}
          className="text-slate-700 dark:text-slate-200 hover:text-indigo-500 dark:hover:text-indigo-400 transition"
        >
          {t("pricing")}
        </Link>
      </div>

      {/* Selector de idioma derecha */}
      <LanguagePicker />
    </nav>
  );
}

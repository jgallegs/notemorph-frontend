"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import AppLogo from "./AppLogo";

const SUPPORTED_LOCALES = ["es", "en"] as const;
type Locale = (typeof SUPPORTED_LOCALES)[number];

const NAV_ITEMS = [
  { key: "home", path: "" }, // /
  { key: "convert", path: "/convert" },
  { key: "ai", path: "/ai" },
  { key: "pricing", path: "/pricing" },
];

export default function Navbar() {
  const t = useTranslations("Navbar");
  const pathname = usePathname() || "/";
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const locale: Locale = useMemo(() => {
    const parts = pathname.split("/");
    const maybeLocale = parts[1];
    if (SUPPORTED_LOCALES.includes(maybeLocale as Locale)) {
      return maybeLocale as Locale;
    }
    return "es";
  }, [pathname]);

  const currentPath = useMemo(() => {
    const parts = pathname.split("/");
    if (parts.length <= 2) return "/";
    return "/" + parts.slice(2).join("/");
  }, [pathname]);

  const buildHref = (targetLocale: Locale, path: string) => {
    if (!path || path === "/") {
      return `/${targetLocale}`;
    }
    return `/${targetLocale}${path}`;
  };

  const handleLocaleChange = (newLocale: string) => {
    if (!SUPPORTED_LOCALES.includes(newLocale as Locale)) return;
    const href = buildHref(newLocale as Locale, currentPath);
    router.push(href);
    setMobileOpen(false);
  };

  const handleNavClick = (path: string) => {
    const href = buildHref(locale, path || "/");
    router.push(href);
    setMobileOpen(false);
  };

  return (
    <>
      <nav className="sticky top-0 z-40 bg-white/70 dark:bg-slate-950/60 backdrop-blur-xl">
        {/* Glows suaves detrás de la navbar */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-20 -left-40 h-56 w-56 rounded-full bg-sky-400/15 dark:bg-sky-500/20 blur-[120px]" />
          <div className="absolute -top-24 right-0 h-48 w-48 rounded-full bg-fuchsia-400/10 dark:bg-fuchsia-500/15 blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <AppLogo href={`/${locale}`} />

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6 text-sm font-medium">
              {NAV_ITEMS.map((item) => {
                const isActive =
                  (item.path === "" && currentPath === "/") ||
                  (item.path !== "" && currentPath.startsWith(item.path));

                return (
                  <button
                    key={item.key}
                    onClick={() => handleNavClick(item.path)}
                    className={
                      "relative transition-colors " +
                      (isActive
                        ? "text-sky-600 dark:text-sky-400"
                        : "text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white")
                    }
                  >
                    {t(item.key)}
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-sky-500 via-indigo-500 to-fuchsia-500 rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Language selector (desktop) */}
            <LangPickerDesktop locale={locale} onChange={handleLocaleChange} />
          </div>

          {/* Mobile: idioma + hamburguesa */}
          <div className="flex items-center gap-3 md:hidden">
            <select
              className="text-xs bg-white/80 dark:bg-slate-900 border border-slate-300/70 dark:border-slate-700/70 rounded-full px-2 py-1 text-slate-700 dark:text-slate-100 focus:outline-none"
              value={locale}
              onChange={(e) => handleLocaleChange(e.target.value)}
            >
              <option value="es">🇪🇸 ES</option>
              <option value="en">🇬🇧 EN</option>
            </select>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label="Abrir menú"
              className="inline-flex items-center justify-center rounded-full p-2 border border-slate-300/70 dark:border-slate-700/70 hover:bg-slate-100 dark:hover:bg-slate-900"
            >
              <span className="sr-only">Abrir menú</span>
              <div className="space-y-[5px]">
                <span
                  className={
                    "block h-[2px] w-5 rounded-full bg-slate-800 dark:bg-slate-100 transition-transform " +
                    (mobileOpen ? "translate-y-[7px] rotate-45" : "")
                  }
                />
                <span
                  className={
                    "block h-[2px] w-5 rounded-full bg-slate-800 dark:bg-slate-100 transition-opacity " +
                    (mobileOpen ? "opacity-0" : "opacity-100")
                  }
                />
                <span
                  className={
                    "block h-[2px] w-5 rounded-full bg-slate-800 dark:bg-slate-100 transition-transform " +
                    (mobileOpen ? "-translate-y-[7px] -rotate-45" : "")
                  }
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay + panel lateral */}
      {mobileOpen && (
        <div className="fixed inset-0 z-30 md:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />

          <div className="absolute right-0 top-0 h-full w-64 bg-white dark:bg-slate-950 border-l border-slate-200 dark:border-slate-800 shadow-xl p-5 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                {t("menu")}
              </span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-900"
                aria-label="Cerrar menú"
              >
                ✕
              </button>
            </div>

            <nav className="flex flex-col gap-3 text-sm">
              {NAV_ITEMS.map((item) => {
                const isActive =
                  (item.path === "" && currentPath === "/") ||
                  (item.path !== "" && currentPath.startsWith(item.path));

                return (
                  <button
                    key={item.key}
                    onClick={() => handleNavClick(item.path)}
                    className={
                      "text-left px-3 py-2 rounded-lg transition-colors " +
                      (isActive
                        ? "bg-sky-500/10 text-sky-600 dark:text-sky-400"
                        : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900")
                    }
                  >
                    {t(item.key)}
                  </button>
                );
              })}
            </nav>

            <div className="mt-auto pt-6 border-t border-slate-200 dark:border-slate-800">
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                {t("language")}
              </p>
              <select
                className="w-full text-sm bg-white/80 dark:bg-transparent border border-slate-300/70 dark:border-slate-700/70 rounded-lg px-3 py-2 text-slate-700 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500/60"
                value={locale}
                onChange={(e) => handleLocaleChange(e.target.value)}
              >
                <option value="es">🇪🇸 Español</option>
                <option value="en">🇬🇧 English</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Selector de idioma para desktop (sin strings multilínea en className)
function LangPickerDesktop({
  locale,
  onChange,
}: {
  locale: string;
  onChange: (lng: string) => void;
}) {
  const [open, setOpen] = useState(false);

  const items = [
    { code: "es", label: "🇪🇸 Español" },
    { code: "en", label: "🇬🇧 English" },
  ];

  const current = items.find((x) => x.code === locale) ?? items[0];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-white/90 text-slate-700 border border-slate-300 hover:bg-white hover:border-slate-400 dark:bg-slate-900/70 dark:text-slate-100 dark:border-slate-700 dark:hover:bg-slate-900 dark:hover:border-slate-500 transition"
        type="button"
      >
        <span className="text-base">{current.label.split(" ")[0]}</span>
        <span className="text-[10px] text-slate-400 dark:text-slate-500">
          ▼
        </span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-36 z-50 bg-white border border-slate-200 rounded-xl shadow-xl py-1 dark:bg-slate-900 dark:border-slate-700">
          {items.map((item) => (
            <button
              key={item.code}
              onClick={() => {
                onChange(item.code);
                setOpen(false);
              }}
              className={
                "w-full text-left px-3 py-2 text-xs " +
                (item.code === locale
                  ? "text-sky-600 bg-slate-100 dark:text-sky-300 dark:bg-slate-800"
                  : "text-slate-800 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800")
              }
              type="button"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

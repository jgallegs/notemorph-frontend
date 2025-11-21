"use client";

import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import {useLocale, useTranslations} from "next-intl";
import {useMemo, useState} from "react";
import AppLogo from "./AppLogo";

const SUPPORTED_LOCALES = ["es", "en"] as const;

type Locale = (typeof SUPPORTED_LOCALES)[number];

const NAV_ITEMS = [
  { key: "home", path: "" },          // /
  { key: "convert", path: "/convert" },
  { key: "ai", path: "/ai" },
  { key: "pricing", path: "/pricing" }
];

export default function Navbar() {
  const t = useTranslations("Navbar");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Normalizamos el pathname para quitar el locale inicial (/es, /en)
  const currentPath = useMemo(() => {
    if (!pathname) return "/";
    const parts = pathname.split("/");
    // ['', 'es', 'convert']
    if (parts.length <= 2) return "/";
    return "/" + parts.slice(2).join("/");
  }, [pathname]);

  const buildHref = (targetLocale: string, path: string) => {
    if (!path || path === "/") {
      return `/${targetLocale}`;
    }
    return `/${targetLocale}${path}`;
  };

  const handleLocaleChange = (newLocale: string) => {
    if (!SUPPORTED_LOCALES.includes(newLocale as Locale)) return;

    const newHref = buildHref(newLocale, currentPath);
    router.push(newHref);
    setMobileOpen(false);
  };

  const handleNavClick = (path: string) => {
    const href = buildHref(locale, path || "/");
    router.push(href);
    setMobileOpen(false);
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="sticky top-0 z-40 border-b border-slate-200/60 dark:border-slate-800/80 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href={buildHref(locale, "/")} className="flex items-center gap-2">
            <AppLogo />
          </Link>

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
                        : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white")
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
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                {t("language")}
              </span>
              <select
                className="text-sm bg-transparent border border-slate-300/70 dark:border-slate-700/70 rounded-full px-3 py-1.5 text-slate-700 dark:text-slate-100 hover:border-slate-400 dark:hover:border-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/60"
                value={locale}
                onChange={(e) => handleLocaleChange(e.target.value)}
              >
                <option value="es">🇪🇸 ES</option>
                <option value="en">🇬🇧 EN</option>
              </select>
            </div>
          </div>

          {/* Mobile: language pill + hamburger */}
          <div className="flex items-center gap-3 md:hidden">
            <select
              className="text-xs bg-transparent border border-slate-300/70 dark:border-slate-700/70 rounded-full px-2 py-1 text-slate-700 dark:text-slate-100 focus:outline-none"
              value={locale}
              onChange={(e) => handleLocaleChange(e.target.value)}
            >
              <option value="es">🇪🇸</option>
              <option value="en">🇬🇧</option>
            </select>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label="Abrir menú"
              className="inline-flex items-center justify-center rounded-full p-2 border border-slate-300/70 dark:border-slate-700/70 hover:bg-slate-100 dark:hover:bg-slate-900"
            >
              <span className="sr-only">Abrir menú</span>
              {/* icono hamburguesa */}
              <div className="space-y-[5px]">
                <span
                  className={`block h-[2px] w-5 rounded-full bg-slate-800 dark:bg-slate-100 transition-transform ${
                    mobileOpen ? "translate-y-[7px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`block h-[2px] w-5 rounded-full bg-slate-800 dark:bg-slate-100 transition-opacity ${
                    mobileOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`block h-[2px] w-5 rounded-full bg-slate-800 dark:bg-slate-100 transition-transform ${
                    mobileOpen ? "-translate-y-[7px] -rotate-45" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay + panel lateral */}
      {mobileOpen && (
        <div className="fixed inset-0 z-30 md:hidden">
          {/* Fondo oscuro */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />

          {/* Panel lateral */}
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
                className="w-full text-sm bg-transparent border border-slate-300/70 dark:border-slate-700/70 rounded-lg px-3 py-2 text-slate-700 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500/60"
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

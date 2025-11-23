// frontend/app/components/Footer.tsx
import Link from "next/link";

type FooterProps = {
  locale: string;
};

export default function Footer({ locale }: FooterProps) {
  const base = `/${locale}`;

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 mt-10">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        {/* Brand */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-fuchsia-500 text-xs font-bold text-white shadow-md">
              NM
            </span>
            <span className="text-sm font-semibold text-slate-900 dark:text-slate-50">
              NoteMorph
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs">
            Convierte tus documentos y apuntes en material limpio y listo para estudiar con IA.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-4 text-xs text-slate-600 dark:text-slate-300">
          <Link
            href={base}
            className="hover:text-sky-600 dark:hover:text-sky-300 transition"
          >
            Inicio
          </Link>
          <Link
            href={`${base}/convert`}
            className="hover:text-sky-600 dark:hover:text-sky-300 transition"
          >
            Conversor
          </Link>
          <Link
            href={`${base}/ai`}
            className="hover:text-sky-600 dark:hover:text-sky-300 transition"
          >
            Modo IA
          </Link>
          <Link
            href={`${base}/pricing`}
            className="hover:text-sky-600 dark:hover:text-sky-300 transition"
          >
            Precios
          </Link>
        </div>

        {/* Legal + año */}
        <div className="flex flex-col items-start md:items-end gap-1 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex gap-3">
            <button className="hover:text-sky-600 dark:hover:text-sky-300 transition">
              Política de privacidad
            </button>
            <button className="hover:text-sky-600 dark:hover:text-sky-300 transition">
              Términos de uso
            </button>
          </div>
          <span>© {new Date().getFullYear()} NoteMorph. Todos los derechos reservados.</span>
        </div>
      </div>
    </footer>
  );
}

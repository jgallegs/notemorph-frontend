import Link from "next/link";

export default function AppLogo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      {/* Icono */}
      <div className="relative flex h-8 w-8 items-center justify-center rounded-2xl bg-slate-900 dark:bg-slate-100 overflow-hidden">
        {/* Fondo degradado suave */}
        <div className="absolute inset-0 opacity-70 bg-[radial-gradient(circle_at_top,_#22d3ee_0,_transparent_50%),_radial-gradient(circle_at_bottom,_#6366f1_0,_transparent_55%)]" />
        {/* Documento */}
        <div className="relative h-5 w-4 rounded-sm bg-white/90 shadow-sm flex flex-col justify-center gap-0.5">
          <div className="h-0.5 w-3 mx-auto rounded bg-slate-300" />
          <div className="h-0.5 w-2.5 mx-auto rounded bg-slate-200" />
          <div className="h-0.5 w-3 mx-auto rounded bg-slate-300" />
        </div>
        {/* Chispa IA */}
        <div className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-gradient-to-tr from-sky-400 to-fuchsia-500 shadow-[0_0_10px_rgba(56,189,248,0.8)]" />
      </div>

      {/* Texto marca */}
      <span className="font-semibold text-base tracking-tight text-slate-900 dark:text-slate-50">
        NoteMorph
      </span>
    </Link>
  );
}

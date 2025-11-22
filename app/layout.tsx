// frontend/app/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NoteMorph | Convierte y mejora tus documentos con IA",
  description:
    "NoteMorph es la forma más rápida de convertir PDFs, imágenes y apuntes en documentos editables y organizados con ayuda de la IA.",
  metadataBase: new URL("https://notemorph.com"), // 👈 cambia por tu dominio real
  openGraph: {
    title: "NoteMorph | Convierte PDFs, imágenes y apuntes con IA",
    description:
      "Convierte PDFs a Word, digitaliza apuntes con fotos y genera resúmenes inteligentes con IA.",
    url: "https://notemorph.com",
    siteName: "NoteMorph",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "NoteMorph | Convierte y mejora tus documentos con IA",
    description:
      "Convierte PDFs, digitaliza apuntes y genera resúmenes con IA.",
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
